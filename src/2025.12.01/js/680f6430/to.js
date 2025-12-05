const disable_on_video = false

if (location.hostname === 'www.google.com') return '';
const n = this.node;
if ( disable_on_video && n?.nodeName === 'VIDEO') return '';
if (!disable_on_video && n?.nodeName === 'VIDEO') n.title = 'Imagus activating on videos can be disabled in the [LinkedMedia] sieve';

if (!RegExp.prototype.test_original) {
  /* workaround for Imagus bug, force RexExp.test to ignore case */
  RegExp.prototype.test_original = RegExp.prototype.test;
  RegExp.prototype.test = function(str) {
    if (this.source?.startsWith("^[^?#]+\\.")) {
      return (new RegExp(this.source, 'i')).test_original(str)
    } else {
      return this.test_original(str)
    }
  }
}

// width and height of the tagret element should be more that 39px
if (this.TRG?.localName !== 'a' && 
    this.TRG?.clientWidth && this.TRG?.clientWidth < 40 && 
    this.TRG?.clientHeight && this.TRG?.clientHeight < 40)
{
    return '';
}

// Imagus fix
if (this.TRG?.hasAttribute("src") && !this.TRG.src) {
    this.TRG.src = this.TRG.getAttribute("src");
}

return $[0];