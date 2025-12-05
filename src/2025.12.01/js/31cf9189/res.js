$=$._.match(/id="__NEXT_DATA__" type="application\/json">({.+?})<\//);
$=$&&JSON.parse($[1]).props?.pageProps?.initialState?.product?.card;
const id=$?.ids[0];
return $?.entities?.[id]?.images?.map(i=>[i])||''