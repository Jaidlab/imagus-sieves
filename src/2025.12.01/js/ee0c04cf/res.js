//If set to true, the imagus style of media description will be used.
//Example: {Dimensions} {Publish Date} | {Title} | {Author} | {Category} 
//Set to false to use the sieve author's preference. The description length is a useful indicator to tell if the post is worth clicking to read the description.
//Example: {Title} | {Author} | {Description Length} 
const imagus_description_style = true;

//if set to "high", the largest possible media will be displayed. Useful for downloading highest quality content.
//if set to "low", web-optimized media will be displayed. Best choice for fast browsing and low internet speeds.
//if set to "both", the web-optimized media(s) will be first in the gallery, followed by the largest possible media(s)
const res_option = "high"

//Set what the text-to-image render turns into an image.
//Possible values: "description", "text body"
const text_post_render = "description";

//Set how the text-to-image render handles the text
//Possible values: "preview", "full"
const text_post_mode = "preview";

//Set if text from posts will always render, even on image posts
//On image posts, it will add itself after images in the popup gallery. 
const text_post_always = true;

//Set if text-to-image renders go before other media or after
//This only matters if text_post_always = true
const text_post_first = false; 

//Set a few reading options for the text-to-image render
const reading_width = 900;
const fontsize = 22;
const font = 'Verdana';
const fontcolor = "yellow";
const linespacing = 5;
const padding = 10;
const backgroundcolor = "black";
const textalign = "left";

//Set true to view debugging console messages
const debug = false;


if(debug) console.log("DeviantArt Verbose Sieve V3.0");

