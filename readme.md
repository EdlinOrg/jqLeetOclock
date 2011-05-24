jqLeetOclock.js
---------------

Whenever I by chance happen to glance over to the phone and notice that it is
"13:37" I instinctively think
"oh, its leet o'clock!" and feel that it should really be celebrated somehow.

So, in celebration of leet o'clock I have coded a jquery plugin that
turn your web page into leet at leet o'clock,
displays it like that for 30 seconds,
and you have to wait another 24 hours for the magic moment.

You can see a small demo at:
http://blog.edlin.org/jqleetoclock-a-celebration-to-1337-oclock

Usage: include the following code on your web page:
    &lt;script ="jqLeetOclock.js"/&gt;
    $(document).ready(function () {
      $('body').leetOclock();
    });

These are the default options:
    {
      //time in the day when it shall trigger
      'hour'	: 13,
      'minute' : 37,
      'second' : 0,
    
      //duration in seconds before reverting
     'duration' : 30
    };

override any of the default settings to modify them
e.g.
    $('body').leetOclock({'duration':60});
would change the duration to 60 seconds.

Note:
to revert the text back to "normal" text,
a reload of the page is performed.
Depending on what any other javascripts on the page are doing,
that might be an issue for you.
