if($.base[0]==='d'){
const x=new XMLHttpRequest();
x.open('GET','https://www.discogs.com/service/catalog/api/graphql?operationName='+ ($[3] || $[1]=='release' ? 'ReleaseAllImages' : 'MasterReleaseAllImages') +'&variables={"discogsId":' + ($[3] ? $[3] : $[2]) + ',"count":500}&extensions={"persistedQuery":{"version":1,"sha256Hash":"'+ ($[3] || $[1]=='release' ? 'c7033a9fd1facb3e69fa50074b47e8aa0076857a968e6ed086153840e02b988a' : 'd4f46242851858eeae5e60edf0bc5d2e4e9124e8a2991f7168f41a3ac1e80489') +'"}}',false);
x.send();
$._=x.responseText;
}
let res=[];
const json=JSON.parse($._);
if (json.data.masterRelease) {
  json.data.masterRelease.keyRelease.images.edges.forEach(function(i) {
    res.push([i.node.fullsize.sourceUrl]);
  });
  return res;
}
else if (json.data.release) {
  json.data.release.images.edges.forEach(function(i) {
    res.push([i.node.fullsize.sourceUrl]);
  });
  return res;
}
return res;