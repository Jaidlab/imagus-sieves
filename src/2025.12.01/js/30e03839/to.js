if ($[1].includes('h-cdn.co')) $[1] = '//' + $[1];
if ($[1] == 'hmg-prod') $[1] = '//hmg-prod.s3.amazonaws.com';
if ($[1] == 'digitalspyuk') $[1] = '//digitalspyuk.cdnds.net';
if ($[1] == 'vader-prod') $[1] = '//vader-prod.s3.amazonaws.com';
if ($[1] == 'vidthumb') $[1] = 'http://hearst-gopher.thumbs.s3.amazonaws.com'; // hearst-gopher has a bad https certificate as of 2022-09-21

return $[1] + $[2].replace(/\/\d+x\d+\//, '/');