let pagedefinitionsJSON=$._.match(/\.__INITIAL_STATE__\s*=\s*JSON\.parse\(("[^\n]+")/)

//This deviationdefinition_all let is thorough information about the deviation, including the user and related deviations
let deviationdefinition_all=pagedefinitionsJSON?.[1]&&JSON.parse(eval(pagedefinitionsJSON[1]))['@@entities'];
if(!deviationdefinition_all)return this.node.src||'';


//Grab JSON extended deviation info
let deviationkey=Object.keys(deviationdefinition_all.deviationExtended)[0];
let deviationdefinition_extended=deviationdefinition_all.deviationExtended[deviationkey];
//Grab JSON specific deviation info
let deviationdefinition_specific=deviationdefinition_all.deviation[deviationkey];
//Grab User object
let userkey = Object.keys(deviationdefinition_all.user)[0];
let deviationdefinition_user=deviationdefinition_all.user[userkey];


//Set the media description text
let toptext;

if(imagus_description_style) {//Imagus standard media description desired. Grab relevant info and create the top text.

    //Create media resolution string
    let resolutionstring = deviationdefinition_extended.originalFile == null ? "" : deviationdefinition_extended.originalFile.width + "x" + deviationdefinition_extended.originalFile.height;

    //Create friendly date string
    const parseddatetime = new Date();
    parseddatetime.setTime(Date.parse(deviationdefinition_specific.publishedTime));
    const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec "];
    let month = months[parseddatetime.getMonth()];
    let day = parseddatetime.getDate();
    let year = parseddatetime.getFullYear();
    let datestring = month + " " + day + " " + year

    //Create top 5 tags string
    let tagsstring = "";
    if(deviationdefinition_extended.tags) {
        for(let i=0; i<deviationdefinition_extended.tags.length; i++) {
            if(i > 0) tagsstring += ", ";//commas after the first tag
            tagsstring += deviationdefinition_extended.tags[i].name;

            if(i > 4) {//cut short if more than 5 tags assigned
                tagsstring += " ...";
                break;
            }
        }
    }
    else {
        //Assign friendly text if no tags assigned
        tagsstring = tagsstring == "" ? "No Tags" : tagsstring;
    }
    
    //Get Imagus config for prepend dimensions and an extra vertical bar if it's on
    let prependedbar = cfg.hz.capWH ? " | " : "";

    //Define the top text
    toptext = prependedbar + resolutionstring + " | " + datestring + ' | ' +
        deviationdefinition_specific.title + ' | ' + 
        deviationdefinition_all.user[deviationdefinition_specific.author].username + ' | ' +
        tagsstring;
}
else{
    //get length of plain text description by letting the DOM parse it for us
    let description = deviationdefinition_all.deviationExtended[deviationkey].descriptionText.html.markup;

    //if(debug) console.log("Description: ", description)

    let descriptionlength = 0;
    if(description != null) {//description is defined, use DOM trickery to get text length
        let tempDivElement = document.createElement("div");
        tempDivElement.innerHTML = description; 
        if(tempDivElement.textContent != null) {
            descriptionlength = tempDivElement.textContent.length; 
        }
        else if(tempDivElement.innerText != null) {
            descriptionlength = tempDivElement.innerText.length;
        }
    }

    deviationdefinition_extended.additionalMedia == null ? "" : " |" 

    //Define the top text
    toptext = deviationdefinition_specific.title + 
            " | " + deviationdefinition_all.user[deviationdefinition_specific.author].username + 
            (descriptionlength == 0 ? "" : " | " + descriptionlength) +
            (deviationdefinition_extended.additionalMedia == null ? "" :
                " | " +  (deviationdefinition_extended.additionalMedia.length+1) + " images");
    
} 

//The rest is parsing the correct media URLs
let mediadefinition=deviationdefinition_specific.media;
let baseuri=mediadefinition.baseUri;
let sizedpreviewdefinition=mediadefinition.types.filter(function(t){return !!t.c||!!t.b}).pop();
let mediatokens=mediadefinition.token;


if(debug) console.log("deviationdefinition_all", deviationdefinition_all);
if(debug) console.log("deviationdefinition_specific", deviationdefinition_specific);
if(debug) console.log("deviationdefinition_extended", deviationdefinition_extended);
if(debug) console.log("mediadefinition", mediadefinition);
if(debug) console.log("baseuri", baseuri);
if(debug) console.log("sizedpreviewdefinition", sizedpreviewdefinition);
if(debug) console.log("mediatokens", mediatokens);


/////////////////
// Setup Section

// final goal is to fill in these objects as needed, and return concatenated in desired order
let text_linkobject = [];
let hi_res_media_linkobject = [];
let low_res_media_linkobject = [];

//There are 0 or 1 or 2 tokens in the mediatoken definition for some reason. Which one works is guesswork.
//Multiple post types need these, so set them up now.
let mediatokenstring0=mediatokens?'?token='+mediatokens[0]:'';
let mediatokenstring1=mediatokens&&mediatokens[1]?'?token='+mediatokens[1]:mediatokenstring0;//define the second token if it exists, otherwise default to first token

//Parse and break out media resolution options
let do_hi_res = res_option == "high" || res_option == "both";
let do_low_res = res_option == "low" || res_option == "both";
if(!(do_hi_res || do_low_res)) {//Bad option setting by user
    if(debug) console.log("Resolution setting res_option = \"" + res_option + "\" which is not a valid option. Defaulting to low resolution.");
    do_low_res = true;
}

//Get viewport to optimize against in case of web-optimized media or attachment-style post
const viewportwidth =  Math.max(document.documentElement.clientWidth  || 0, window.innerWidth || 0);
const viewportheight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
if(debug && do_low_res) console.log("Viewport: " + viewportwidth + " by " + viewportheight);


//////////////////////////
// Discrimination Section

// A number of different post types exists with very different JSON trees.
// Have to figure out what kind of post is being handled first.

const POSTTYPES = Object.freeze({
    SingleImageDownloadLink: doSingleImageDownloadLink,
    SingleImageNoDownloadLink: doSingleImageNoDownloadLink,
    ImageCarousel: doImageCarousel,
    GIF: doGIF,
    Video: doVideo,
    ZIP_RAR_7Z_PDF: doZIP_RAR_7Z_PDF,
    Text: doText
});

//Work from easiest discriminators first to get them out of the list of possibilities, then do harder ones
let mainaction;
if(!baseuri) mainaction = POSTTYPES.Text;
else if(deviationdefinition_extended?.additionalMedia?.[0]?.media?.token?.length > 0) mainaction = POSTTYPES.ImageCarousel;
else if(deviationdefinition_specific.isGif) mainaction = POSTTYPES.GIF;
else if(deviationdefinition_specific.isVideo) mainaction = POSTTYPES.Video;
else if(mediatokens == null) mainaction = POSTTYPES.ZIP_RAR_7Z_PDF;
else if(deviationdefinition_specific.isDownloadable) mainaction = POSTTYPES.SingleImageDownloadLink;
else mainaction = POSTTYPES.SingleImageNoDownloadLink

if(debug) console.log("Post type: ", mainaction.name)


/////////////////////////
// Run Post Type Section

mainaction();
if(text_post_always && mainaction != POSTTYPES.Text)
    doText();


////////////////////////////
// Handle Post Type Section

//These functions only execute on grabbing data and constructing the urls
//They each append to specific medialink objects rather than give return values

function doSingleImageDownloadLink() {

    if(do_hi_res) {
        let downloadlink = deviationdefinition_all.deviationExtended[deviationkey].download.url;
        hi_res_media_linkobject.push([[downloadlink,$._.match(/"og:image" content="([^"]+)/)?.[1]], toptext]);
    }
    if(do_low_res) {
        let singleimageurl = getWebOptimizedImageURL(mediadefinition);
        low_res_media_linkobject.push([singleimageurl , toptext])
    }

}

