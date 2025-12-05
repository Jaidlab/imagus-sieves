var id=$._.match(/src="([^"]+\/)embed(\/\d+)/);
return id ? id[1]+'video'+id[2]+$[1] : !1;