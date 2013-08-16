


/*
* @version  0.1.8
* @author   Lauri Rooden - https://github.com/litejs/date-format-lite
* @license  MIT License  - http://lauri.rooden.ee/mit-license.txt
*/



!function(Date, proto) {
	var maskRe = /(")(.*?)"|'(?:[^'\\]|\\.)*'|(YY(?:YY)?|M{1,4}|D{1,4}|([HhmsS])\4?|[uUaAZw])/g
	, yearFirstRe = /(\d\d\d\d)[-.\/](\d\d?)[-.\/](\d\d?)/
	, dateFirstRe = /(\d\d?)[-.\/](\d\d?)[-.\/](\d\d\d\d)/
	, timeRe = /(\d{1,2}):(\d{2}):?(\d{2})?\.?(\d{3})?/
	, periodRe = /pm/i
	, wordRe = /.[a-z]+/g
	

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
	// hh:mm:ss
	//
	// TODO:2012-03-05:lauriro:Date week number not complete
	// http://en.wikipedia.org/wiki/ISO_week_date
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
	
	Date[proto].format = function(mask) {
		mask = Date.masks[mask] || mask || Date.masks["default"]

		var self = this
		, get = "get" + (mask.slice(0,4) == "UTC:" ? (mask=mask.slice(4), "UTC"):"")

		return mask.replace(maskRe, function(match, quote, text) {
			return match == "YY"   ? (""+self[get + "FullYear"]()).slice(2)
					 : match == "YYYY" ? self[get + "FullYear"]()
					 : match == "M"    ? self[get + "Month"]()+1
					 : match == "MM"   ? p2(self[get + "Month"]()+1)
					 : match == "MMM"  ? Date.monthNames[ self[get + "Month"]() ]
					 : match == "MMMM" ? Date.monthNames[ self[get + "Month"]()+12 ]
					 : match == "D"    ? self[get + "Date"]()
					 : match == "DD"   ? p2(self[get + "Date"]())
					 : match == "DDD"  ? Date.dayNames[ self[get + "Day"]() ]
					 : match == "DDDD" ? Date.dayNames[ self[get + "Day"]()+7 ]
					 : match == "H"    ? (""+self[get + "Hours"]()%12||12)
					 : match == "HH"   ? p2(self[get + "Hours"]()%12||12)
					 : match == "h"    ? self[get + "Hours"]()
					 : match == "hh"   ? p2(self[get + "Hours"]())
					 : match == "m"    ? self[get + "Minutes"]()
					 : match == "mm"   ? p2(self[get + "Minutes"]())
					 : match == "s"    ? self[get + "Seconds"]()
					 : match == "ss"   ? p2(self[get + "Seconds"]())
					 : match == "S"    ? self[get + "Milliseconds"]()
					 : match == "SS"   ? p3(self[get + "Milliseconds"]())
					 : match == "u"    ? (self/1000)>>>0
					 : match == "U"    ? +self
					 : match == "a"    ? (self[get + "Hours"]() > 11 ? "pm" : "am")
					 : match == "A"    ? (self[get + "Hours"]() > 11 ? "PM" : "AM")
					 : match == "Z"    ? "GMT " + (-self.getTimezoneOffset()/60)
					 : match == "w"    ? 1+Math.floor((self - new Date(self[get + "FullYear"](),0,4))/604800000)
					 : quote           ? text
					 : match
			}
		)
	}

	Date.masks = {"default":"DDD MMM DD YYYY hh:mm:ss","isoUtcDateTime":'UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'}
	Date.monthNames = "JanFebMarAprMayJunJulAugSepOctNovDecJanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember".match(wordRe)
	Date.dayNames = "SunMonTueWedThuFriSatSundayMondayTuesdayWednesdayThursdayFridaySaturday".match(wordRe)

	//*/


	/*
	* // In Chrome Date.parse("01.02.2001") is Jan
	* n = +self || Date.parse(self) || ""+self;
	*/

	String[proto].date = Number[proto].date = function(format) {
		var m
		, d = new Date
		, n = +this || ""+this

		if (isNaN(n)) {
			// Big endian date, starting with the year, eg. 2011-01-31
			if (m = n.match(yearFirstRe)) d.setFullYear(m[1], m[2]-1, m[3])

			else if (m = n.match(dateFirstRe)) {
				// Middle endian date, starting with the month, eg. 01/31/2011
				if (Date.middle_endian) d.setFullYear(m[3], m[1]-1, m[2])
				// Little endian date, starting with the day, eg. 31.01.2011
				else d.setFullYear(m[3], m[2]-1, m[1])
			}

			// Time
			m = n.match(timeRe) || [0, 0, 0]
			if (n.match(periodRe) && m[1] < 12) m[1]+=12
			d.setHours(m[1], m[2], m[3]||0, m[4]||0)
			// Timezone
			n.indexOf("Z") && d.setTime(d-(d.getTimezoneOffset()*60000))
		} else d.setTime( (n<4294967296?n*1000:n) )
		return format ? d.format(format) : d
	}

}(Date, "prototype")




