


/*
* @version  0.6.0
* @author   Lauri Rooden <lauri@rooden.ee>
* @license  MIT License
*/



!function(Date, proto) {
	var maskRe = /("|')((?:\\?.)*?)\1|(Y|M|D){3,4}|([YMDHhmsWS])(\4?)|[uUAZSwo]/g
	, yearFirstRe = /(\d{4})[-.\/](\d\d?)[-.\/](\d\d?)/
	, dateFirstRe = /(\d\d?)[-.\/](\d\d?)[-.\/](\d{4})/
	, timeRe = /(\d\d?):(\d\d):?(\d\d)?\.?(\d{3})?(?:\s*(?:(a)|(p))\.?m\.?)?(\s*(?:Z|GMT|UTC)?(?:([-+]\d\d):?(\d\d)?)?)?/i
	, unescapeRe = /\\(.)/g
	, map = { D:"Date", h:"Hours", m:"Minutes", s:"Seconds", S:"Milliseconds" }
	//, isoDateRe = /(\d{4})[-.\/]W(\d\d?)[-.\/](\d)/


	// ISO 8601 specifies numeric representations of date and time.
	//
	// The international standard date notation is
	// YYYY-MM-DD
	//
	// The international standard notation for the time of day is
	// hh:mm:ss
	//
	// Time zone
	//
	// The strings +hh:mm, +hhmm, or +hh (ahead of UTC)
	// -hh:mm, -hhmm, or -hh (time zones west of the zero meridian, which are behind UTC)
	//
	// 12:00Z = 13:00+01:00 = 0700-0500

	Date[proto].format = function(mask) {
		mask = Date.masks[mask] || mask || Date.masks["default"]

		var date = this
		, get = "get" + (mask.slice(0,4) == "UTC:" ? (mask=mask.slice(4), "UTC"):"")

		return mask.replace(maskRe, function(match, quote, text, MD, single, pad) {
			text = MD == "Y"  ? date[get + "FullYear"]()
			: MD              ? Date.names[ date[get + (MD == "M" ? "Month" : "Day" ) ]() + ( MD == "M" ? (match == MD ? 12 : 0) : (match == MD ? 31 : 24) ) ]
			: single == "Y"   ? date[get + "FullYear"]() % 100
			: single == "W"   ? (quote = new Date(+date + ((4 - (date[get + "Day"]()||7)) * 86400000)), Math.ceil(((quote.getTime()-quote["s" + get.slice(1) + "Month"](0,1)) / 86400000 + 1 ) / 7) )
			: single == "M"   ? date[get + "Month"]() + 1
			: single == "H"   ? date[get + "Hours"]() % 12 || 12
			: single          ? date[get + map[single]]()
			: match == "u"    ? (date/1000)>>>0
			: match == "U"    ? +date
			: match == "A"    ? Date[date[get + "Hours"]() > 11 ? "pm" : "am"]
			: match == "Z"    ? "GMT " + (-date.getTimezoneOffset()/60)
			: match == "w"    ? date[get + "Day"]() || 7
			: match == "o"    ? new Date(+date + ((4 - (date[get + "Day"]()||7)) * 86400000))[get + "FullYear"]()
			: quote           ? text.replace(unescapeRe, "$1")
			: match
			if (match == "SS" && text < 100) text = "0" + text
			return !pad || text > 9 ? text : "0"+text
		})
	}

	Date.am = "AM"
	Date.pm = "PM"

	Date.masks = {"default": "DDD MMM DD YYYY hh:mm:ss", "isoUtcDateTime": 'UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'}
	Date.names = "JanFebMarAprMayJunJulAugSepOctNovDecJanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecemberSunMonTueWedThuFriSatSundayMondayTuesdayWednesdayThursdayFridaySaturday".match(/.[a-z]+/g)

	//*/


	/*
	* // In Chrome Date.parse("01.02.2001") is Jan
	* n = +date || Date.parse(date) || ""+date;
	*/

	String[proto].date = Number[proto].date = function(format) {
		var m, temp
		, d = new Date
		, n = +this || ""+this

		if (isNaN(n)) {
			// Big endian date, starting with the year, eg. 2011-01-31
			if (m = n.match(yearFirstRe)) d.setFullYear(m[1], m[2]-1, m[3])

			else if (m = n.match(dateFirstRe)) {
				// Middle endian date, starting with the month, eg. 01/31/2011
				// Little endian date, starting with the day, eg. 31.01.2011
				temp = Date.middleEndian ? 1 : 2
				d.setFullYear(m[3], m[temp]-1, m[3-temp])
			}

			// Time
			m = n.match(timeRe) || [0, 0, 0]
			d.setHours( m[6] && m[1] < 12 ? +m[1]+12 : m[5] && m[1] == 12 ? 0 : m[1], m[2], m[3]|0, m[4]|0)
			// Timezone
			if (m[7]) {
				d.setTime(d-((d.getTimezoneOffset() + (m[8]|0)*60 + ((m[8]<0?-1:1)*(m[9]|0)))*60000))
			}
		} else d.setTime( n < 4294967296 ? n * 1000 : n )
		return format ? d.format(format) : d
	}

}(Date, "prototype")




