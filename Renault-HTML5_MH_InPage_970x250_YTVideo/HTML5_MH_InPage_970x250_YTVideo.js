// wHBRaxhG2Z4
// oBiODO9oG7Q
"use strict"

var ytp;
//var ytp2;

var firstPlay = true;
var videoReady = false;
var isTermsActive = false;

//I6qYlFcGSd0
//WHN6Uor8Bac


var player =
    {
      'containerId': 'video-player',
      'videoId': 'I6qYlFcGSd0',
      'videoWidth': 970,
      'videoHeight': 350,
      'suggestedQuality': 'high',
      'playerVars':
      {
        'autoplay': 1,
        'rel': 0,
        'showinfo': 0,
        'controls' : 0,
      }
    };

// var player2 =
//     {
//       'containerId': 'video-player2',
//       'videoId': 'I6qYlFcGSd0',
//       'videoWidth': 439,
//       'videoHeight': 234,
//       'suggestedQuality': 'high',
//       'playerVars':
//       {
//         'autoplay': 0, /*With autoplay enabled, the video won't get video views. */
//         'rel': 0,
//         'showinfo': 0,
// 		'fs':0,
//       }
//     };

// var youTubeLinks = {thumb01ID:"I6qYlFcGSd0"};
// var youTubeVideoNames = {thumb01ID:"Video01 - Paddle Shifter"};

var currentVideoName ="Main Video";
var completedVideoName ="None";

var videoWatched ="Videos Watched: ";

var loadPixel = function(url) {
              // Create a new image element.
              var imageElement = document.createElement('img');

              // Add the image to the DOM.
              document.body.appendChild(imageElement);

              // Set the src attribute of the image.
              imageElement.src = url;
              imageElement.style.borderStyle = 'none';
              imageElement.height = 1;
              imageElement.width = 1;
              imageElement.alt = '';
            };

            // The pixel URL to be loaded on exit. Replace with your corrected pixel URL:
            var pixelUrlExit = 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/989533464/?value=1.00&currency_code=AUD&label=bBzoCL2pl2sQmKrs1wM&guid=ON&script=0';

            // The pixel URL to be loaded on impression.
            var pixelUrlImpression = 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/989533464/?value=1.00&currency_code=AUD&label=k3suCLqpl2sQmKrs1wM&guid=ON&script=0';

            // A Boolean flag to ensure the exit pixel loads only once per impression.
            var exitPixelWasLoaded = false;

            // Exit pixel will load only once.
            var exitHandler = function() {
              if (!exitPixelWasLoaded) {
                loadPixel(pixelUrlExit);
                exitPixelWasLoaded = true;
              }
            };

            // Register for the EXIT event from Studio.
            Enabler.addEventListener(studio.events.StudioEvent.EXIT, exitHandler);

            // Load the impression pixel.
            loadPixel(pixelUrlImpression);


//----Setting up----

// If true, start function. If false, listen for INIT.
window.onload = function() {
  if (Enabler.isInitialized()) {
      enablerInitHandler();
  } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
      //console.log('test Me')
  }
}

function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.
    // Or also, you can start the Polite Load
    document.body.style.visibility = "visible";
    initialTweens();
    InitMH();
    videoBttnListeners();
}

function addListeners(){
  //Exits
  document.getElementById("bgImageID").addEventListener('click', bgExitHandler, false);
  document.getElementById("mainExit").addEventListener('click', mainExit, false);

  // YTClose Button
  document.getElementById("ytClose").addEventListener('click', btnYTCloseHandler, false);

}

function youTubeListeners(){
	//document.getElementById("thumb01ID").addEventListener('click', exit_YouTube01, false);
	//document.getElementById("thumb02ID").addEventListener('click', exit_YouTube02, false);
	//document.getElementById("thumb03ID").addEventListener('click', exit_YouTube03, false);
	//document.getElementById("thumb04ID").addEventListener('click', exit_YouTube04, false);
}


function ctaListeners(){
	document.getElementById("ctaContainer01ID").addEventListener('click', exit_DiscoverNow, false);
	//document.getElementById("ctaContainer02ID").addEventListener('click', exit_GetBrochure, false);
}


//This function should be called only after the Enabler.isInitialized
function InitMH(){

  Enabler.loadScript(Enabler.getUrl('https://www.gstatic.com/doubleclick/studio/innovation/h5/ytplayer/ytp_v2.js'), YTFunction);

  //Adding listeners
  addListeners();
}


var video1Playing = false;

