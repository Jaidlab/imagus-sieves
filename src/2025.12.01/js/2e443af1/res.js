var id = $._.match(/id: \'([^'])+/gm)[0].substring(5);
var nonce = $._.match(/nonce: \'([^'])+/gm)[0].substring(8);
var p = this, x = new XMLHttpRequest;
x.open('POST', 'https://3dhentaix.com/wp-admin/admin-ajax.php');
x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
x.timeout = 3000;
x.send("action=msv-get-sources&id="+id+"&nonce="+nonce);
x.onloadend = function() {
    const resolutions = JSON.parse(this.responseText).sources["video-source-0"];
    p.prepareCaption(p.node, 'Test');
    p.set(resolutions + "#mp4");
}
return null