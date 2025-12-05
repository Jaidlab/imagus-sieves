if (/^(?:www\.)?google\./.test(new URL(document.URL).hostname)) {
  if (
    /\/search\?\S*tbm=isch/.test(document.URL) ||  // Google Images
    /\/imgres\?imgurl=/.test(document.URL) ||      // Google Images > Image page (Related images)
    /\/search\?\S*(?:imgrc|vhid)=/.test(document.URL)       // Google > Image Pack > Side frame (Related images)
  ) {
    const element = document.querySelector('a:hover[role="button"]')
    if (element) {
      element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      return element.href
    }
  }
  
  if (/\/search\?\S*udm=2/.test(document.URL)&&this.node?.closest('a')?.href?.startsWith('http')) // New Google Images
   {
    const element = document.querySelector('div:hover[role="button"]')
    if (element) {
      return '//gi_redirect/?'+$[0]
    }
  }

  // SERP Features: Image Pack | moz.com/learn/seo/serp-features#image-pack / dataforseo.com/serp-features#images
  if (/\/search\?/.test(document.URL)) {
    let id, n = this.node.parentNode?.parentNode
    if(id = n?.getAttribute('data-docid')||n?.parentNode?.parentNode?.parentNode?.getAttribute('data-docid')){
      const o = Object.values(JSON.parse(document.body.outerHTML.match(/var m=({.+?});/)[1]))
      return o.find(i=>Array.isArray(i[1]?.[0])&&i[1][0]?.find(x=>x[1]===id))?.[1][0].find(y=>y[1]===id)?.[3][0]||o.find(i=>i[1]?.[1]===id)?.[1][3][0]||''
    }

    function findByDocid(obj, str) {
      if (typeof obj?.[1] === 'string' && obj[1] === str) {
        return obj
      }
      for (let val of Object.values(obj)) {
        if (val && typeof val === 'object' && (val = findByDocid(val, str), val)) {
          return val
        }
      }
    }

    function W_jd() {
     /* const s = document.createElement('script')
      s.textContent = 'sessionStorage.setItem("W_jd", JSON.stringify(window.W_jd)); document.currentScript.remove();'
      document.head.appendChild(s)
      const result = sessionStorage.getItem('W_jd')
      sessionStorage.removeItem('W_jd')
      return JSON.parse(result) */
      return JSON.parse(document.body.outerHTML.match(/var m=({.+?});/)[1])
    }

    const element = document.querySelector('div:hover[data-docid]')
    if (element) {
      return findByDocid(W_jd(), element.dataset.docid)[3][0]
    }
  }
}

return $[0]