//----Exits----
function bgExitHandler(e) {
  //Enabler.exitOverride('Background Exit', 'http://www.this.will.always.navigate.here.com');


  Enabler.exit('Exit_Background');


  if(video1Playing==true)
	{
 		 ytp.pauseVideo();
	}

  //ytp2.pauseVideo();

  // For Tracking Purposes.  CTA and last video watched til completion
  Enabler.counter("Exit_Background : "+completedVideoName);

}


function exit_moreVideos(e) {
	//Enabler.exit('Exit_moreVideos');
}

function exit_DiscoverNow(e) {
  //Enabler.exitOverride('Background Exit', 'http://www.this.will.always.navigate.here.com');
  Enabler.exit('Exit_DiscoverNow');

	if(video1Playing==true)
	{
 		 ytp.pauseVideo();
	}
  //ytp2.pauseVideo();

  // For Tracking Purposes.  CTA and last video watched til completion
  Enabler.counter("Exit_DiscoverNow : "+completedVideoName);
}

function exit_GetBrochure(e) {
  //Enabler.exitOverride('Background Exit', 'http://www.this.will.always.navigate.here.com');
  Enabler.exit('Exit_GetBrochure');

  if(video1Playing==true)
	{
 		 ytp.pauseVideo();
	}
  //ytp2.pauseVideo();

  // For Tracking Purposes.  CTA and last video watched til completion
}

function mainExit(){
	Enabler.exit('Exit_Main');
  	if(video1Playing==true)
	{
 		 ytp.pauseVideo();
	}
  	//ytp2.pauseVideo();

  	// For Tracking Purposes.  CTA and last video watched til completion
  	Enabler.counter("Exit_Main : "+completedVideoName);
}


//----YTClose Button----
function btnYTCloseHandler(e) {
  Enabler.stopTimer('YTVideo Timer');
}

//----YouTube Player----
function YTFunction(){
  // YouTube player properties configuration.

 // Construct the YouTube player variable.
 ytp = new studioinnovation.YTPlayer(player);
 // ytp2 = new studioinnovation.YTPlayer(player2);
 // Bind event listeners.
 bindListeners();

}

function YTPlaying(){
  if(firstPlay==true){
    Enabler.counter('YTVideo Play');
    playTimeLine();
    playProgressBar();
    MuteThisVideo();
    firstPlay=false;
    emptyMaskedImage();

	//remove preloader image

	document.getElementById("preloader_img").style.opacity = 0;
	document.getElementById("preloader_img").style.transform = "scale(0.001, 0.001)";

  }
  else{
    Enabler.counter('YTVideo Replay');
    //firstPlay = false;
    if(ytp.isMuted){
      UnMuteThisVideo();
     // emptyMaskedImage();
      progressTimeline.resume();
    }
  }


}

// YT Player State
function handleVideoStateChange(stateChangeEvent){
  var playerState = stateChangeEvent.getPlayerState();

  switch(playerState){


    case studioinnovation.YTPlayer.Events.PLAYING:
      YTPlaying();
      onPlayingVideo();
      progressTimeline.resume();
	  video1Playing = true;
    break;

    case studioinnovation.YTPlayer.Events.PAUSED:
      Enabler.counter('YTVideo Pause');
      Enabler.stopTimer('YTVideo Timer');
      onPausedVideo();
      progressTimeline.pause();
	  video1Playing = false;
    break;

    case  studioinnovation.YTPlayer.Events.TIMER_START:
      Enabler.startTimer('YTVideo Timer');
    break;

    case  studioinnovation.YTPlayer.Events.TIMER_STOP:
      Enabler.stopTimer('YTVideo Timer');
    break;

    case studioinnovation.YTPlayer.Events.ENDED:
      Enabler.stopTimer('YTVideo Timer');
      firstPlay = false;
      onFinishVideo();
	  video1Playing = false;
    break;





  }
}

// function handleVideoStateChange2(stateChangeEvent){
//   var playerState = stateChangeEvent.getPlayerState();
//
//   switch(playerState){
//
//     case studioinnovation.YTPlayer.Events.PLAYING:
//
//     break;
//
//     case studioinnovation.YTPlayer.Events.PAUSED:
//       Enabler.counter('YTVideo2 Pause');
//       Enabler.stopTimer('YTVideo2 Timer');
//     break;
//
//     case  studioinnovation.YTPlayer.Events.TIMER_START:
//       Enabler.startTimer('YTVideo2 Timer');
//     break;
//
//     case  studioinnovation.YTPlayer.Events.TIMER_STOP:
//       Enabler.stopTimer('YTVideo2 Timer');
//     break;
//
//     case studioinnovation.YTPlayer.Events.ENDED:
//       Enabler.stopTimer('YTVideo2 Timer');
//       onFinishVideo();
//     break;
//
//
//
//   }
// }

