addCss();
// check if this is a video pin
const pin = this.TRG.closest('[data-test-id="pin"]');
if (pin?.querySelector('[data-test-id^="pincard-video"], [data-test-id="pinrep-video"]')) {
  return `https://ru.pinterest.com/pin/${pin.dataset.testPinId}/`
}
if($[1]) return $[1] + ($[2] ? $[2] : ($[3] ? $[3].replace(/(\d+)_\d+$/, '$1') + '_600' : '#originals 736x 564x#/' + $[4]))
var n=this.node, p=document.evaluate('./ancestor::a[starts-with(@href,"/pin/")]//img[contains(@src,"pinimg.com")]',n,null,9,null).singleNodeValue
p=p?this.find({src: p.src, IMGS_TRG: n}):''
return (Array.isArray(p) ? p.join('\n') : (p === null ? 'null' : p)) || ''

function addCss() {
  if (document.querySelector('#imagus_styles')) return;
  const styleElement = document.createElement('style');
  styleElement.id = 'imagus_styles';
  styleElement.textContent = `
    [data-test-id*="pin-card-hover-overlay"],
    [data-test-id*="pin-card-hover-overlay"] + *,
    [style*="background-color: rgba(17, 17, 17, 0.4)"] {
        pointer-events:none;
    }
  `;

  document.head.appendChild(styleElement);
}