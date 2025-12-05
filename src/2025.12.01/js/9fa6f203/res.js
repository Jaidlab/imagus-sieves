const product_image = $._.match(/\/sites\/default\/files\/product-images\/[^?"]+/)[0]
const user_images = $._.match(/(?<=href=")\/sites\/default\/files\/imagecache\/copyright1[^?"]+/g)
return user_images?.map((e) => [ 'https://irecommend.ru' + e.replace('/imagecache/copyright1', ''), '']) || 'https://irecommend.ru' + product_image