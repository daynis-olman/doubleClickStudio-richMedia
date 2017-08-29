
// Reference to the creative's various properties and elements.
var creative = {};
var theTimeline = new TimelineMax();

/**
 * Called on the window load event.
 */
function preInit() {
  setupDom();

  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Set up references to DOM elements.
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.expandedExit = document.getElementById('expanded-exit');
  creative.dom.expandedContent = document.getElementById('expanded-state');

  creative.dom.video1 = {};
  creative.dom.video1.vidContainer = document.getElementById('video-container-1');
  creative.dom.video1.vid          = document.getElementById('video-1');

  creative.dom.video1.vidReplayBtn = document.getElementById('replay-btn-1');
  creative.dom.video1.vidUnmuteBtn = document.getElementById('unmute-btn-1');
  creative.dom.video1.vidMuteBtn   = document.getElementById('mute-btn-1');

  creative.dom.expandedClientLogo   = document.getElementById('expanded_clientlogo');
  creative.dom.expandedCta   = document.getElementById('expanded_cta');
  creative.dom.expandedBgr   = document.getElementById('expanded_bgr');
  creative.dom.expandedHeading   = document.getElementById('expanded_heading');
  creative.dom.expandedCopy   = document.getElementById('expanded_copy');

  creative.dom.featureExpanded = document.getElementById('feature-expanded');
  creative.dom.ExpndedBRG = document.getElementById('expanded_bgr_container');
}

/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function init() {
 Enabler.setStartExpanded(false);
  // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  creative.autoplay1 = true;
  creative.isClick1 = false;

  // Hide mute / unmute on iOS.
  if ((navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/iPod/i))) {
    creative.dom.video1.vidUnmuteBtn.style.opacity = 0;
    creative.dom.video1.vidMuteBtn.style.opacity = 0;
  }

  addVideoTracking1();
  addListeners();

  if (creative.autoplay1) {
    if (creative.dom.video1.vid.readyState >= 2) {
      startMuted1(null);
    }
    else {
      creative.dom.video1.hasCanPlay = true;
      creative.dom.video1.vid.addEventListener('canplay', startMuted1, false);
    }
    // HACK: Safari experiences video rendering issues, fixed by forcing a viewport refresh
    creative.dom.video1.vidMuteBtn.style.visibility = 'visible';
      setTimeout(function() {
        creative.dom.video1.vidMuteBtn.style.visibility = 'hidden';
      }, 200);
  }
}

/**
 * Add appropriate listeners after the creative's DOM has been set up.
 */
function addListeners() {
  //Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  //Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  //Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  //Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);
  //creative.dom.expandButton.addEventListener('click', onExpandHandler, false);
  //creative.dom.collapseButton.addEventListener('click', onCollapseClickHandler, false);
  creative.dom.expandedExit.addEventListener('click', exitClickHandler);
  //creative.dom.collapsedExit.addEventListener('click', collapsedExitClickHandler);
  //creative.dom.video1.vidPlayBtn.addEventListener('click', pausePlayHandler1, false);
  //creative.dom.video1.vidPauseBtn.addEventListener('click', pausePlayHandler1, false);
  creative.dom.video1.vidMuteBtn.addEventListener('click', muteUnmuteHandler1, false);
  creative.dom.video1.vidUnmuteBtn.addEventListener('click', muteUnmuteHandler1, false);
  creative.dom.video1.vidReplayBtn.addEventListener('click', replayHandler1, false);
  // creative.dom.video1.vidStopBtn.addEventListener('click', stopHandler1, false);
  //creative.dom.video1.vid.addEventListener('timeupdate', videoTimeUpdateHandler1, false);
  creative.dom.video1.vid.addEventListener('ended', videoEndHandler1, false);
  creative.dom.expandedCta.addEventListener('click', exitClickHandler);
  creative.dom.expandedClientLogo.addEventListener('click', exitClickHandler);
  creative.dom.expandedBgr.addEventListener('click', exitClickHandler);
  creative.dom.video1.vid.addEventListener('click', exitClickHandler);
  creative.dom.ExpndedBRG.addEventListener('click', exitClickHandler);
}


// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler(evt) {
  // Reset video
  creative.dom.video1.vid.pause();
  //creative.dom.video1.vidPauseBtn.style.visibility   = 'hidden';
  //creative.dom.video1.vidPlayBtn.style.visibility    = 'hidden';
  if (creative.dom.video1.vid.readyState > 0) {
    creative.dom.video1.vid.currentTime = 0;
  }

  Enabler.exit('BackgroundExit');
  
}

/**
 * Triggered once the video player is ready to play the video.
 */
function startMuted1(e) {
  // Leaving the listener can cause issues on Chrome / Firefox
  if (creative.dom.video1.hasCanPlay) {
    creative.dom.video1.vid.removeEventListener('canplay', startMuted1);
    creative.dom.video1.hasCanPlay = false;
  }
  // If paused then play
  //creative.dom.video1.vidPauseBtn.style.visibility = 'hidden';
  //creative.dom.video1.vidPlayBtn.style.visibility  = 'hidden';
  creative.dom.video1.vid.volume       = 0; // Muted by default
  creative.dom.video1.vid.currentTime  = 0;
  creative.dom.video1.vid.play();
}


/**
 * Mutes or unmute the video player.
 */
