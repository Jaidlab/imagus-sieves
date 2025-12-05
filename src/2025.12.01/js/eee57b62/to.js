const n = this.node

if(!/^(?:gofile\.io|(?:[a-z]{2}\.)?files\.fm)$/.test(location.hostname))return ''

// Files.fm also uses this URL. This code loops to the Files.fm sieve if on that site

if(/^(?:[a-z]{2}\.)?files\.fm$/.test(location.hostname)){
return this.node.parentNode.parentNode.querySelector('div[data-clipboard-text]')?.dataset?.clipboardText||''
}
const elem = document.createElement('script')
elem.textContent = 'sessionStorage.setItem("gofile__data", JSON.stringify(Object.values(mainFolderObject.children))); document.currentScript.remove();'
document.head.appendChild(elem)
const gofileData = JSON.parse(sessionStorage.getItem('gofile__data'))
sessionStorage.removeItem('gofile__data')
$ = gofileData.find(i=>i.name===n.textContent)?.link||''
return $+(/\.m[ok]v$/.test($)?'#mp4':'')