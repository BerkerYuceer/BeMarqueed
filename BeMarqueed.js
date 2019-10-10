/*
	Marquee Library
	
	This totaly free code allows you to marquee on multiple sized divs,
	which are either next to each other or seperately given but
	ordered in some way. Step by step it will transfer marquee
	text from one to another. I only request you to keep this
	lines. Thank you!
	
	Berker Yüceer 07.10.2019
*/
'use strict';
var BeMarqueed = (function BeMarqueed() {
  let marqi = 0;          	// Marquee Index
  let marqArr = [];       	// Marquee Array
  let marqText = "";      	// Marquee Text
  let marqInterval = [];  	// Marquee Interval Id
  let marqSpeed = 20;     	// Marquee Speed
  let marqStep = 5;     		// Marquee Step
  let marqReplay = true;		// Marquee Replay
  let marqFollow = false;   // Marquee Follows Each
  marqText = "This is a string to be marqueed in the field!";
  var marquee = function marquee(Obj, mindex) {
    if(Obj!= null) {
      let ChildS = window.getComputedStyle(Obj.children[0], null);
      let Left = parseInt(ChildS.getPropertyValue("left"), 10);
      let Width = parseInt(ChildS.getPropertyValue("width"), 10);
      let NewLeft = Left - marqStep;
      let End = NewLeft + Width;
      Obj.children[0].style.left = NewLeft + "px";
      // console.log("Object["+mindex+"]: Left["+Left+"] Width["+Width+"] End["+End+"] NewLeft["+NewLeft+"] marqInterval["+(mindex+1)+"] marqFollow["+marqFollow.toString()+"] marqReplay["+marqReplay.toString()+"]");
      if (NewLeft <= 0) {
      	if (marqFollow) {
          if ((mindex+1) != marqArr.length) {
          	if(marqInterval[(mindex+1)] == undefined) {
              mindex = mindex + 1;
              start(mindex);
              console.log("Next Object at ["+mindex+"] is started to marquee.");
            }
          } else {
            if (marqInterval[0] == undefined && marqReplay) {
              mindex = 0;
              start(mindex);
              console.log("Next Object at ["+mindex+"] is started to marquee.");
            }
          }
        }
      }
      if (End <= 0) {
        // console.log("The end is nigh for the Object["+mindex+"].");
        stop(mindex);
        reset(mindex);
        if(marqReplay && !marqFollow) {
        		start(mindex);
        }
      }
    }
  }
  var start = function start(mindex) {
    if (mindex==undefined) { mindex = marqi; }
    marqInterval[mindex] = window.setInterval(function() {
        marquee(marqArr[mindex], mindex);
    }, marqSpeed);
    // console.log("Interval["+mindex+"] is added for the Object["+mindex+"] with the Speed["+marqSpeed+"] to the marquee.");
  }
  var stop = function stop(mindex) {
    window.clearInterval(marqInterval[mindex]);
    marqInterval[mindex] = undefined;
    // console.log("Interval["+mindex+"] is cleared from the marquee.");
  }
  var reset = function reset(mindex) {
    let ParentS = window.getComputedStyle(marqArr[mindex], null);
    marqArr[mindex].children[0].style.left = ParentS.getPropertyValue("width");
    // console.log("Obj["+mindex+"] is reset in the marquee.");
  }
  var marqElements = function marqElements() {
    for (marqi = 0; marqi < marqArr.length; marqi++) {
      if(!marqArr[marqi].children[0]) {
        let newchild = document.createElement("div");
        newchild.className = "marqTxt";
	newchild.innerHTML = marqText;
        marqArr[marqi].appendChild(newchild);
      }
      reset(marqi);
    }
    marqi = 0;
  }
  var text = function text(str) {
    marqText = str.trim();
    marqElements();
  }
  var speed = function speed(ms) {
    marqSpeed = ms;
  }
  var step = function step(len) {
    marqStep = len;
  }
  var replay = function replay(flag) {
    marqReplay = flag;
  }
  var follow = function follow(flag) {
    marqFollow = flag;
  }
  var init = function init() {
    // Marquee elements from Document
    let marqSelector = document.querySelectorAll(".marquee"); 
    for(let m=0; m<marqSelector.length; m++) {
        marqArr[m] = marqSelector[m];
    }
    marqElements();
  };
  return {
    init : init,
    speed : speed,
    step : step,
    text : text,
    start : start,
    stop : stop,
    reset : reset,
    replay : replay,
    follow : follow
  };
})();

/*//
// Sample usages
BeMarqueed.init();        // To install

// To add the text you want
BeMarqueed.text("This is another string that will override the existing text to be marqueed in the field!");

BeMarqueed.follow(true);  // True if you would like to wait one to reach its destination then start another 
                          // False if you would like to marquee simultaneously

BeMarqueed.replay(true);  // True if you would like to marquee infinitely
                          // False if you would like to marquee once

BeMarqueed.speed(20);     // Define by how many miliseconds speed it will work (Default is 20)
BeMarqueed.step(10);      // Define by how many pixels it will move (Default is 5)
BeMarqueed.start();       // To start the marquee given by index (if no index given it will start from current index)
BeMarqueed.stop(1);       // To stop the marquee given by index (if no index given it will not work, first index 0)
BeMarqueed.reset(2);      // To reset the poisition given by index (if no index given it will not work, first index 0)
                          // if you are using it for only 1 item stop(0) or reset(0) will be enough..
//*/
