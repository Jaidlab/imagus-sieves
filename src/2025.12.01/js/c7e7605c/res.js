let res = []

try {
  let data = JSON.parse(JSON.parse(decodeURIComponent(/<script.+src="(data:text.+)/.exec($._)[1]).match(/JSON.parse\((".+}")/)[1]))
  const mediaData = JSON.parse(Object.values(data.urqlSsrData.results).find(v => /mediaWindow\":/.test(v.data)).data)
  res.push(...mediaData.mediaWindow.windowPanes[0].albums[0].mediaList.map(img => [img.photoSizes.reduce((prev, cur) => prev.width > cur.width ? prev : cur).url, '']))
} catch (error) {}
if (res.length) return res

return [...new DOMParser().parseFromString($._, "text/html").querySelectorAll('.mobile_flex_container img')]
  .map(i => [i.dataset.lazyurl.replace(/\/photo-\w\//, '/photo-o/')])