function doSingleImageNoDownloadLink() {
    if(do_hi_res) {
        let imageurl;
        if(mediatokens.length == 1
            && !deviationdefinition_extended.pcp
            && !deviationdefinition_extended.isDaProtected
            && !deviationdefinition_extended.hasWatermark
            && !deviationdefinition_specific.isMature
            && !deviationdefinition_user.type == "regular")//These seem to be the sub-discriminators for if an image blocks an /intermediary/ file.
            imageurl = baseuri.replace("wixmp.com/f/", "wixmp.com/intermediary/f/");
        else if(mediatokens.length == 2 && deviationdefinition_extended.pcp)
            imageurl = baseuri + mediatokenstring0;
        else//Default to fullview/preview image url construction.
            imageurl = constructHiResURLFromMediaDefinition();
        hi_res_media_linkobject.push([imageurl, toptext]);
    }
    if(do_low_res) {
        let singleimageurl = getWebOptimizedImageURL(mediadefinition);
        low_res_media_linkobject.push([singleimageurl , toptext])
    }
    
}

function doImageCarousel() {
    if(do_hi_res) {
        //single token type refers to additional media tokens, but might be signified by how many first-image tokens exist
        let issingletokentype = mediatokens.length == 1;

        //If the current deviation is a multi-token type, download link is correct
        let firstimageurl;
        if(deviationdefinition_specific.isDownloadable) {
            firstimageurl = [deviationdefinition_extended.download.url, $._.match(/"og:image" content="([^"]+)/)?.[1]];
        }
        else {
            //Extra protections on base image image definitions with these flags. Go for fullview/preview fill version
            if(deviationdefinition_extended.isDaProtected || deviationdefinition_extended.hasWatermark) 
                firstimageurl = constructHiResURLFromMediaDefinition();
            else{ //No extra protections, default to /f/ base version
            let type = deviationdefinition_specific.media?.types?.find(i=>i.t==='fullview')?.c||deviationdefinition_specific.media?.types?.find(i=>i.t==='preview')?.c||'';
            type = type.replace('<prettyName>', deviationdefinition_specific.media.prettyName);
                firstimageurl = [deviationdefinition_specific.media.baseUri + mediatokenstring0, deviationdefinition_specific.media.baseUri + type + mediatokenstring0];
                }
        }
        hi_res_media_linkobject.push([firstimageurl, toptext]);
        
        //Do rest of images
        for(let i=0; i<deviationdefinition_extended.additionalMedia.length; i++) {
            let mediaobject = deviationdefinition_extended.additionalMedia[i];
            let type = mediaobject.media?.types?.find(i=>i.t==='fullview')?.c||mediaobject.media?.types?.find(i=>i.t==='preview')?.c||'';
            type = type.replace('<prettyName>', mediaobject.media.prettyName).replace(/([/,]q_)\d\d(?=\D)/,'$1100');
            let currentmediatokenstring = issingletokentype ? "?token=" + mediaobject.media.token[0] : mediatokenstring0;
            // Tries multiple URLs
            hi_res_media_linkobject.push([[mediaobject.media.baseUri + currentmediatokenstring, mediaobject.media.baseUri + type + currentmediatokenstring, mediaobject.media.baseUri + '?token=' + mediaobject.media.token[1], mediaobject.media.baseUri + type + '?token=' + mediaobject.media.token[1]], toptext]);
        }
        if(debug) {
                let logval = structuredClone(hi_res_media_linkobject);//This is because the array gets transformed after it leaves the sieve and logs wrong
                console.log("hi_res_media_linkobject: ", logval);
        }
    }
    if(do_low_res) {
        //First image lives in a different tree
        let firstimageurl = getWebOptimizedImageURL(mediadefinition);
        low_res_media_linkobject.push([firstimageurl , toptext])
        for(let i=0; i<deviationdefinition_extended.additionalMedia.length; i++) {
            let mediaobject = deviationdefinition_extended.additionalMedia[i];
            let currentimageurl = getWebOptimizedImageURL(mediaobject.media);
            low_res_media_linkobject.push([currentimageurl , toptext]);
        }
    }
}

