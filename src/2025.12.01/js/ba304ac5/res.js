$=JSON.parse($._.match(/"__NEXT_DATA__" type="application\/json">(.+?)<\/script/)[1]).props.initialReduxState.product.activeVariant.sides;
return $.map(i=>[['#'+i.big.replace('500.','700.'),i.big]])