const params={"operationName":"FPADataQuery","variables":{"advertId": $[1],"numberOfImages":500},"query": "query FPADataQuery($advertId: String!,$numberOfImages:Int,$searchOptions:SearchOptions){\nsearch{\nadvert(advertId: $advertId,searchOptions:$searchOptions) {imageList(limit: $numberOfImages){nextCursor size images{url templated classificationTags{label category __typename}__typename}__typename}__typename}__typename}}"}, x=new XMLHttpRequest();
x.open('POST','https://www.autotrader.co.uk/at-graphql?opname=FPADataQuery',false);
x.setRequestHeader('content-type','application/json');
x.send(JSON.stringify(params));
return (JSON.parse(x.responseText).data?.search?.advert?.imageList?.images||[]).map(i=>[i.url.replace('{resize}/','')])