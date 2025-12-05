id = $[1]
const params={
	"operationName": "ContentPageData",
	"query": "query ContentPageData($id: ID!, $isLoggedIn: Boolean!, $isAmateur: Boolean!, $isAnime: Boolean!, $isAv: Boolean!, $isCinema: Boolean!, $isSP: Boolean!) {\n  ppvContent(id: $id) {\n    ...ContentData\n    __typename\n  }\n\n  ...basketCountFragment\n}\nfragment ContentData on PPVContent {\n  id\n  floor\n  title\n  isExclusiveDelivery\n  releaseStatus\n  description\n  notices\n  isNoIndex\n  isAllowForeign\n\n  packageImage {\n    largeUrl\n    mediumUrl\n    __typename\n  }\n  sampleImages {\n    number\n    imageUrl\n    largeImageUrl\n    __typename\n  }\n\n  mostPopularContentImage {\n    ... on ContentSampleImage {\n      __typename\n      largeImageUrl\n      imageUrl\n    }\n    ... on PackageImage {\n      __typename\n      largeUrl\n      mediumUrl\n    }\n    __typename\n  }\n\n  sample2DMovie {\n    fileID\n    highestMovieUrl\n    __typename\n  }\n  sampleVRMovie {\n    highestMovieUrl\n    __typename\n  }\n  ...AmateurAdditionalContentData @include(if: $isAmateur)\n  ...AnimeAdditionalContentData @include(if: $isAnime)\n  ...AvAdditionalContentData @include(if: $isAv)\n  ...CinemaAdditionalContentData @include(if: $isCinema)\n  __typename\n}\n\nfragment AmateurAdditionalContentData on PPVContent {\n  \n  \n  amateurActress {\n    id\n    name\n    imageUrl\n    age\n    waist\n    bust\n    bustCup\n    height\n    hip\n    relatedContents {\n      id\n      title\n      __typename\n    }\n    __typename\n  }\n\n\n\n  makerContentId\n  __typename\n}\nfragment AnimeAdditionalContentData on PPVContent {\n  \n\n\n\n  makerContentId\n  __typename\n}\nfragment AvAdditionalContentData on PPVContent {\n  \n  \n  actresses {\n    id\n    name\n    nameRuby\n    imageUrl\n    isBookmarked @include(if: $isLoggedIn)\n    __typename\n  }\n\n\n\n\n  makerContentId\n  __typename\n}\nfragment CinemaAdditionalContentData on PPVContent {\n  \n  actresses {\n    id\n    name\n    nameRuby\n    imageUrl\n    __typename\n  }\n\n\n  authors {\n    id\n    name\n    __typename\n  }\n \n\n\n  makerContentId\n  __typename\n}\n\nfragment basketCountFragment on Query {\n  basketCount: legacyBasket @include(if: $isSP) {\n    total\n    __typename\n  }\n  __typename\n}",
	"variables": {
		"id": id,
		"isAmateur": false,
		"isAnime": false,
		"isAv": true,
		"isCinema": false,
		"isLoggedIn": false,
		"isSP": false
	}
},
x=new XMLHttpRequest();
x.open('POST','https://api.video.dmm.co.jp/graphql',false);
x.setRequestHeader('content-type','application/json');
x.send(JSON.stringify(params));

const ppv = JSON.parse(x.responseText).data?.ppvContent || {};
return [
  ...(ppv.packageImage?.largeUrl ? [[ppv.packageImage.largeUrl]] : []),
  ...(ppv.mostPopularContentImage?.largeImageUrl ? [[ppv.mostPopularContentImage.largeImageUrl]] : []),
  ...(ppv.mostPopularContentImage?.largeUrl ? [[ppv.mostPopularContentImage.largeUrl]] : []),
  ...((ppv.sampleImages || []).map(i => [i.largeImageUrl]).filter(i => i[0])),
  ...(ppv.sample2DMovie?.highestMovieUrl ? [[ppv.sample2DMovie.highestMovieUrl]] : []),
  ...(ppv.sampleVRMovie?.highestMovieUrl ? [[ppv.sampleVRMovie.highestMovieUrl]] : [])
];