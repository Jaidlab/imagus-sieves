$=JSON.parse($._.match(/">({"[^\n]+)</)[1])
return [$.downloadUrl.replace(/\?.*/, ''), [$.buildTime, $.title, $.urlIfDeleted].join(' | ')]