//Youtube Video listeners
function bindListeners(){
   ytp.addEventListener('ready', function() {
		MuteThisVideo();
  	}, false);


  ytp.addEventListener('statechange', handleVideoStateChange, false);

  // YouTube playback quartiles.
  ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_0_PERCENT, function() {
    Enabler.counter('YTVideo Percent 0');
  }, false);
  ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_25_PERCENT, function() {
    Enabler.counter('YTVideo Percent 25');
  }, false);
  ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_50_PERCENT, function() {
    Enabler.counter('YTVideo Percent 50');
  }, false);
  ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_75_PERCENT, function() {
    Enabler.counter('YTVideo Percent 75');
  }, false);
  ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_100_PERCENT, function() {
    Enabler.counter('YTVideo Percent 100');
  }, false);


  //ytp2.addEventListener('statechange', handleVideoStateChange2, false);

  // YouTube playback quartiles.
  // ytp2.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_0_PERCENT, function() {
  //   Enabler.counter('YTVideo2 Percent 0');
  // }, false);
  // ytp2.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_25_PERCENT, function() {
  //   Enabler.counter('YTVideo2 Percent 25');
  // }, false);
  // ytp2.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_50_PERCENT, function() {
  //   Enabler.counter('YTVideo2 Percent 50');
  // }, false);
  // ytp2.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_75_PERCENT, function() {
  //   Enabler.counter('YTVideo2 Percent 75');
  // }, false);
  // ytp2.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_100_PERCENT, function() {
  //   Enabler.counter('YTVideo2 Percent 100');
  // }, false);

}



// create greensock timeline global variable
var theTimeline = new TimelineLite();
var buttonsYoffScreen = -50;
var buttonsYonScreen = -50;


// When Video is playing
function onPlayingVideo(){
	TweenLite.set('#loadingClip', {alpha: 0, y: "+=300"});
	TweenLite.set('#rePlayBttnV2', {alpha: 0, y: -40});
	TweenLite.set('#playBttn', {alpha: 0, y: -40});
	TweenLite.set('#pauseBttn', {alpha: 1,y: 0});

	document.getElementById("playBttn").removeEventListener('click', ytpPlayVideo, false);
	document.getElementById("pauseBttn").addEventListener('click', ytpPauseVideo, false);
	document.getElementById("rePlayBttnV2Div").removeEventListener('click', ytpRePlayeVideo, false);
	document.getElementById("rePlayBttnV2Div").removeEventListener('mouseover', rotateReplayBttn, false);

	theTimeline.resume();

}



function rotateReplayBttn(e){
	TweenLite.set('#rePlayBttnV2', {rotation:0, transformOrigin:"50% 50%"});
	TweenLite.to('#rePlayBttnV2', 0.5, {rotation:360, transformOrigin:"50% 50%"});
	//alert('test');
}

// When video is paused
function onPausedVideo(){

	//TweenLite.set('#rePlayBttnV2', {alpha: 0, y: -40});
	TweenLite.set('#playBttn', {alpha: 1, y: 0});
	TweenLite.set('#pauseBttn', {alpha: 0});

	document.getElementById("playBttn").addEventListener('click', ytpPlayVideo, false);
	document.getElementById("pauseBttn").removeEventListener('click', ytpPauseVideo, false);
	document.getElementById("rePlayBttnV2Div").removeEventListener('click', ytpRePlayeVideo, false);
	document.getElementById("rePlayBttnV2Div").removeEventListener('mouseover', rotateReplayBttn, false);

	theTimeline.pause();

}

