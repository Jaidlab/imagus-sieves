const res = [];
const doc = new DOMParser().parseFromString($._, "text/html");

Array.from(doc.querySelectorAll('.model-slider__sub img')).forEach(el => {
    res.push([el.src.replace(/\d+x\d+/, '2000x2000')]);
});
return res;