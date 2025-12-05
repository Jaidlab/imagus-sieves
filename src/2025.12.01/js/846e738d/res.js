//To disable the sidebar, set use_sidebar below to false.
const use_sidebar = true;
const res = [];
const parser = new DOMParser();
const doc = parser.parseFromString($._, "text/html");
const dataNode = doc.querySelector('meta[name="server-response"]');
let jsonData = JSON.parse(dataNode?.attributes?.content.value);
if (jsonData) {
  const response = jsonData?.data?.response;
  res.push(response?.video?.thumbnail?.player);
  let sec = response?.video?.duration;
  let duration = "";
  if (sec) {
    let hh = Math.floor(sec / 3600);
    let mm = Math.floor((sec % 3600) / 60);
    let ss = sec % 60;
    duration = `${hh ? hh.toString().padStart(2, '0') + ":" : ""}${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  }
  let date = new Date(response?.video?.registeredAt)?.toLocaleString('ja-JP');
  if (use_sidebar) {
    res.push(`<imagus-extension type="sidebar"><h3 style="font-size: 1.2em;"><b>${response?.video?.title}</b></h3>\nAuthor:  \t\t${response?.owner?.nickname || response?.channel?.name}\nDate:    \t\t${date}\nLength:  \t\t${duration}\nViews:   \t\t${response?.video?.count?.view}\nComments:\t${response?.video?.count?.comment}\n\n${response?.video?.description}</imagus-extension>`);
    this.TRG.IMGS_ext_data = res;
    return { loop: 'imagus://extension' };
  } else {
    res.push(`${response?.video?.title} | ${response?.owner?.nickname || response?.channel?.name} | ${date} | ⏱ ${duration} | 👁 ${response?.video?.count?.view} | 💬 ${response?.video?.count?.comment} | 📝 ${response?.video?.description}`);
    return res;
  }
} else {
  return;
}