if($[1])return $[1];
const m = 'https://media.wired';
let t = this.node;
t = RegExp(`^${m}`).test(t.src) ? t.src : t.querySelector(`img[src^="${m}"]`)?.src||'';
return t.replace(/\/(?:\d{1,2}:\d{1,2}|w_\d+[^/]+)/g,'')