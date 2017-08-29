
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

  addListeners();
  endFrameAnimation()

}

/**
 * Add appropriate listeners after the creative's DOM has been set up.
 */
function addListeners() {
  creative.dom.expandedExit.addEventListener('click', exitClickHandler);
  creative.dom.expandedCta.addEventListener('click', exitClickHandler);
  creative.dom.expandedClientLogo.addEventListener('click', exitClickHandler);
  creative.dom.expandedBgr.addEventListener('click', exitClickHandler);
  creative.dom.ExpndedBRG.addEventListener('click', exitClickHandler);

}


// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler() {
  // Reset video

  Enabler.exit('BackgroundExit');
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

  theTimeline.add( new TweenLite.to('#expanded_bgr' , 0.15, {opacity:0}));
  theTimeline.add( new TweenLite.to('#expanded_heading' , 0.15, {opacity:0, delay:-0.15}));
  theTimeline.add( new TweenLite.to('#expanded_copy' , 1.3, {opacity:1}));
  theTimeline.add( new TweenLite.fromTo('#expanded_bgr' , 0.3, {scale: 1, opacity:0}, {opacity: 1, delay:2.5}));
  theTimeline.add( new TweenLite.to('#expanded_heading' , 0.3, {opacity:1, delay:0.3}));
  theTimeline.add( new TweenLite.to('#expanded_bgr', 6, {scale: 1.08, ease: Linear.easeOut}));
  theTimeline.add( new TweenLite.to('#expanded_copy', 0.01, {opacity:0, delay:-0.01}));


  console.log("End frame animation end");


}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);