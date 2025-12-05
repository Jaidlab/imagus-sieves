$=$._.match(/"__NEXT_DATA__" type="application\/json">({.+?})<\//)
$=$&&JSON.parse($[1]).props?.pageProps?.newResult[0][0]
return $ ? $.file_url : ''