function doGIF() {
    if(debug) console.log("GIF detected.");
    if(do_hi_res) {
        let imageurl = deviationdefinition_specific.isDownloadable ? deviationdefinition_extended.download.url : baseuri + mediatokenstring0;
        hi_res_media_linkobject.push([imageurl, toptext]);
    }
    if(do_low_res) {
        let gifurl = mediadefinition.baseUri+mediatokenstring0;
        low_res_media_linkobject.push([gifurl, toptext]);
    }
}

function doVideo() {
    if(do_hi_res) {
        let largestvideo;
        for(let i=0; i<mediadefinition.types.length; i++) {
            let currentdefinition = mediadefinition.types[i];
            if(currentdefinition.t != 'video') 
                continue;

            //There may be multiple video definitions, keep the largest one
            if(largestvideo) {
                //compare widths to determine larger video, keep larger definition
                largestvideo = (largestvideo.w < currentdefinition.w) ? currentdefinition : largestvideo;
            }
            else { //assign first video definition as largest
                largestvideo = currentdefinition;
            }
        }
        hi_res_media_linkobject.push([largestvideo.b, toptext]);
    }
    if(do_low_res) {
        if(debug) console.log("Video detected.");
        let bestvideosizematch;
        let bestvideosizecloseness = 10000.0;//large number is a bad fit, start this number with arbitrarily bad ratio
        for(let i=0; i<mediadefinition.types.length; i++) {
            let currentdefinition = mediadefinition.types[i];
            if(currentdefinition.t != 'video') 
                continue;

            //There may be multiple video definitions, keep the best size fit
            if(bestvideosizematch == undefined) {
                bestvideosizematch = currentdefinition
            }
            else {
                let currentsizecloseness = Math.abs(1- (currentdefinition.h/viewportheight));
                if(debug) console.log("currentsizecloseness", currentsizecloseness);
                if(currentsizecloseness < bestvideosizecloseness) {
                    bestvideosizecloseness = currentsizecloseness;
                    bestvideosizematch = currentdefinition;
                    if(debug) console.log("New best match at closeness ", bestvideosizecloseness, " type ", bestvideosizematch.t);
                }
            }

        }
        low_res_media_linkobject.push([bestvideosizematch.b, toptext]); 
    }
}

function doZIP_RAR_7Z_PDF() {
    let save_low_res = do_low_res;
    let save_hi_res = do_hi_res;
    do_low_res = true;
    do_hi_res = false;
    doSingleImageNoDownloadLink();
    do_low_res = save_low_res;
    do_hi_res = save_hi_res;
}

