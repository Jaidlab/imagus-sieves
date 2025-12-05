if ($[0].match(/\/box\//))
    return $[0].replace("thumb", "front");
else if ($[0].match(/\/screen\/thumb\//))
    return $[0].replace("thumb", "full");