const useSidebar = true; //Set to true, details will be displayed in the sidebar.
const allowMaxResolution = true; //true:Maximum resolution (if any). false:Full HD at maximum.
const lowResolutionFirst = false; //Set to true, display low resolution images first. Press TAB to switch to full size image.

const DEBUG_MODE = false;
const log = (DEBUG_MODE) ? console.log.bind(console) : () => { };

log($);
const appID = $[1];
const data = JSON.parse($._)[appID].data;
log(data);
const title = data.name;
const price = (data.is_free) ? 'Free Play' : (data.price_overview?.final_formatted) ? data.price_overview.final_formatted : '';
const caption = (price) ? title + ': ' + price : title;
const desc = data.about_the_game;
const DRMNotice = (data.drm_notice) ? data.drm_notice : '';
const extAccountNotice = (data.ext_user_account_notice) ? data.ext_user_account_notice : '';
const notices = (DRMNotice && extAccountNotice) ? [DRMNotice, extAccountNotice] : [DRMNotice] || [extAccountNotice];
const releaseDate = data.release_date?.coming_soon === true ? data.release_date.date : '';
const backgroundImage = data.background;
const css = `
#imagus-extension.imagus-sidebar {
  background-color: rgb(36, 44, 54);
  background-image: url(${backgroundImage});
	h1, h3, p {
		color: rgb(200, 200, 200);
	}

  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
    color: rgb(83, 145, 181);
  }
  h3 {
    font-size: 18px;
  }
  p.notice {
    color: #e1c48a;
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(0%, rgba(130, 114, 81, 0.5)),
      color-stop(100%, rgba(226, 197, 139, 0.5))
    );
    margin-bottom: 5px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
}
`;
const l = lowResolutionFirst;
const m = allowMaxResolution;
const fixProtocol = url => url.replace(/^http:\/\//, 'https://');
const images = data.screenshots?.map(image => [
	[`${(!l) ? '#' : ''}${(!m) ? image.path_full : image.path_full.replace(/\.\d+x\d+\./, '.')}`, `${(!l) ? '' : '#'}${image.path_thumbnail}`]
]) ?? [];
const videos = data.movies?.map(video => [
	[`${(!l) ? '#' : ''}${fixProtocol(video.mp4.max)}`, `${(!l) ? '' : '#'}${fixProtocol(video.mp4["480"])}`],
	video.name
]) ?? [];
const res = [...images, ...videos];

const prepResult = (res, content) => {
	if (useSidebar) {
		if (!lowResolutionFirst) res.splice(1, 0, [res[0][0]]);//first image is hard to see in the sidebar, so I'll register two.
		res[0][1] = `<imagus-extension type="sidebar"><style>${css}</style><h1>${title}</h1><h3>${price}</h3><h3>${releaseDate}</h3>${notices.map(notice => `<p class="notice">${notice}</p>`).join('')}<br>${content}</imagus-extension>`;
		this.TRG.IMGS_ext_data = res
		return { loop: 'imagus://extension' }
	} else {
		res[0][1] = `${caption} | ${data.short_description}`;
		return res
	}
}

return prepResult(res, desc);