function doText() {
    let desiredescription = text_post_render == "description";
    let desirepreview = text_post_mode == "preview";

    let hasdescription = (deviationdefinition_extended?.descriptionText?.excerpt ?? "") != "";
    let hastextbody = (deviationdefinition_specific?.textContent?.excerpt ?? "") != "";

    let previewavailable = true;
    if(!hasdescription && !hastextbody) {//Excerpts both are empty, signal off of html markup
        previewavailable = false;
        hasdescription = (deviationdefinition_extended?.descriptionText?.html?.markup ?? "") != "";
        hastextbody = (deviationdefinition_specific?.textContent?.html.markup ?? "") != "";

        if(!hasdescription && !hastextbody)//No parseable text at all available, don't add text image
            return;
    }

    //Start with user preference for text type, and revert to opposite if desired is unavailable
    let textobject;
    if     (desiredescription && hasdescription)
        textobject = deviationdefinition_extended.descriptionText;
    else if(desiredescription && !hasdescription)
        textobject = deviationdefinition_specific.textContent
    else if(!desiredescription && hastextbody)
        textobject = deviationdefinition_specific.textContent;
    else if(!desiredescription && !hastextbody)
        textobject = deviationdefinition_extended.descriptionText;
    else {
        if(debug) console.log("No valid non-empty text objects found. Text render is aborting.")
        return;
    }

    const charwidthguess = fontsize*1.4/3.0;
    const kerningguess = 2
    let maxcharsperline = (reading_width+kerningguess-(padding*2))/(charwidthguess+kerningguess);
    
    let textlines;
    if(desirepreview && previewavailable) {
        textlines = textobject.excerpt.split("\n");
        textlines = stripHTML(textlines);
        textlines = squareUpText(textlines, maxcharsperline);
        textlines.push("...");
    }
    else {
        if(textobject.html.type == "tiptap") {
            let paragraphsobject = JSON.parse(textobject.html.markup).document.content;

            textlines = [];
            for(let i=0; i<paragraphsobject.length; i++) {
                if(paragraphsobject[i].content == null) continue;//Spacer paragraphs that accomplish nothing
                let paragraph = "";
                for(let j=0; j<paragraphsobject[i].content.length; j++) {
                    if(paragraphsobject[i].content[j].type == "text")
                        paragraph += paragraphsobject[i].content[j].text;
                }
                let paragraphlines = squareUpText([paragraph], maxcharsperline)
                textlines = textlines.concat(...paragraphlines);
                textlines.push("");//separate paragraphs and add some empty space past the last line which is helpful for imagus.
            }
        }
        else {//type == "writer"
            let htmlwriting = textobject.html.markup

            textlines = htmlwriting.split("<br />");
            textlines = stripHTML(textlines);
            textlines = squareUpText(textlines, maxcharsperline);
            textlines.push("...");
        }
        
    }
    let url = generateTextLinesToImage(textlines, reading_width, fontsize, font);
    text_linkobject.push([url, toptext]);
}

//////////////////
// Return Section

// Order the link objects as defined by text_post_first
let returnval;
if(text_post_first) 
    returnval = [...text_linkobject, ...low_res_media_linkobject, ...hi_res_media_linkobject];
else 
    returnval = [ ...low_res_media_linkobject, ...hi_res_media_linkobject, ...text_linkobject];

//Special case, links 1 and 2 are exactly the same, reduce to a single galleryobject
if(returnval.length >= 2 && returnval[0][0] == returnval[1][0])
    returnval = returnval.slice(1);

returnval = returnval.map(i=>[[!Array.isArray(i[0])&&i[0]?.replace(/(\/f\/[^.]+\.\w+).*/,'/intermediary$1'),!Array.isArray(i[0])&&i[0]?.replace(/\/v1\/fill\/[^?]+-pre\.[^?]+/,''),i[0]],i[1]]);

const filename=deviationdefinition_specific?.media?.prettyName?.replace(/_[^_]+$/,'')
if(filename)this.CNT.filename=filename;

if(debug) console.log("Final Return Value", returnval)
return returnval;


///////////////////////////
// Helper Function Section


function generateTextLinesToImage(textlines) {
// //Set a few reading options for the text-to-image render
// const reading_width = 900;
// const fontsize = 30;
// const font = 'Verdana';
// const fontcolor = "grey";
// const linespacing = 5;
// const padding = 10;
// const backgroundcolor = "black";
// const textalign = "left";

    //Prereq: the text lines in text lines have

    const reading_height = (textlines.length*fontsize) + (padding*2) + (linespacing*(textlines.length-1));
  
    // Image size and text coordinates understood, now render the image
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = reading_width;
    canvas.height = reading_height;

    // Get the 2D context
    const ctx = canvas.getContext('2d');
    // Set background color
    ctx.fillStyle = backgroundcolor;
    ctx.fillRect(0, 0, reading_width, reading_height);
    // Set text style
    ctx.fillStyle = fontcolor;
    ctx.font = fontsize + 'px ' + font; // Font size and family
    ctx.textAlign = textalign; // Center the text horizontally
    ctx.textBaseline = 'middle'; // Center the text vertically

    // Draw the text lines
    for(let i=0; i<textlines.length; i++)
    {
        const drawx = padding;
        const drawy = (fontsize/2)+padding + (linespacing*i) + (fontsize*i);
        ctx.fillText(textlines[i], drawx, drawy);
    }

    // Convert the canvas to a base64 PNG image
    const pngUrl = canvas.toDataURL('image/png');
    return pngUrl;
}

