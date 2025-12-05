const use_HLS = false // Set to true to use HLS player instead of mp4 video

$=$._.match(/"sources":({.+?}}}),"/);
$=$&&JSON.parse($[1]);
var h=Math.imul||function(e,t){var i=65535&e,n=65535&t;return i*n+(((e>>>16&65535)*n+i*(t>>>16&65535)&65535)<<16)|0};
var decode=e=>{if(!e||'object'!=typeof e)return e;let t=Array.isArray(e)?[]:{};return Object.keys(e).forEach(i=>{e[i]&&'object'==typeof e[i]?t[i]=decode(e[i]):'url'===i||'fallback'===i?t[i]=function(e){if('string'!=typeof e)return e;var t=0|e.length;if(!(t>0&&(1&t)==0&&/^[0-9a-fA-F]+$/.test(e)))return e;var i=function(e){if('string'!=typeof e)throw Error('not string');var t=e.length;if((1&t)!=0)throw Error('bad hex length');for(var i=Array(t>>1),n=0,s=0;n<t;n+=2){var r=parseInt(e.substr(n,2),16);if(r!=r)throw Error('bad hex');i[s++]=r}return i}(e);if(i.length<5)return e;var n=0|i[0];if(1!==n&&2!==n&&3!==n)return e;for(var s=function(e,t){var i=0|t;if(1===e)return function(){return 255&(i=h(i,1664525)+0x3c6ef35f|0)};if(2===e)return function(){return i|=0,i^=i<<13,i^=i>>>17,i^=i<<5,255&(i|=0)};if(3===e)return function(){var e=i=i+0x9e3779b9|0;return e^=e>>>16,e=0|h(e,0x85ebca77),e^=e>>>13,e=0|h(e,0xc2b2ae3d),255&(e^=e>>>16)};throw Error('Id: '+e)}(n,i[1]|i[2]<<8|i[3]<<16|i[4]<<24),r=Array(i.length-5),o=5,a=0;o<i.length;o++,a++)r[a]=(i[o]^s())&255;return function(e){for(var t='',i=0;i<e.length;i++){var n=e[i].toString(16);n.length<2&&(n='0'+n),t+='%'+n}try{return decodeURIComponent(t)}catch(t){for(var s='',r=0;r<e.length;r++)s+=String.fromCharCode(e[r]);return s}}(r)}(e[i]):t[i]=e[i]}),t};
$=$&&decode($);
if(use_HLS)return {loop:$.hls?.h264?.url||''};
$=$.standard?.h264;
return $ ? [[['#'+$.pop()?.url,$.find(i=>/^(36|48)0p/.test(i.quality))?.url||'']]] : ''