var i=$[1][0]=='i'
return '//i.pximg.net/' + (i ? 'img-original' : $[1]) + $[2] + (i && $[3]=='.jpg' ? '.#jpg png gif#' : $[3])