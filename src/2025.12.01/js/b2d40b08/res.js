let jsn=JSON.parse($._.match(/<script id="__NEXT_DATA__" type="application\/json".+?({.+?)<\/script>/)[1]).props.apolloState.data, res=[];
Object.values(jsn).forEach(i=>i.image?.avatarsUrl&&res.push([i.image?.avatarsUrl+'/orig']));
return res;