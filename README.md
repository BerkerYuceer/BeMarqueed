# BeMarqueed v2.0

Marquee Library

This totaly free code allows you to marquee on multiple sized screens,
which are either next to each other or seperately given but
ordered in some way. Step by step it will transfer marquee
text from one to another object. I only request you to keep these
lines so to remember me. Thank you!

Berker Yüceer (v1.0) 07.10.2019
Berker Yüceer (v2.0) 12.11.2019 (in v2.0 I used var instead of let for compatibility in elderly machines)

Usage sample: 
-

JS:
-
    // Object inital if a div defined will follow that object
    BeMarqueed.init(".bemarqueed");
    // HTML elements or Text to be marqueed
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
    
HTML: 
-
-At least 1 or more divs must be created with class **".marquee"**

    <div class="bemarqueed">
      <div class="marquee"></div> 
      <div class="marquee"></div>
      <div class="marquee"></div>
    </div>

-You can directly add your marquee text **Element** with the text you want without using **BeMarqueed.text("");**

    <div>
      <div class="marquee">
        <div class="marqTxt">Some predefined text!</div>
      </div>
      <div class="marquee"></div>
      <div class="marquee"></div>
    </div>

CSS: 
-
- These spesific definitions must be included to make it work correctly..

      .marqTxt {
        position: relative;     // Important you may change with positioning you need
        width: auto;            // Important do not change
        display: inline-block;  // Important do not change
        white-space: nowrap;    // Important do not change
      }

It is simple and easy to use.

## License

This plugin is licensed under the Mozilla Public License Version 2.0 (LICENSE.txt).

Copyright (c) 2019 [Berker Yüceer](https://stackoverflow.com/users/861019/berker-y%c3%bcceer)

