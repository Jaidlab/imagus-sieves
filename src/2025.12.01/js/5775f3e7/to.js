// --- MM Gallery (Left Sideblock) ---

if (this.TRG.className == 'MMThumbImage-Image') {
  for (const item of window.wrappedJSObject.Ya.SerpContext.serpItems) {
    if (item.thumb.url.includes($[0])) return item.img_href + '\n' + item.thumb.url;
  }
}

// --- Related Images (Right Sideblock) ---

if (this.TRG.className == 'RelatedImages-Thumb') {
  for (const element of window.wrappedJSObject.Ya.reactBus.e['cbir:drag-start']) {
    if (element.ctx === undefined) continue;
    for (const rim_item of element.ctx._reactInternals.return.pendingProps.state.rimForItem) {
      if (rim_item.thumb.url.includes($[0])) {
        let urls = '';
        for (const preview_item of rim_item.preview) {
          urls += preview_item.origin?.url ? preview_item.origin?.url + '\n' + preview_item.url + '\n' : preview_item.url + '\n';
        }
        return urls;
      }
    }
  }
}

return $[0];