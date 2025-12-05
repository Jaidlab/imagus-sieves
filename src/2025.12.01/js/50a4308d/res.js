$._=JSON.parse($._)
return [[$._.record_type[0]=='m' ? $._.url : ['#'+$._.images.original, $._.images.large], $._.title + ' by ' + $._.character.display_name]]