function squareUpText(textlines, maxchar) {
    let squaretextlines = [];
    for(let i=0; i<textlines.length; i++) {
        if(textlines[i].length <= maxchar) {
            squaretextlines.push(textlines[i]);
            continue;
        }

        let words = textlines[i].split(" ");
        let currentsquaredtextline = "";
        for(let j=0; j<words.length; j++) {//Add new line just before it gets too long
            if(currentsquaredtextline.length + words[j].length > maxchar) {
                squaretextlines.push(currentsquaredtextline);
                currentsquaredtextline = "";//reset line construction
            }

            let spacer = " ";
            if(currentsquaredtextline == "") spacer = "";
            currentsquaredtextline += spacer + words[j];

            if(j == words.length-1)
                squaretextlines.push(currentsquaredtextline)
        }
    }
    return squaretextlines;
}

function stripHTML(textlines) {
    let strippedlines = [];

    let domparser = new DOMParser()
    for(let i=0; i<textlines.length; i++) {
        let domdoc = domparser.parseFromString(textlines[i], 'text/html');
        strippedlines.push(domdoc.body.textContent || "");
    }

    return strippedlines;
}

function getWebOptimizedImageURL(mediatree) {
    const debugdimensionmath = false;

    // Extract meaningful objects that contain identifiers
    let preview;
    let bestimagesizematch;
    let bestimagesizecloseness = 10000.0;//large number is a bad fit, start this number with arbitrarily bad ratio   
    for(let i=0; i<mediatree.types.length; i++) {
        let currentdefinition = mediatree.types[i];
        if(currentdefinition.t == 'preview') //save preview definition as a default case
            preview = currentdefinition;
        if(currentdefinition.t == 'video' || currentdefinition.t == 'gif')
            continue;

        //Select the largest best size fit definition
        //Imagus evaluates height first so this section does as well
        if(bestimagesizematch == undefined) {
            bestimagesizematch = currentdefinition
        }
        else {
            let currentsizecloseness = Math.abs(1- (currentdefinition.h/viewportheight));
            if(debug && debugdimensionmath) console.log("currentsizecloseness", currentsizecloseness);
            if(currentsizecloseness < bestimagesizecloseness) {
                bestimagesizecloseness = currentsizecloseness;
                bestimagesizematch = currentdefinition;
                if(debug && debugdimensionmath) console.log("New best match at closeness ", bestimagesizecloseness, " type ", bestimagesizematch.t);
            }
        }

    }

    //Choose best available size definition
    let singleimageurl;
    if(bestimagesizematch.b||bestimagesizematch.c) { //Use best size match if it has a complete definition
        singleimageurl = mediatree.baseUri
            + (bestimagesizematch.b||bestimagesizematch.c).replace('<prettyName>', mediatree.prettyName)
            + mediatokenstring0;
    }
    else if(preview.b||preview.c) {//Best size match was not a complete definition, use preview definition as it seems reliably available.
        if(debug) console.log("Best sized definition incomplete. Using preview version...");
        singleimageurl = mediatree.baseUri
            + (preview.b||preview.c).replace('<prettyName>', mediatree.prettyName)
            + mediatokenstring0;
    }
    else {//Preview version also failed, attempt basic URL construction
        if(debug) console.log("No sized preview definition found. Attempting basic url construction...");
        singleimageurl = mediatree.baseUri + mediatokenstring0;
    }

    return singleimageurl;
}

function constructHiResURLFromMediaDefinition() {
    let returnval = "";

    let fullview;
    let preview;
    for(let i=0; i<mediadefinition.types.length; i++) {
        let currentdefinition = mediadefinition.types[i];
        if(currentdefinition.t == 'preview') {
            preview = currentdefinition;
            continue;
        }
        if(currentdefinition.t == 'fullview') {
            fullview = currentdefinition;
            continue;
        }
    }
    let fillconstruction = (fullview.c||fullview.b||(preview.c.replace(/\/w_\d+,h_\d+/i,"/w_"+fullview.w+",h_"+fullview.h))).replace(/([/,]q_)\d\d(?=\D)/,'$1100');
    returnval = baseuri
        + fillconstruction.replace('<prettyName>', deviationdefinition_specific.media['prettyName'])
        + mediatokenstring0;
    return returnval;
}