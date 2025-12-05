function inject(tag, id, content, parent) {
  const elem = document.createElement(tag)
  elem.setAttribute('id', id)
  elem.textContent = content
  return parent ? parent.appendChild(elem) : document.head.appendChild(elem)
}

function override(that) {
  function reset() {
    if (that.EXTENSION.VIME) {
      that.EXTENSION.VIME.remove()
      delete that.EXTENSION.VIME
    }

    if (that.EXTENSION.VIDEOJS) {
      that.EXTENSION.VIDEOJS.player?.dispose()
      that.EXTENSION.VIDEOJS.remove()
      delete that.EXTENSION.VIDEOJS
      delete that.KEYS_TARGET
    }

    if (that.EXTENSION.IFRAME) {
      that.EXTENSION.IFRAME.remove()
      delete that.EXTENSION.IFRAME
    }

    that.EXTENSION.innerHTML = ''
  }

  function setSVG(width, height) {
    clearInterval(that.timers.onReady);
    that.set(`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>`)
    if (cfg.hz.capWH) {
      that.CAP.children[1].textContent = `${width}\u00d7${height}`
    }
  }

  that.resetNode_original = that.resetNode
  that.resetNode = (node, keepAlbum) => {
    if (node === that.TRG) reset()
    return that.resetNode_original(node, keepAlbum)
  }

  that.reset_original = that.reset
  that.reset = preventImmediateHover => {
    reset()
    return that.reset_original(preventImmediateHover)
  }

  let handlers = typeof platform === 'object' ? platform : catchEvent;
  handlers.onkeydown_original = handlers.onkeydown
  handlers.onkeydown = e => {
    const url = that.TRG?.IMGS_ext?.attributes?.['url']?.textContent
    const codes = [e.code.replace(/^Key/, ''), e.key]
    if (url && codes.includes(cfg.keys.hz_open)) {
      Port.send({ cmd: 'open', url: url, nf: e.shiftKey })
    } else if (that.EXTENSION?.VIDEOJS?.player && e.code === 'ArrowUp') {
      that.EXTENSION.VIDEOJS.player.muted(false)
    } else if (that.EXTENSION?.VIDEOJS?.player && (e.code === 'PageDown' || e.code === 'PageUp')) {
      that.EXTENSION.VIDEOJS.player.pause()
      that.EXTENSION.VIDEOJS.player.currentTime(that.EXTENSION.VIDEOJS.player.currentTime() + (1/25 * (e.code === 'PageDown' ? 1 : -1)))
      e.preventDefault()
    } else {
      return handlers.onkeydown_original(e)
    }
  }

  window.removeEventListener("wheel", that.wheeler, true)
  that.wheeler_original = that.wheeler
  that.wheeler = function (ev) {
    if (that.EXTENSION.scrollHeight > that.EXTENSION.clientHeight + 10 && that.EXTENSION.contains(ev.target)) {
      return
    }
    // if (!ev.ctrlKey) {
    //   var fullZmBackup = that.fullZm
    //   that.fullZm = 0
    // }
    return that.wheeler_original(ev)
    // that.fullZm = fullZmBackup ?? that.fullZm
  }
  window.addEventListener("wheel", that.wheeler, { capture: true, passive: false })

  that.fzClickAct_original = that.fzClickAct
  that.fzClickAct = e => !that.EXTENSION.contains(e.target) ? that.fzClickAct_original(e) : undefined
  if (that.fullZm) {
    window.removeEventListener("click", that.fzClickAct_original, true);
    window.addEventListener("click", that.fzClickAct, true);
  }

  that.prepareCaption_original = that.prepareCaption
  that.prepareCaption = (trg, caption = '') => {
    const m = caption.match(/(<imagus-extension.+<\/imagus-extension>)?(.*)/s)
    const e = () => { const t = document.createElement('template'); t.innerHTML = m[1]; return t.content.firstChild; }
    trg.IMGS_ext = trg.IMGS_ext_from_url || m[1] ? e() : undefined
    if (that.CAP) that.CAP.style.zIndex = 1
    return that.prepareCaption_original(trg, m[2])
  }

  that.show_original = that.show
  that.show = (msg, delayed) => {
    if (msg === 'load') {
      if (that.EXTENSION.VIDEOJS || that.EXTENSION.IFRAME) {
        return
      } else {
        return that.show_original(msg, delayed)
      }
    } else if (msg === undefined) {
      return that.show_original(msg, delayed)
    }

    const ext = that.TRG.IMGS_ext
    that.EXTENSION.style.display = ext ? 'block' : 'none'
    that.DIV.style.transform = ''

    const res = that.show_original(msg, delayed)

    if (ext) {
      const type = ext.getAttribute('type').split('-')
      const url = ext.getAttribute('url')
      that.EXTENSION.className = 'imagus-' + type[0]
      that.EXTENSION_custom_style.textContent = ext.getAttribute('custom-style')

      const isYoutube = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
      if (isYoutube && type[0] === 'videojs') {
        type[0] = 'iframe'
      }

      switch (type[0]) {
        case 'iframe':
          if (!url || that.EXTENSION.IFRAME) {
            break
          }

          let html;
          if (isYoutube) {
            const ytId = url.match(/(?:v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/)[1]
            const t = url.match(/t=([\d,]+)/)?.[1] || 0
            html = `<iframe type="text/html" frameborder="0" allowfullscreen="true" allow="autoplay" src="https://www.youtube.com/embed/${ytId}?&autoplay=1&fs=1&iv_load_policy=3&rel=1&version=3&enablejsapi=1&loop=1&playlist=${ytId}&start=${t}"></iframe>`

          } else {
            html = `<iframe src="${url}"></iframe>`
          }
          that.EXTENSION.innerHTML = `<div class="imagus-iframe-control">Click to enable/disable iframe control</div>${html}`
          that.EXTENSION.IFRAME = that.EXTENSION.querySelector(':scope > iframe')
          const h = [1440, 1080, 720, 360].find(i => i <= window.innerHeight) || 360;
          setTimeout(setSVG, 10, h / 9 * 16, h);
          // setSVG(3840, 2160)

          that.EXTENSION.querySelector('.imagus-iframe-control').addEventListener('click', function (ev) {
            // that.EXTENSION.style.pointerEvents = that.EXTENSION.style.pointerEvents == 'none' ? 'auto' : 'none';
            that.EXTENSION.style.zIndex = that.EXTENSION.style.zIndex != 'auto' ? 'auto' : '-1';
          })
          break

        case 'sidebar':
          that.EXTENSION.innerHTML = ext.innerHTML
          that.EXTENSION.scrollTop = 0
          const rect = that.EXTENSION.getBoundingClientRect()
          const tfX = rect.left < 0 ? -rect.left : rect.right > window.innerWidth ? window.innerWidth - rect.right : 0
          const tfY = rect.top < 0 ? -rect.top : rect.bottom > window.innerHeight ? window.innerHeight - rect.bottom : 0
          if (tfX || tfY)
            that.DIV.style.transform = `translate(${tfX}px, ${tfY}px)`
          break

        case 'banner':
          that.EXTENSION.innerHTML = `
            <a target="_blank" rel="noopener noreferrer" href="${url}">
              <svg viewBox="0 0 360 96">
                <foreignObject width="100%" height="100%">
                  <div>
                    <span>${ext.getAttribute('text')}</span>
                  </div>
                </foreignObject>
              </svg>
            </a>
          `.replace(/\n\s*/g, '')
          break

        case 'videojs':
          if (!url || that.EXTENSION.VIDEOJS) {
            break
          }

          if (!that.EXTENSION.VIDEOJS_status) {
            that.EXTENSION.VIDEOJS_status = 'loading'
            console.time('Load Video.js')

            if (typeof loadVideoJS === 'function') {
              loadVideoJS()
              that.EXTENSION.VIDEOJS_status = 'loaded'
              console.timeEnd('Load Video.js')
              createPlayer()
              break
            }

            const urlsCSS = [
              'https://cdn.jsdelivr.net/npm/video.js@7.20.3/dist/video-js.min.css',
              'https://cdn.jsdelivr.net/npm/videojs-max-quality-selector@0.9.1/dist/videojs-max-quality-selector.css'
              // 'https://unpkg.com/video.js@7.20.3/dist/video-js.min.css',
              // 'https://unpkg.com/videojs-max-quality-selector@0.9.1/dist/videojs-max-quality-selector.css'
            ]

            const urlsJS = [
              'https://cdn.jsdelivr.net/npm/video.js@7.20.3/dist/video.min.js',
              'https://cdn.jsdelivr.net/npm/videojs-hotkeys@0.2.28/videojs.hotkeys.min.js',
              'https://cdn.jsdelivr.net/npm/videojs-contrib-quality-levels@2.2.0/dist/videojs-contrib-quality-levels.min.js',
              'https://cdn.jsdelivr.net/npm/videojs-max-quality-selector@0.9.1/dist/videojs-max-quality-selector.min.js',
              // 'https://unpkg.com/video.js@7.20.3/dist/video.min.js',
              // 'https://unpkg.com/videojs-contrib-quality-levels@2.2.0/dist/videojs-contrib-quality-levels.min.js',
              // 'https://unpkg.com/videojs-max-quality-selector@0.9.1/dist/videojs-max-quality-selector.min.js'
            ]

            const urlGet = (url) => new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()

              xhr.onload = () => {
                if (xhr.status === 200) {
                  console.log(xhr.statusText, '|', url)
                  resolve(xhr.responseText.replace(/\n?\/\*.+?\*\/\n?/gs, '').trim())
                } else {
                  console.error(xhr.statusText, '|', url)
                  reject(xhr.statusText)
                }
              }

              xhr.onerror = () => {
                console.error(xhr.statusText, '|', url)
                reject(xhr.statusText)
              }

              xhr.open('GET', url)
              xhr.send()
            })

            const pCSS = Promise.all(urlsCSS.map(urlGet)).then((result) => {
              document.head.insertAdjacentHTML('beforeend', `<style>${result.map(i => i.replace(/^@charset.+?;/, '')).join('')}</style>`)
            })

            const pJS = Promise.all(urlsJS.map(urlGet)).then((result) => {
              Function(result[0]
                  .replace(
                    'new Uint8Array(t.data.data,i.byteOffset||0,i.byteLength||t.data.data.byteLength)',
                    '/firefox/i.test(window.navigator.userAgent)?cloneInto(new Uint8Array(t.data.data,i.byteOffset||0,i.byteLength||t.data.data.byteLength),window):new Uint8Array(t.data.data,i.byteOffset||0,i.byteLength||t.data.data.byteLength)'
                  )
                  .replace(
                    'n[t].forEach',                  // _this6[idName].forEach
                    'structuredClone(n[t]).forEach'  // https://caniuse.com/mdn-api_structuredclone
                ) +
                ';window.videojs = videojs;' + result[1] +
                result.slice(2).join(''))()
            })

            Promise.all([ pCSS, pJS ]).then(() => {
              that.EXTENSION.VIDEOJS_status = 'loaded'
              console.timeEnd('Load Video.js')
              createPlayer()
            })
          }

          if (that.EXTENSION.VIDEOJS_status === 'loaded') {
            createPlayer()
          }

          function createPlayer() {
            that.EXTENSION.VIDEOJS = document.createElement('video')
            that.EXTENSION.VIDEOJS.setAttribute('class', 'video-js')
            that.EXTENSION.VIDEOJS.setAttribute('id', 'imagus-player')
            that.EXTENSION.appendChild(that.EXTENSION.VIDEOJS)

            const playerOptions = {
              autoplay: 'any',
              controls: true,
              playbackRates: [0.5, 0.75, 1, 1.1, 1.25, 1.5, 2],
              loop: true,
              preload: 'auto',
              inactivityTimeout: 0,
              plugins: {
                  hotkeys: {},
              },
            }

            videojs(that.EXTENSION.VIDEOJS, playerOptions, () => {
              that.KEYS_TARGET = that.EXTENSION.VIDEOJS.parentElement
              const player = that.EXTENSION.VIDEOJS.player = videojs.players['imagus-player']
              const qLevels = player.qualityLevels()
              const mqSelectorOptions = {
                autoLabel: 'Auto ',
                disableAuto: true,
                displayMode: 1,
                defaultQuality: 2,
                // maxHeight: window.innerHeight,
                // maxWidth: window.innerWidth,
                filterDuplicateHeights: false,
                filterDuplicates: false,
                showBitrates: true
              }
              const mqSelector = player.maxQualitySelector(mqSelectorOptions)

              const setPlayerSize = (width, height) => {
                if (!player.isFullscreen()) {
                  setSVG(width, height)
                }
              }

              player.on('loadedmetadata', (e) => {
                that.EXTENSION.VIDEOJS?.focus();
                // select video stream to match window size
                for (let ql of mqSelector.qualityLevels) {
                  if (ql.height < window.innerHeight && ql.width < window.innerWidth) {
                    mqSelector.changeLevel(ql.id)
                    break
                  }
                }

                // select original audio
                for (let aud of player.audioTracks()?.tracks_ || []) {
                  if (aud?.id?.toLowerCase().includes('original')) {
                    aud.enabled = true
                    break
                  }
                }
              })

              qLevels.on('change', (e) => {
                setPlayerSize(qLevels[qLevels.selectedIndex].width, qLevels[qLevels.selectedIndex].height)
              })

              player.on('resize', () => {
                const vWidth = player.videoWidth()
                const vHeight = player.videoHeight()
                player.width(vWidth)
                player.height(vHeight)
                setPlayerSize(vWidth, vHeight)
              })

              player.on('fullscreenchange', () => {
                if (!mqSelector.selectedIndexPrevious) {
                  mqSelector.selectedIndexPrevious = mqSelector.selectedIndex
                  mqSelector.options.disableAuto = false
                  mqSelector.changeLevel(-1)  // auto
                } else {
                  mqSelector.changeLevel(mqSelector.selectedIndexPrevious)
                  delete mqSelector.selectedIndexPrevious
                }
              })

              player.volume(cfg.hz.mediaVolume / 100)
              player.src(url)
            })
          }

          break

      }
    }

    return res
  }

  that.switchToHiResInFZ_original = that.switchToHiResInFZ
  that.switchToHiResInFZ = () => {
    if (that.fullZm >= 1) {
      that.EXTENSION.style.pointerEvents = 'auto'
      if (that.EXTENSION.VIME || that.EXTENSION.VIDEOJS || that.EXTENSION.IFRAME) {
        that.EXTENSION.style.zIndex = 'auto'
      }

      const iControl = that.EXTENSION.querySelector('.imagus-iframe-control')
      if (iControl) iControl.style.display = 'block'
      that.EXTENSION.VIDEOJS?.focus()
    }
    if (that.fullZm === false) {
      that.EXTENSION.style.pointerEvents = ''
      that.EXTENSION.style.zIndex = ''
    }
    return that.switchToHiResInFZ_original()
  }
}

