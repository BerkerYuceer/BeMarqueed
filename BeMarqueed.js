/*
	Marquee Library
	
	This totaly free code allows you to marquee on multiple sized screens,
	which are either next to each other or seperately given but
	ordered in some way. Step by step it will transfer marquee
	text from one to another object. I only request you to keep these
	lines so to remember me. Thank you!
	
	Berker Yüceer (v1.0) 07.10.2019
	Berker Yüceer (v2.0) 12.11.2019
*/
'use strict';
var BeMarqueed = (function BeMarqueed() {
	var marqi = 0;          	// Marquee Index
	var marqArr = [];       	// Marquee Array
	var marqFunc = {};       	// Marquee Functions
	var marqText = "";      	// Marquee Text
	var marqInterval = [];  	// Marquee Interval Id
	var marqSpeed = 20;     	// Marquee Speed
	var marqStep = 5;     		// Marquee Step
	var marqDelay = 0;		// Marquee Delay
	var marqReplay = true;		// Marquee Replay
	var marqFollow = false;   	// Marquee Follows Each
	var marqWaitforAll = false;     // Marquee Wait for All
	var marqParentS = undefined;    // Marquee Parent Object
	var marqChildS = undefined;     // Marquee Child Object
	var marqTimeout = undefined;    // Marquee Timeout
	var marqLeft = 0;		// Marquee First Location
	var marqWidth = 0;		// Marquee Width
	var marqBegin = 0;		// Marquee Begin Point
	var marqEnd = 0;		// Marquee End Point
	var marqLen = 0;		// Marquee Length
	var marqLog = false;		// Marquee Log
	marqText = "This is a string to be marqueed in the field!";
	marqFunc = {
		marquee : function marquee(Obj, mindex) {
			if(Obj!= null) {
				marqChildS = window.getComputedStyle(Obj.children[0], null);
				marqLeft = parseInt(marqChildS.getPropertyValue("left"), 10);
				marqWidth = parseInt(marqChildS.getPropertyValue("width"), 10);
				marqBegin = marqLeft - marqStep;
				marqEnd = marqBegin + marqWidth;
				marqLen = marqArr.length;
				Obj.children[0].style.left = marqBegin + "px";
				if (marqEnd <= 0) {
					marqFunc.marqStopSet(mindex);
					marqFunc.marqResetSet(mindex);
					if (marqReplay) {
						if(marqWaitforAll) {
							if ((mindex+1) >= marqLen) {
								if(marqInterval[0] == undefined) {
									mindex = 0;
									window.setTimeout(function() { marqFunc.marqStartSet(mindex); }, marqDelay);
									if(marqLog) { console.log("Object at ["+mindex+"] is started to marquee."); }
								}
							}
						} else {
							if(marqInterval[0] == undefined && !marqTimeout) {
								marqTimeout = window.setTimeout(function() { marqFunc.marqStartSet(0); }, marqDelay);
								if(marqLog) { console.log("Object at ["+mindex+"] is started to marquee."); }
							}
						}
					}
				}
				if (marqBegin <= 0) {
					if (marqFollow) {
						if ((mindex+1) < marqLen) {
							if(marqInterval[(mindex+1)] == undefined) {
								mindex = mindex + 1;
								marqFunc.marqStartSet(mindex);
								if(marqLog) { console.log("Next Object at ["+mindex+"] is started to marquee."); }
							}
						}
					}
				}
				// Reset Values
				marqChildS = undefined;
				marqLeft = 0;
				marqWidth = 0;
				marqBegin = 0;
				marqEnd = 0;
				marqLen = 0;
			}
		},
		marqStartSet : function marqStartSet(mindex) {
			if (mindex==undefined) { mindex = marqi; }
			marqInterval[mindex] = window.setInterval(function() {
				marqFunc.marquee(marqArr[mindex], mindex);
			}, marqSpeed);
			if(marqLog) { console.log("Interval["+mindex+"] is added for the Object["+mindex+"] with the Speed["+marqSpeed+"] to the marquee."); }
		},
		marqStopSet : function marqStopSet(mindex) {
			window.clearInterval(marqInterval[mindex]);
			marqInterval[mindex] = undefined;
			if(mindex == 0 && marqTimeout) { window.clearInterval(marqTimeout); marqTimeout=undefined; }
			if(marqLog) { console.log("Interval["+mindex+"] is cleared from the marquee and set to undefined."); }
		},
		marqResetSet : function marqResetSet(mindex) {
			marqParentS = window.getComputedStyle(marqArr[mindex], null);
			marqArr[mindex].children[0].style.left = marqParentS.getPropertyValue("width");
			marqParentS = undefined;
			if(marqLog) { console.log("Obj["+mindex+"] is reset into position."); }
		},
		marqElements : function marqElements() {
			for (marqi = 0; marqi < marqArr.length; marqi++) {
				if(!marqArr[marqi].children[0]) {
					var newchild = document.createElement("div");
					newchild.className = "marqTxt";
					marqArr[marqi].appendChild(newchild);
				}
				marqFunc.marqResetSet(marqi);
				marqArr[marqi].children[0].innerHTML = marqText;
			}
			marqi = 0;
		}
	};
	return {
		init : function marqInit(object) {
			// Marquee elements from Document
			var marqSelector = document.querySelectorAll(object);
			for(var m=0; m<marqSelector.length; m++) {
				for(var c=0; c<marqSelector[m].children.length; c++) {
					marqArr[c] = marqSelector[m].children[c];
				}
			}
			marqFunc.marqElements();
		},
		start : marqFunc.marqStartSet,
		stop : marqFunc.marqStopSet,
		reset : marqFunc.marqResetSet,
		speed : function(ms) { marqSpeed = ms; },
		step : function(len) { marqStep = len; },
		delay : function(ms) { marqDelay = ms; },
		text : function(str) { marqText = str.trim(); marqFunc.marqElements(); },
		next : function(val) { marqi = marqi + (val ? val : 1); },
		prev : function(val) { marqi = marqi + (val ? val : -1); },
		replay : function(flag) { marqReplay = flag; },
		follow : function(flag) { marqFollow = flag; },
		waitforall : function(flag) { marqWaitforAll = flag; },
		log : function(flag) { marqLog = flag; }
	};
})();
///*
// Sample usages
// Object inital if a div defined will follow that object
BeMarqueed.init(".bemarqueed");
// HTML elements or text to be marqueed
// default: "This is a string to be marqueed in the field!"
BeMarqueed.text(elems);
// On multiple element when one reaches begin location -
// trigger next one | default: false
BeMarqueed.follow(true);
// On singular or multiple element 
// when one finishes marquee restart | default: false
BeMarqueed.replay(true);
// On multiple element wait for all marquee 
// objects to finish then restart | default: false
BeMarqueed.waitforall(false);
// Delay between each marquee 
// run a test then arrange it to the longest element's 
// width being marqueed in time as ms | default: 0
BeMarqueed.delay(9000);
// Delay between each step based on miliseconds 
// (lower is faster) | default: 20
BeMarqueed.speed(30);
// Step width as pixel on each action 
// (higher is faster) | default: 5
BeMarqueed.step(10);
// True if you want to see the log | default: 0
BeMarqueed.log(false); 
// Starts the marquee process 
// if multiple object being marqueed 
// you can define the index to start marquee
// example: BeMarqueed.start(index);
BeMarqueed.start();
// Stops the marquee process 
// if multiple object being marqueed 
// you can define the index to stop marquee 
// example: BeMarqueed.stop(index);
BeMarqueed.stop();
// Reset the position of marquee 
// if multiple object being marqueed 
// you can define the index to reset marquee 
// example: BeMarqueed.reset(index);
BeMarqueed.reset();
//*/
