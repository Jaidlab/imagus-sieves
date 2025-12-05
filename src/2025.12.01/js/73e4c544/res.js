let jsn=$._.match(/<script id="__NEXT_DATA__" type="application\/json">({.+})<\/script>/)[1];
let jsnP=JSON.parse(jsn);
let r=[];
jsnP.props.pageProps.design.designExtension.design_pictures.forEach(
  p=>{
    r.push([p.url]);
  }
);
return r;