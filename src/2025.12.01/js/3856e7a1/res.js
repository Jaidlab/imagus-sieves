$=JSON.parse($._.match(/"__NEXT_DATA__" type="application\/json">(.+?)<\/script/)?.[1]||'{}').props?.pageProps?.reactQueryDehydratedState?.queries;
if(!$)return '';
$=Object.values($).find(i=>i?.state?.data?.product?.images)?.state?.data?.product?.images||[];
return $.map(i=>[i.originalUrl])