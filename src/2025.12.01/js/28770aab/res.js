$=JSON.parse($._).data?.children?.[0]?.data;
$=$.secure_media?.reddit_video?.hls_url||!/reddit\.com\/(?:r|u(?:ser)?)\//.test($.url)&&$.url||$.preview?.reddit_video_preview?.dash_url||$.preview?.images?.[0]?.variants?.mp4?.source?.url||$.preview?.images?.[0]?.source?.url;
return $?.length?/\.gif\b/.test($)?$:{loop:$}:''