/*
 * Copyright (c) 2011 Carl Asman http://www.edlin.org/
 * Version: 0.10 2011-05-23
 * 
 * quite pointless, really:
 * Every day at leet o'clock (13:37) it will turn the web page it
 * is included on into leet for 30 seconds.
 * To avoid potential conflicts with other javascripts, it makes a
 * window.reload to revert the leet text, see documentation at github
 *
 * You can reach me at www.edlin.org
 * if you want to contact me regarding potential projects.
 * 
 * The leet translator function I slightly modified and use
 * is (c) 2004-2006 by Lee W. Fastenau see the function leetIt for details 
 * and terms for that function. The original code from him can be found at
 * http://ioyu.com/io/javascript/l33t.asp
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function( $ ){

	/**
	 * Recursively call leetIt on all text elements
	 */
	var recursiveReplace = function (node) {
		if (node.nodeType == 3) { // text node     
			node.nodeValue = leetIt(node.nodeValue);
		} else if (node.nodeType == 1) { // element
			$(node).contents().each(function () {
				recursiveReplace(this);
			});
		}
	}

	/**
	 * To avoid conflicts with other javascripts,
	 * a reload of the page is performed
	 */
	var revertAction = function (){
		window.location.reload(true);
	}

	/**
	 * Convert all text to leet on the page, also set a timer
	 * that will revert the text
	 */
	var doAction = function (){	
		theTimerRevert = setTimeout(function () { revertAction(); }, settings['duration']*1000);
		recursiveReplace(document.body);

		//elements that arent text elements
		$(":submit").val( leetIt( $(":submit").val() ) );
		$(":button").val( leetIt( $(":button").val() ) );
		$(":reset").val( leetIt( $(":reset").val() ) );
		$(":text").val( leetIt( $(":text").val() ) );
		document.title = leetIt(document.title);
	}

	/**
	 * Calculate ms until leet o'clock is
	 * @param h,m,s current time in hours, minutes, seconds
	 * @param pingHour,pingMin,pingSec when it should trigger
	 * return ms until leet o'clock
	 */
	var calcTimeUntilTimeout= function (h,m,s,pingHour,pingMin,pingSec){
		
		s = pingSec - s;

		if(s < 0){
		  s=60+s;
		  m=m+1;
		}
		if(m > 60){
		  m=m-60;
		  h=h+1;
		}

		m = pingMin -m
		if(m < 0){
		  m=60+m;
		  h=h+1;
		}
		h = pingHour -h;
		if(h < 0){
		  h=24+h;
		}

		return (h*60*60*1000) + (m*60*1000) + (s *1000);
	}

	/**
	 * Initiate timer that triggers at leet o'clock
	 */
	var initTime = function(){
		var pingHour=settings['hour'];
		var pingMin=settings['minute'];
		var pingSec=settings['second'];

		var today=new Date();
		var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		var msto = calcTimeUntilTimeout(h,m,s,pingHour,pingMin,pingSec);
		theTimer = setTimeout(function(){ doAction(); },msto) ;

		//save time so it is possible from outside to ask how much
		//time there is left before trigger
		timeToTrigger = today.getTime() + msto;
	}

	/**
	 * Convert a string to leet
	 * 
	 * I have made some small changes,
	 * you can find the original code over at 
	 * http://ioyu.com/io/javascript/l33t.asp
	 * 
	 * @param string tempstr string to be converted
	 * @return converted string
	 */
	var leetIt = function (inBuf) {
		
		if("" == inBuf || typeof inBuf == 'undefined'){
			return inBuf;
		}
		
		var extreme=false;
		var grammatical=false;
		/*
		English-to-l33t Translator (c) 2004-2006 by Lee W. Fastenau
		Feel free to use and/or modify this code as long as you don't make money from it.
		This attribution must stay.  Stay, it must.  Yes.
		*/
		inBuf = inBuf.replace (/\b(hacker|coder|programmer)(s|z)?\b/gi,'haxor$2');
		inBuf = inBuf.replace (/\b(hack)(ed|s|z)?\b/gi,'haxor$2');
		inBuf = inBuf.replace (/\b(thank you)\b/gi,'TY');
		inBuf = inBuf.replace (/\b(luv|love|wuv|like)(s|z)?\b/gi,'wub$2');
		inBuf = inBuf.replace (/\b(software)(s|z)?\b/gi,'wares');
		inBuf = inBuf.replace (/\b((is|are|am) +(cool|wicked|awesome|great))\b/gi,'rocks');
		inBuf = inBuf.replace (/\b((is|are|am) +(\w+) +(cool|wicked|awesome|great))\b/gi,'$3 rocks');
		inBuf = inBuf.replace (/\b(very|extremely)\b/gi,'totally');
		inBuf = inBuf.replace (/\b(because)\b/gi,'coz');
		inBuf = inBuf.replace (/\b(due to)\b/gi,'coz of');
		inBuf = inBuf.replace (/\b(is|am)\b/gi,'be');
		inBuf = inBuf.replace (/\b(are)\b/gi,'is');
		inBuf = inBuf.replace (/\b(rock)(s|z)?\b/gi,'roxor$2');
		inBuf = inBuf.replace (/\b(porn(o(graph(y|ic))?)?)\b/gi,'pron');
		inBuf = inBuf.replace (/\b(lamer|dork|jerk|moron|idiot)\b/gi,'loser');
		inBuf = inBuf.replace (/\b(an loser)\b/gi,'a loser');
		inBuf = inBuf.replace (/\b(what('s)?)\b/gi,'wot');
		inBuf = inBuf.replace (/\b(that)\b/gi,'dat');
		inBuf = inBuf.replace (/\b(this)\b/gi,'dis');
		inBuf = inBuf.replace (/\b(hooray|yippee|yay|yeah)\b/gi,'woot');
		inBuf = inBuf.replace (/\b(win|own)(s|z)?\b/gi,'pwn$2');
		inBuf = inBuf.replace (/\b(won|owned)\b/gi,'pwnt');
		inBuf = inBuf.replace (/\b(suck)(ed|s|z)?\b/gi,'suxor$2');
		inBuf = inBuf.replace (/\b(was|were|had been)/gi,'wuz');
		inBuf = inBuf.replace (/\b(elite)/gi,'leet');
		inBuf = inBuf.replace (/\byou\b/gi,'joo');
		inBuf = inBuf.replace (/\b(man|dude|guy|boy)(s|z)?\b/gi,'dood$2');
		inBuf = inBuf.replace (/\b(men)\b/gi,'doods');
		inBuf = inBuf.replace (/\bstarbucks?\b/gi,'bizzo');
		inBuf = inBuf.replace (/\b(the)\b/gi,'teh');
		inBuf = inBuf.replace (/(ing)\b/gi,'in\'');
		inBuf = inBuf.replace (/\b(stoked|happy|excited|thrilled|stimulated)\b/gi,'geeked');
		inBuf = inBuf.replace (/\b(unhappy|depressed|miserable|sorry)\b/gi,'bummed out');
		inBuf = inBuf.replace (/\b(and|an)\b/gi,'n');
		inBuf = inBuf.replace (/\b(your|hey|hello|hi)\b/gi,'yo');
		inBuf = inBuf.replace (/\b(might)\b/gi,'gonna');
		if (!grammatical) {
			inBuf = inBuf.replace (/\blater\b/gi,'l8r');
			inBuf = inBuf.replace (/\bare\b/gi,'R');
			inBuf = inBuf.replace (/\bbe\b/gi,'b');
			inBuf = inBuf.replace (/\bto\b/gi,'2');
			inBuf = inBuf.replace (/\ba\b/gi,'@');
			inBuf = inBuf.replace (/(\S)l/g,'$1L');
			inBuf = inBuf.replace (/(\S)l/g,'$1L'); // Twice to catch "LL"
			inBuf = inBuf.replace (/a/gi,'4');
			inBuf = inBuf.replace (/\bfor\b/gi,'4');
			inBuf = inBuf.replace (/e/gi,'3');
			
			//added to the code from Fastenau 
			inBuf = inBuf.replace (/l/g,'1');
			inBuf = inBuf.replace (/t/g,'7');
			
			inBuf = inBuf.replace (/i/gi,'1');
			inBuf = inBuf.replace (/o/gi,'0');
			inBuf = inBuf.replace (/s\b/gi,'z');
			// inBuf = inBuf.replace (/s/gi,'5');
			if (extreme) {
				// If you thought "normal" l33t was bad...
				inBuf = inBuf.replace (/f/gi,'|=');
				inBuf = inBuf.replace (/g/gi,'6');
				inBuf = inBuf.replace (/h/gi,'#');
				inBuf = inBuf.replace (/k/gi,'|<');
				inBuf = inBuf.replace (/l/gi,'|_');
				inBuf = inBuf.replace (/m/gi,'|\\/|');
				inBuf = inBuf.replace (/n/gi,'|\\|');
				inBuf = inBuf.replace (/t/gi,'7');
				inBuf = inBuf.replace (/u/gi,'|_|');
				inBuf = inBuf.replace (/v/gi,'\\/');
				inBuf = inBuf.replace (/w/gi,'\\/\\/');
				inBuf = inBuf.replace (/\b3x/gi,'X');
				inBuf = inBuf.replace (/y/gi,'\'/');
				inBuf = inBuf.replace (/z/gi,'2');
			}
		}
		return inBuf;
	}

	var theTimer;
	var theTimerRevert;
	var settings;
	/** used to it can be checked externally when it will trigger */
	var timeToTrigger;

	var methods = {
		init : function( options ) {
			settings = {
				//time in the day when it shall trigger
				'hour'	: 13,
				'minute' : 37,
				'second' : 0,

				//duration in seconds before reverting
				'duration' : 30
			};

			return this.each(function(){
				$.extend( settings, options );
				initTime();
			});
		},

		destroy : function( ) {
			return this.each(function(){
				clearTimeout(theTimer);
				clearTimeout(theTimerRevert);
			})
		},

		/* used so it can be checked externally when it will trigger */
		getMsToTrigger : function( ) {
			var tmp= timeToTrigger - new Date().getTime();
			if(tmp<0){
				return 0;
			}else{
				return tmp;
			}
		},

		/** return array with functions that we want to unit test */
		unitTestHelper : function( ) {
			var unitTest = {};
			unitTest['leetIt'] = leetIt;
			unitTest['calcTimeUntilTimeout'] = calcTimeUntilTimeout;
			return unitTest;
		}
	};

	$.fn.leetOclock = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.leetOclock' );
		} 
	};
})( jQuery );
