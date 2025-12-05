let parser = new DOMParser();
let doc = parser.parseFromString($._, "text/html");
let images = doc.querySelectorAll('#jig1-html ul li a');
if(images.length === 0) return null;
let final = [];
for(image of images){
   final.push([image.href])
}
return final;