if($[1])return $[1]+'#kf/ #'+$[2];
const n=this.node.closest('[class^="product-snippet_ProductSnippet__container"]')?.getAttribute('exp_product');
return n ? `https://${$[3]}productIds=${n}` : ''