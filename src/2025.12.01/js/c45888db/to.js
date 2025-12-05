const elem = document.createElement('script')
elem.textContent = `{
  const s = JSON.stringify([
    window.__NEXT_DATA__.props.pageProps.mainItem?.images,
    window.__NEXT_DATA__.props.pageProps.items?.map((i) => i.images),
    window.next.router.components['/software/[urlName]']?.props.pageProps.mainItem?.images,
    window.next.router.components['/software/[urlName]']?.props.pageProps.items?.map((i) => i.images),
    window.next.router.components['/software/[urlName]/about']?.props.pageProps.mainItem?.images,
    window.next.router.components['/software/[urlName]/about']?.props.pageProps.items?.map((i) => i.images)
  ].filter(Boolean))
  const m = s.match(new RegExp('fileName":"([^"]+)","type":"(Screenshot|Icon)"[^}]+${$[1]}'))
  sessionStorage.setItem('imagus-file', m[1] + ';;' + m[2])
  document.currentScript.remove()
}`
document.head.appendChild(elem)
const [ file_name, file_type ] = sessionStorage.getItem('imagus-file').split(';;')
sessionStorage.removeItem('imagus-file')
return `https://d2.alternativeto.net/dist/${file_type === 'Icon' ? 'icons' : 's'}/${file_name}?format=${/\.gif$/.test(file_name) ? 'gif' : 'png'}`