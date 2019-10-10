# BeMarqueed

This totaly free code allows you to marquee on multiple sized divs,
which are either next to each other or seperately given but
ordered in some way. Step by step it will transfer marquee
text from one to another. I only request you to keep this
lines. Thank you!

Berker Yüceer 07.10.2019

Usage sample: 
-
JS:
-
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

HTML: 
-
-At least 1 or more divs must be created with class **".marquee"**

    <div>
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