// When video is finished playing
function onFinishVideo(){
	TweenLite.set('#rePlayBttnV2', {alpha: 1, y: -3});

	TweenLite.set('#rePlayBttnV2', {rotation:0, transformOrigin:"50% 50%"});
	TweenLite.to('#rePlayBttnV2', 0.5, {rotation:360, transformOrigin:"50% 50%"});
	TweenLite.to('#muteBttn', 0.5, {alpha: 0},'-=0.5');

	TweenLite.set('#playBttn', {alpha: 0, y: -40});
	TweenLite.set('#pauseBttn', {alpha: 0, y: -40});



	document.getElementById("playBttn").removeEventListener('click', ytpPlayVideo, false);
	document.getElementById("pauseBttn").removeEventListener('click', ytpPauseVideo, false);
	document.getElementById("rePlayBttnV2Div").addEventListener('click', ytpRePlayeVideo, false);
	document.getElementById("rePlayBttnV2Div").addEventListener('mouseover', rotateReplayBttn, false);
	document.getElementById('disclaimerID').addEventListener('click', displayTerms, false);
	document.getElementById('termsCloseBtnID').addEventListener('click', hideTerms, false);

	//document.getElementById("tagLineID").removeEventListener('click', mainExit, false);
	//document.getElementById("tagLineID").addEventListener('click', function(){playVideo('thumb01ID')}, false);

	// hideVideo2();
	//console.log('hidden video 2');

	Enabler.counter(currentVideoName+' Completed');


	videoWatched +=" - "+currentVideoName;
	//console.log(videoWatched);

	completedVideoName=currentVideoName;
}



var t1 = new TimelineLite();

// Animate CTA.
// Inserts into main timeline
function animateCTA(){

	var ctaTimeline = new TimelineLite();
	var arrowMove = 144;

	ctaTimeline.set(ctaBox01ID,{alpha:0, scaleX:0.1,transformOrigin:"left top"})
	.set(ctaArrow01ID,{alpha:0})
	.set(ctaText01ID,{alpha:0})
	.set(ctaArrow01ID,{alpha:0,x:"-="+arrowMove})

	/*.set(ctaBox02ID,{alpha:0, scaleX:0.1,transformOrigin:"left top"})
	.set(ctaArrow02ID,{alpha:0})
	.set(ctaText02ID,{alpha:0})
	.set(ctaArrow02ID,{alpha:0,x:"-="+arrowMove})*/

	.to(ctaBox01ID,0.2,{alpha:1})
	.to(ctaArrow01ID,0.2,{alpha:1},'-=0.2')
	.to(ctaBox01ID,0.4,{scaleX:1,transformOrigin:"left top"},'+=0.2')
	.to(ctaArrow01ID,0.4,{x:"+="+arrowMove},'-=0.4')
	.to(ctaText01ID,0.4,{alpha:1})

	.append(TweenLite.delayedCall(0, function(){ document.getElementById("ctaContainer01ID").addEventListener('click', exit_DiscoverNow, false); }),'-=0.5');

	/*.to(ctaBox02ID,0.2,{alpha:1})
	.to(ctaArrow02ID,0.2,{alpha:1},'-=0.2')
	.to(ctaBox02ID,0.4,{scaleX:1,transformOrigin:"left top"},'+=0.2')
	.to(ctaArrow02ID,0.4,{x:"+="+arrowMove},'-=0.4')
	.to(ctaText02ID,0.4,{alpha:1})*/

	//.append(TweenLite.delayedCall(0, function(){ document.getElementById("ctaContainer02ID").addEventListener('click', exit_GetBrochure, false); }),'-=0.5');


	document.getElementById("gen_ctaBox").addEventListener('click', exit_DiscoverNow, false);
	document.getElementById("gen_ctaBox02").addEventListener('click', exit_GetBrochure, false);
}

// Non video animations using greensock TimelineLite
function playTimeLine(){
	//TweenLite.delayedCall(10, placedMakedImage);
	youTubeListeners();
	document.getElementById("muteBttn").addEventListener('click', ytpMuteVideo, false);

	animateCTA();

	document.getElementById('customContent').style.visibility = "visible";


	playTimeLine02();

}

