const previewSource = $._.match(/product_slider_data[\s\S]+?work_slider_container/)[0];

const res = Array.from(previewSource.matchAll(/data-src="([^"]+)"/g), match => [`https:${match[1]}`]);

return res;