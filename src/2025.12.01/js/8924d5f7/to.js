const data = JSON.parse(document.documentElement.outerHTML.match(/UIStartpage.AppSerpImages, (.+?)\)[\n,]/)[1]);

const img_array = data.render.presenter.regions.mainline.filter(i=>i.display_type==='images-bing').map(i=>i.results).flat();

const img = img_array.find(i=>i.thumbnailUrl?.includes($[1]))
return img ? img.anonImageViewUrl+'\n'+img.rawImageUrl : ''