function playTimeLine02(){
	theTimeline.to(logo_dc,20.5,{x:'+=0'})

	//.set(thumbPreviewHolder,{y:'-=250'})

	.append(TweenLite.delayedCall(0, function(){ youTubeListeners() }),'-=0.5')
	//.from('#thumb01ID', 0.6, {alpha: 0, scale:0.9})
	//.from('#thumb02ID', 0.6, {alpha: 0, scale:0.9},'-=0.3')
	//.from('#thumb03ID', 0.6, {alpha: 0, scale:0.9},'-=0.3')
	//.from('#thumb04ID', 0.6, {alpha: 0, scale:0.9},'-=0.3')
	.set('#mainExit', {alpha: 0})
	.from('#thumbPreviewHolder', 1, {alpha: 0})
	.to('#ctaContainer01ID', 1 , {alpha:0})
	.to('#progressBarBG', 0.5, {alpha: 0}, '-=1')
	.to('#progressBar', 0.5, {alpha: 0}, '-=0.5')
	.to('#pauseBttn', 1 , {alpha: 0}, '-=1')
	.to('#playBttn', 1 , {alpha: 0}, '-=1')
	.to('#muteBttn', 1 , {alpha: 0}, '-=1')
	.from('#bgImageID', 1, {alpha: 0},'-=1')
	.to('.disclaimerText',1,{alpha: 1})
	.from('#carTextBox01ID', 0.3, {alpha: 0, y:'-=21'})
	.from('#carTextBox02ID', 0.3, {alpha: 0, y:'-=22'})
	.from('#carTextBox03ID', 0.3, {alpha: 0, y:'-=23'})
	.from('#priceTextBox01ID', 0.3, {alpha: 0, x:'-=20'})
	.to('#gen_ctaBox', 0.3, {alpha: 1})
	.to('#gen_ctaBox02', 0.3, {alpha: 1})
	.to('#rePlayBttnV2Div', 0.3, {alpha: 1}, '-=1')

	//.from('#priceTextBox02ID', 0.5, {alpha: 0, x:'-=20'})

	.from('#tagLineID', 0.5, {alpha: 0, x:'-=20'});

}

// Call to actions listeners and Events




//  Once video starts playing activate progress bar.
var progressTimeline = new TimelineLite();
function playProgressBar(){
	//console.log('progress');
	progressTimeline.set('#progressBar', {alpha:1, transformOrigin:"0% 0%"})
	.set('#progressBarBG', {alpha:1})
	.set('#muteBttn', {alpha:1})
	.from('#progressBar',22,{scaleX:0,ease: Power0.easeNone});


}


// Play Video
function ytpPlayVideo(e){
	ytp.playVideo();
	//TweenLite.set('#playBttn', {alpha:0.5});
	//theTimeline.play(0);
}

// Pause Video
function ytpPauseVideo(e){
	ytp.pauseVideo();
	progressTimeline();

	//theTimeline.pause();
}

// Re-play video
function ytpRePlayeVideo(e){
	hideTerms();
	document.getElementById('disclaimerID').removeEventListener('click', displayTerms, false);
	document.getElementById('termsCloseBtnID').removeEventListener('click', hideTerms, false);
	TweenLite.set('#rePlayBttnV2', {alpha: 0});
	ytp.playVideo();
	theTimeline.play(0);
	progressTimeline.play(0);
	//progressTimeline.play(0);
	emptyMaskedImage();
	//hideVideo2();
	currentVideoName ="Main Video";
	progressTimeline.from('#progressBar',23,{scaleX:0,ease: Power0.easeNone});
	console.log('playVideo Replay');
}

// Mute video and switch button
function MuteThisVideo(){
		ytp.mute();
		TweenLite.set('#muteOn', {alpha: 1, y: 0});
		TweenLite.set('#muteOff', {alpha: 0, y: -40});
		Enabler.counter('YTVideo Mute');
}

// Unmute video and switch button
function UnMuteThisVideo(){
		ytp.unMute();
		TweenLite.set('#muteOff', {alpha: 1, y: 0});
		TweenLite.set('#muteOn', {alpha: 0, y: -40});
		Enabler.counter('YTVideo UnMute');
}


// Places animated SVG in div.
// Please note:  When this creative was created (), Double click had problems previewing inline svgs with clip-paths, masks and gradients.
//					To counter this I placed a animated mask of an image in an external animated svg.
//					In future this would probably just be a part of the inline svg and be animated as part of the Greensock timeline.
//					In meantime... we improvise.
function placedMaskedImage(){
	document.getElementById("finalFrame").innerHTML="<object data='finalFrame.svg' type='image/svg+xml' width='970' height='250'></object>";
}

// Empty div with animated SVG
function emptyMaskedImage(){
	document.getElementById("finalFrame").innerHTML="";
}

// Detect if video is muted.
function ytpMuteVideo(e){

	var IsThisMuted = ytp.isMuted();

	if(IsThisMuted==false){

		MuteThisVideo();
	}
	else{
		UnMuteThisVideo();
	}
}




function initialTweens(){

	//TweenLite.set('#rePlayBttnV2', {alpha: 0, y: -40});
	TweenLite.set('#playBttn', {alpha: 0, y: -40});
	TweenLite.set('#pauseBttn', {alpha: 1,y: 0});
	TweenLite.set('#muteOff', {alpha: 0});
	// TweenLite.set('#video-player2', {alpha: 0, y: 250});
	//TweenLite.set('#closeVideo02Btn', {alpha: 0, y: 250});

	//TweenLite.set('#thumbPreviewHolder', {alpha: 0, x:-250;});
}


