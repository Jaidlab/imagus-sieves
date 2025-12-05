const include_nsfw_in_model_album = false // True shows all images on model links
const hide_content_message = false // True hides restricted content caption message

if($[2]?.[0]==='m'){
$=JSON.parse($._).modelVersions?.[0]?.images||[];
const t=!include_nsfw_in_model_album&&!hide_content_message&&$.some(i=>i.nsfwLevel>1) ? '[WARNING! To show restricted content in albums, open the Civitai-g sieve and and set include_nsfw_in_model_album to true. To hide this message, set hide_content_message to true.]' : '';
return $.filter(i=>include_nsfw_in_model_album||i.nsfwLevel==1).map(i=>[i.url.replace(/width=\d+\//,'original=true/'),t])
}
let u=$._.match(/https:\/\/image\.civitai\.com\/[^\/]+\//)?.[0]||'https://image.'+$[1]+'xG1nkqKTMzGDvpLrqFT7WA/', o=JSON.parse($._.match(/"application\/json">({.+?})</)[1]).props?.pageProps?.trpcState?.json?.queries?.find(i=>i.state?.data?.pages||i.state?.data?.url&&i.state?.data?.name)?.state.data||{};
return o.pages ? o.pages[0].items.map(i=>[u+i.url+'/original=true/'+i.name]) : o.url&&o.name ? u+o.url+'/original=true/'+o.name : {loop:this.node.src||''}