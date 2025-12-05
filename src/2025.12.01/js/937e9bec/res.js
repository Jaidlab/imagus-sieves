const data = JSON.parse($._.match(/__NEXT_DATA__[^{]+(.+)<\/script>/)[1]);
const res = data.props.pageProps.initialStore.productPage.product.images.map(i => [i.url.replace('<SIZE>', 'x1400'), '']);
if (res.length > 0) {
    res[0][1] = data.props.pageProps.initialStore.productPage.product.description;
}

return res.length ? res : false;