const re=new RegExp(`${$[1].replaceAll('.','\\.')} \\d+w[^<]+?\\\\"playback_url\\\\":\\\\"([^"]+)\\\\"`);
return document.body.outerHTML.match(re)?.[1]||''