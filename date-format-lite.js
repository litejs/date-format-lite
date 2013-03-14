


/*
* @version  0.1.0
* @author   Lauri Rooden - https://github.com/litejs/date-format-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(D) {

	function p2(n) {
		return n>9?n:"0"+n
	}

	function p3(n) {
		return (n>99?n:(n>9?"0":"00")+n)
	}

	//** Date.format
	// ISO 8601 specifies numeric representations of date and time.
	// The international standard date notation is
	//
	// YYYY-MM-DD
	// The international standard notation for the time of day is
	//
	// TODO:2012-03-05:lauriro:Date week number not complete
	// http://en.wikipedia.org/wiki/ISO_week_date
	//
	// hh:mm:ss
	//
	// Time zone
	//
	// The strings
	//
	// +hh:mm, +hhmm, or +hh
	//
	// can be added to the time to indicate that the used local time zone is hh hours and mm minutes ahead of UTC. For time zones west of the zero meridian, which are behind UTC, the notation
	//
	// -hh:mm, -hhmm, or -hh
	//
	// is used instead. For example, Central European Time (CET) is +0100 and U.S./Canadian Eastern Standard Time (EST) is -0500. The following strings all indicate the same point of time:
	//
	// 12:00Z = 13:00+01:00 = 0700-0500
	
	var maskRe = /(")([^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|(YY(?:YY)?|M{1,4}|D{1,4}|([HhmsS])\4?|[uUaAZw])/g
	
	Date.prototype.format = function(mask) {
		var t = this
		, x = Date.masks[mask] || mask || Date.masks["default"]
		, g = "get" + (x.slice(0,4) == "UTC:" ? (x=x.slice(4), "UTC"):"")
		, Y = g + "FullYear"
		, M = g + "Month"
		, d = g + "Date"
		, w = g + "Day"
		, h = g + "Hours"
		, m = g + "Minutes"
		, s = g + "Seconds"
		, S = g + "Milliseconds"

		return x.replace(maskRe, function(a, b, c) {
			return a == "YY"   ? (""+t[Y]()).slice(2)
					 : a == "YYYY" ? t[Y]()
					 : a == "M"    ? t[M]()+1
					 : a == "MM"   ? p2(t[M]()+1)
					 : a == "MMM"  ? Date.monthNames[ t[M]() ]
					 : a == "MMMM" ? Date.monthNames[ t[M]()+12 ]
					 : a == "D"    ? t[d]()
					 : a == "DD"   ? p2(t[d]())
					 : a == "DDD"  ? Date.dayNames[ t[w]() ]
					 : a == "DDDD" ? Date.dayNames[ t[w]()+7 ]
					 : a == "H"    ? (""+t[h]()%12||12)
					 : a == "HH"   ? p2(t[h]()%12||12)
					 : a == "h"    ? t[h]()
					 : a == "hh"   ? p2(t[h]())
					 : a == "m"    ? t[m]()
					 : a == "mm"   ? p2(t[m]())
					 : a == "s"    ? t[s]()
					 : a == "ss"   ? p2(t[s]())
					 : a == "S"    ? t[S]()
					 : a == "SS"   ? p3(t[S]())
					 : a == "u"    ? (t/1000)>>>0
					 : a == "U"    ? +t
					 : a == "a"    ? (t[h]() > 11 ? "pm" : "am")
					 : a == "A"    ? (t[h]() > 11 ? "PM" : "AM")
					 : a == "Z"    ? "GMT " + (-t.getTimezoneOffset()/60)
					 : a == "w"    ? 1+Math.floor((t - new Date(t[Y](),0,4))/604800000)
					 : b           ? c
					 : a
			}
		)
	}

	Date.masks = {"default":"DDD MMM DD YYYY hh:mm:ss","isoUtcDateTime":'UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'}
	Date.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")
	Date.dayNames = "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")

	//*/


	//** String.date
	var litEnd = /(\d\d?)\.(\d\d?)\.(\d\d\d\d)/

	String.prototype.date = Number.prototype.date = function(format) {
		var m
		, t = this
		, d = new Date()
		, n = +t || ""+t
		// n = +t || Date.parse(t) || ""+t; // In Chrome Date.parse("01.02.2001") is Jan

		if (isNaN(n)) {
			// Big endian date, starting with the year, eg. 2011-01-31
			if (m = n.match(/(\d\d\d\d)-(\d\d?)-(\d\d?)/)) d.setFullYear(m[1], m[2]-1, m[3])

			// Middle endian date, starting with the month, eg. 01/31/2011
			else if (m = n.match(Date.middle_endian ? litEnd : /(\d\d?)\/(\d\d?)\/(\d\d\d\d)/)) d.setFullYear(m[3], m[1]-1, m[2])
			
			// Little endian date, starting with the day, eg. 31.01.2011
			else if (m = n.match(litEnd)) d.setFullYear(m[3], m[2]-1, m[1])
			
			// Time
			m = n.match(/(\d{1,2}):(\d{2}):?(\d{2})?\.?(\d{3})?/) || [0, 0, 0]
			if (n.match(/pm/i) && m[1] < 12) m[1]+=12
			d.setHours(m[1], m[2], m[3]||0, m[4]||0)
			// Timezone
			n.indexOf("Z") && d.setTime(d-(d.getTimezoneOffset()*60000))
		} else d.setTime( (n<4294967296?n*1000:n) )
		return format ? d.format(format) : d
	}

	//*/

}()