if (!this.EXTENSION) {
  const style = `
    #imagus-extension {
      pointer-events: none;
    }

    #imagus-extension.imagus-sidebar {
      background: padding-box rgb(31, 31, 31);
      border: ${this.DIV.style.border};
      border-radius: ${this.DIV.style.borderRadius};
      box-shadow: ${this.DIV.style.boxShadow};
      box-sizing: border-box;
      color: white;
      font: 13px / 1.3 sans-serif;
      left: calc(-360px + ${this.DIV.style.borderWidth} - 1px);
      padding: 5px 8px 6px;
      position: absolute;
      top: -${this.DIV.style.borderWidth};
      white-space: pre-wrap;
      width: 360px;
      z-index: -1;
      max-height: calc(100% + ${this.DIV.style.borderWidth} * 2);
      overflow-y: auto;
      overflow-wrap: break-word;
      overscroll-behavior: contain;
      scrollbar-color: auto;
    }
    #imagus-extension.imagus-sidebar > b {
      font-weight: bold;
    }

    #imagus-extension.imagus-sidebar a {
      color: #bbccff
    }

    #imagus-extension.imagus-banner {
      position: relative;
      top: -20%;
    }
    #imagus-extension.imagus-banner div {
      display: table;
      height: 100%;
      width: 100%;
    }
    #imagus-extension.imagus-banner span {
      color: white;
      display: table-cell;
      font: 18px sans-serif;
      vertical-align: middle;
      text-align: center;
      white-space: pre-wrap;
    }
    #imagus-extension.imagus-banner:hover span {
      color: #cceeff;
      text-decoration: underline;
    }

    #imagus-extension.imagus-videojs {
      height: 100%;
      position: relative;
      top: -100%;
      z-index: -1;
    }
    #imagus-extension.imagus-videojs > #imagus-player {
      --bottom: 0;
      --left: 0;
      --margin: auto;
      --position: absolute;
      --right: 0;
      --top: 0;
      height: 100%;
      width: 100%;
    }
    #imagus-extension.imagus-videojs video {
      outline: none;
      box-shadow: rgb(100 100 255) 0px 0px 0px 1px;
    }
    #imagus-extension .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      max-height: 20em;
    }
    #imagus-extension .vjs-playback-rate .vjs-menu {
      width: 5em;
    }
    #imagus-extension .vjs-max-quality-selector-button .vjs-menu {
      width: 14em;
    }
    #imagus-extension .vjs-max-quality-selector-button .vjs-menu .vjs-menu-content {
      padding: 5px;
    }
    #imagus-extension .vjs-max-quality-selector .vjs-menu li.vjs-selected {
        font-weight: 400;
        text-shadow: 0 0 #000;
    }

    .imagus-iframe-control {
      pointer-events: auto;
      cursor: pointer;
      position: fixed;
      inset: 0 auto auto 0;
      width: 100%;
      height: 5vh;
      border-left-top-radius: 1vh;
      background: yellow;
      opacity: .1;
      line-height: 5vh;
      text-align: center;
      z-index: 2;
      font-family: sans-serif;
      display: none;
    }
    .imagus-iframe-control:hover {
      opacity: .7;
    }
    #imagus-extension.imagus-iframe {
      /* pointer-events: none; */
      height: 100%;
      position: relative;
      top: -100%;
      /* z-index: -1; */
    }
    #imagus-extension > iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `.replace(/\n\s*/g, '')
  this.EXTENSION = inject('div', 'imagus-extension', null, this.DIV)
  inject('style', 'imagus-extension-style', style)
  this.EXTENSION_custom_style = inject('style', 'imagus-extension-custom-style')
  override(this)
}

const url = new URL($[0])
if (url.search) {
  const elem = document.createElement('imagus-extension')
  url.searchParams.forEach((val, key) => elem.setAttribute(key, val))
  this.TRG.IMGS_ext_from_url = elem
}

this.TRG.IMGS_ext_data?.forEach?.(i => {
  if (i[0] === '') i[0] = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"></svg>'
})

return this.TRG.IMGS_ext_data