if($[0][0]==='c')return $[0]
var v=$[2]?'':$[0].slice($[1].length); v=v&&v.match(/[?&](v=\d+)/)||'';
return $[1] + ($[2]?'raw'+$[2]:v&&('?'+v[1]))