// Array that holds the YouTubeLinks


// Listen which video button has been pressed
function videoBttnListeners(){
    	//document.getElementById('thumb01ID').addEventListener('click', function(){playVideo('thumb01ID')}, false);
   		//document.getElementById('thumb02ID').addEventListener('click', function(){playVideo('thumb02ID')}, false);
    	//document.getElementById('thumb03ID').addEventListener('click', function(){playVideo('thumb03ID')}, false);
    	//document.getElementById('thumb04ID').addEventListener('click', function(){playVideo('thumb04ID')}, false);
}

// Show and play video
function playVideo(btnID){
		var videoNumber = btnID.charAt(6);
    	//ytp2.loadVideoById(youTubeLinks[btnID]);
    	Enabler.reportCustomVariableCount1('YTVideo Video Played - Video '+videoNumber+' - youTubeLink -  '+youTubeLinks[btnID]);
    	showVideo2();

		//reset copy
		// document.getElementById('carTextBox01ID').style.left = '456px';
		// document.getElementById('carTextBox02ID').style.left = '456px';
		// document.getElementById('priceTextBox01ID').style.left = '456px';
		// document.getElementById('carTextBox01ID').style.top = '100px';
		// document.getElementById('carTextBox02ID').style.top = '130px';
		// document.getElementById('priceTextBox01ID').style.top = '190px';
		// document.getElementById('carTextBox01ID').style.fontSize = '24px';
		// document.getElementById('carTextBox02ID').style.fontSize = '24px';
		// document.getElementById('priceTextBox01ID').style.fontSize = '24px';

    	currentVideoName=youTubeVideoNames[btnID];
}

// Show Video
function showVideo2(){
	// TweenLite.set('#video-player2', {alpha: 1,y: 0});
	document.getElementById('closeVideo02Btn').addEventListener('click', hideVideo2, false);
	TweenLite.set('#closeVideo02Btn', {alpha: 1, y: 0});


}

// Display Terms and Conditions
function displayTerms(e){
	TweenLite.to(termsContentID,0.5,{y:-140});
}

// Hide Terms and Conditions
function hideTerms(e){
	TweenLite.to(termsContentID,0.5,{y:0});
}

//hack to change CTA font color

function changeToWht(){
	document.getElementById('ctaText01ID').style.color = "#FFFFFF";
	document.getElementById('ctaArrow01ID').style.backgroundImage = "url(arrowOver.png)";
}
function changeToBlk(){
	document.getElementById('ctaText01ID').style.color = "#000000";
	document.getElementById('ctaArrow01ID').style.backgroundImage = "url(arrow.png)";
}

document.getElementById('ctaBox01ID').addEventListener('mouseover', changeToWht, false);
document.getElementById('ctaText01ID').addEventListener('mouseover', changeToWht, false);
document.getElementById('ctaArrow01ID').addEventListener('mouseover', changeToWht, false);
document.getElementById('ctaBox01ID').addEventListener('mouseout', changeToBlk, false);
document.getElementById('ctaText01ID').addEventListener('mouseout', changeToBlk, false);
document.getElementById('ctaArrow01ID').addEventListener('mouseout', changeToBlk, false);

// // Hide video
// function hideVideo2(){
// 	// TweenLite.set('#video-player2', {alpha: 0,y: 250});
// 	//document.getElementById('closeVideo02Btn').removeEventListener('click', hideVideo2, false);
// 	//TweenLite.set('#closeVideo02Btn', {alpha: 0, y: 250});
// 	//ytp2.pauseVideo();
//
// 	//reset copy
// 	// document.getElementById('carTextBox01ID').style.left = '325px';
// 	// document.getElementById('carTextBox02ID').style.left = '325px';
// 	//document.getElementById('priceTextBox01ID').style.left = '325px';
// 	// document.getElementById('carTextBox01ID').style.top = '40px';
// 	// document.getElementById('carTextBox02ID').style.top = '70px';
// 	//document.getElementById('priceTextBox01ID').style.top = '130px';
// 	// document.getElementById('carTextBox01ID').style.fontSize = '32px';
// 	// document.getElementById('carTextBox02ID').style.fontSize = '32px';
// 	//document.getElementById('priceTextBox01ID').style.fontSize = '32px';
//
// }

function exitReport(){


}




