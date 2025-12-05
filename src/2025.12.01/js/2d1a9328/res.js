$=JSON.parse($._.match(/data-component='AssetDetail'>[^{]+([^\n]+)/)[1]).asset;
return $.filmCompUrl||[[['#'+$.highResCompUrl,$.defaultMainImageURL]]]