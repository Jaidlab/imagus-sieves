if (this.TRG?.hasAttribute("src") && !this.TRG.src) {
    this.TRG.src = this.TRG.getAttribute("src");
}
return $[0].indexOf('format=mp4') > 0 ? $[0]+'#mp4' : 'i'+$[1]