function muteUnmuteHandler1(e) {
  console.log("Mute/Unmute handler initiated");
  if (creative.dom.video1.vid.volume == 0.0) {
    Enabler.counter("Unmute video 1", true);
    creative.dom.video1.vid.volume = 1.0;
    creative.dom.video1.vidMuteBtn.style.visibility   = 'visible';
    creative.dom.video1.vidUnmuteBtn.style.visibility = 'hidden';
  } else {
    Enabler.counter("Mute video 1", true);
    creative.dom.video1.vid.volume = 0.0;
    creative.dom.video1.vidMuteBtn.style.visibility   = 'hidden';
    creative.dom.video1.vidUnmuteBtn.style.visibility = 'visible';
  }
}

/**
 * Stops the video.
 */
function stopHandler1(e) {
  Enabler.counter("Video 1 stopped", true);
  creative.dom.video1.vid.currentTime = 0;
  creative.dom.video1.vid.pause();
  creative.dom.video1.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video1.vidPlayBtn.style.visibility  = 'visible';
  creative.isClick1 = true;
}

/**
 * Relaunches the video from the beginning.
 */
function replayHandler1(e) {

  theTimeline.seek(0);
  theTimeline.stop();

  creative.dom.expandedHeading.style.opacity = 0;
  creative.dom.expandedBgr.style.opacity = 0;
  creative.dom.expandedCopy.style.opacity = 0;

  creative.dom.video1.vidContainer.style.opacity = 1;

  Enabler.counter("Replay video 1", true);
  creative.dom.video1.vid.currentTime = 0;
  creative.dom.video1.vid.play();
  creative.dom.video1.vid.volume = 1.0;
    creative.dom.video1.vidUnmuteBtn.style.visibility = 'hidden';

  creative.dom.video1.vidMuteBtn.style.visibility  = 'visible';

  //start end frame tween animation
  //endFrameAnimation();
  //creative.dom.expandedHeading.style.display = 'block';

}

/**
 * Handler triggered when the video has finished playing.
 */
function videoEndHandler1(e) {
  //creative.dom.video1.vid.currentTime = 0;
  creative.dom.video1.vid.pause();
  //creative.dom.video1.vidPauseBtn.style.visibility = 'hidden';
  //creative.dom.video1.vidPlayBtn.style.visibility  = 'visible';
  creative.isClick1 = true;

  /**
   * Hide video container ONlY and not the controls 
   */

  //creative.dom.video1.vidContainer
  creative.dom.video1.vid.style.display = 'block'; 
  creative.dom.expandedBgr.style.display = 'block';
  creative.dom.expandedHeading.style.visibility = 'visible';
  creative.dom.expandedHeading.style.display = 'block';

  //start end frame tween animation
  endFrameAnimation();
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler1(e) {
  var perc = creative.dom.video1.vid.currentTime / creative.dom.video1.vid.duration;
  creative.dom.video1.vidProgressBar.style.width = Math.round(100*perc) + '%';
}

/**
 * Add video metrics to the HTML5 video elements by loading in video module, and assigning to videos.
 */
function addVideoTracking1() {
  // Add in the video files.
  // These are 3 different codecs due to different browser specifications ; we recommend you have all 3 filetypes.
  var srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/webm');
  srcNode.setAttribute('src', Enabler.getUrl('videoPP0.webm'));
  creative.dom.video1.vid.appendChild(srcNode);

  srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/mp4');
  srcNode.setAttribute('src', Enabler.getUrl('videoPP0.mp4'));
  creative.dom.video1.vid.appendChild(srcNode);

  creative.dom.video1.vid.appendChild(srcNode);

  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('Video Report 1', creative.dom.video1.vid);
  }.bind(this));
}

function endFrameAnimation() {

  console.log("End frame animation start");
  //listeners

  //vars
  theTimeline = new TimelineMax();

  //theTimeline.add( new TweenLite.fromTo('#expanded_bgr' , 0.6, {opacity:0}, {opacity: 1}));

  //this zooms in the background
  theTimeline.add( new TweenLite.to('#expanded_bgr' , 0.3, {opacity:1}));
  theTimeline.add( new TweenLite.to('#expanded_heading' , 0.3, {opacity:1, delay:0.3}));
  theTimeline.add( new TweenLite.to('#expanded_bgr', 6, {scale: 1.08, ease: Linear.easeOut, delay:-0.3}));

  theTimeline.add( new TweenLite.to('#video-container-1' , 0.01, {opacity:0}));
  theTimeline.add( new TweenLite.to('#expanded_bgr' , 0.15, {opacity:0}));
  theTimeline.add( new TweenLite.to('#expanded_heading' , 0.15, {opacity:0, delay:-0.15}));

  theTimeline.add( new TweenLite.to('#expanded_copy' , 1.3, {opacity:1}));

  theTimeline.add( new TweenLite.fromTo('#expanded_bgr' , 0.3, {scale: 1, opacity:0}, {opacity: 1, delay:2.5}));
  theTimeline.add( new TweenLite.to('#expanded_heading' , 0.3, {opacity:1, delay:0.3}));
  theTimeline.add( new TweenLite.to('#expanded_bgr', 6, {scale: 1.08, ease: Linear.easeOut}));
  theTimeline.add( new TweenLite.to('#expanded_copy', 0.01, {opacity:0, delay:-0.01}));
}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);