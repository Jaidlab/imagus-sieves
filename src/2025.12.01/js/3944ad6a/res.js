const re =
  /(?:"__PWS_INITIAL_PROPS__"|data-relay-response="true") type="application\/json">(?<data>.+?)<\/script>/g;
let jsons;
try {
  jsons = [...$._.matchAll(re)].map(data => JSON.parse(data.groups.data));
  if (jsons.length === 0) throw new Error('No data found');
} catch (error) {
  console.error('Failed to parse jsons');
  console.error('Post error on /r/imagus');
  return;
}

// If media link has a matching sieve, use that instead.
const link = jsons[1]?.response?.data?.v3GetPinQuery?.data?.link;
const loop = !/\.pin(?:terest|img)\.com\//.test(link)&&this.find({href: link});
if(loop !== false && loop !== '')return {loop:link};

const json =
  jsons.find(
    // Initialreduxstate has data when logged in.
    json =>
      typeof json?.initialReduxState?.pins === 'object' &&
      Object.keys(json.initialReduxState.pins) > 0
  )?.initialReduxState?.pins || null;

let data;
data = json ? json[Object.keys(json)[0]] : null;
data =
  data ||
  (
    jsons.find(json => {
      json?.requestParameters?.name === 'CloseupStoryPinQuery' ||
        json?.requestParameters?.name === 'CloseupDetailQuery';
    }) || jsons[jsons.length - 1]
  )?.response?.data?.v3GetPinQuery?.data;


if (!data) {
  console.error('Pinterest object likely changed.');
  console.error('Post error on /r/imagus');
  return;
}

const getImg = data => {
  return (
    data?.images?.orig?.url ||
    data?.images?.orig?.['1200x'] || // Logged In
    data?.images?.orig?.['750x'] ||
    data?.images?.orig?.['736x'] ||
    data?.images?.orig?.['564x'] ||
    data?.images?.orig?.['474x'] ||
    data?.images?.orig?.['236x'] ||
    data?.image?.images?.['originals']?.url || // Story Images Logged In
    data?.image?.images?.['1200x']?.url ||
    data?.image?.images?.['736x']?.url ||
    data?.image?.images?.['564x']?.url ||
    data?.image?.images?.['474x']?.url ||
    data?.image?.images?.['236x']?.url ||
    data?.imageSpec_orig?.url || // Logged Out
    data?.imageSpec_1200x?.url ||
    data?.imageSpec_750x?.url ||
    data?.imageSpec_736x?.url ||
    data?.imageSpec_564x?.url ||
    data?.imageSpec_474x?.url ||
    data?.imageSpec_236x?.url ||
    data?.imageSpec_170x?.url
  );
};

const getVid = block => {
  return (
    block?.video?.video_list?.['V_EXP7']?.url || // Logged In
    block?.video?.video_list?.['V_EXP6']?.url ||
    block?.video?.video_list?.['V_EXP5']?.url ||
    block?.video?.video_list?.['V_EXP4']?.url ||
    block?.video?.video_list?.['V_EXP3']?.url ||
    block?.video?.video_list?.['V_HLSV3_MOBILE']?.url ||
    block?.videoDataV2?.videoList1080P?.v1080p?.url || // Logged Out
    block?.videoData?.videoList1080P?.v1080p?.url || // Logged Out
    block?.videoDataV2?.videoList720P?.v720P?.url ||
    block?.videoData?.videoList720P?.v720P?.url ||
    block?.videoDataV2?.videoListMobile?.vHLSV3MOBILE?.url ||
    block?.videoData?.videoListMobile?.vHLSV3MOBILE?.url
  );
};
//

const title = data?.gridTitle || data?.grid_title || '';
const storyData = data?.storyPinData || data?.story_pin_data;

const storyList =
  (storyData &&
    storyData.pages
      .map(el =>
        el?.blocks?.[0]?.__typename === 'StoryPinVideoBlock' ||
        el?.blocks?.[0]?.type === 'story_pin_video_block'
          ? getVid(el?.blocks?.[0])
          : getImg(el?.blocks?.[0])
      )
      .filter(el => el)
      .map(url => [url, title])) ||
  [];
// Return story album if it exists.
if (storyList.length) return storyList;

const videoObj = data?.videos?.videoList || data?.videos?.video_list || {};
const videoList = Object.keys(videoObj)
  .filter(key => videoObj[key].url)
  .map(key => ({
    url: videoObj[key].url,
    height: videoObj[key].height,
  }))
  .filter(vid => vid.url.endsWith('.mp4'))
  .sort((a, b) => b.height - a.height);
// Return video if it exists
if (videoList.length) return [videoList[0].url, title];

const img = getImg(data);
// Otherwise return a single image.
return img && [img, title];