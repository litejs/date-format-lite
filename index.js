


/*
* @version  17.7.0
* @author   Lauri Rooden <lauri@rooden.ee>
* @license  MIT License
*/



!function(Date, proto) {
	var maskRe = /("|')((?:\\?.)*?)\1|([YMDZ])\3\3\3?|([YMDHhmsWSZ])(\4?)|[uUASwoQ]/g
	, dateRe = /(\d+)[-.\/](\d+)[-.\/](\d+)/
	, timeRe = /(\d+):(\d+)(?::(\d+))?(\.\d+)?(?:\s*(?:(a)|(p))\.?m\.?)?(\s*(?:Z|GMT|UTC)?(?:([-+]\d\d):?(\d\d)?)?)?/i
	, unescapeRe = /\\(.)/g
	, map = { D:"Date", h:"Hours", m:"Minutes", s:"Seconds", S:"Milliseconds" }
	, units = {
		seconds: 1000,
		sec: 1000,
		minutes: 60000,
		min: 60000,
		hours: 3600000,
		hour: 3600000,
		days: 86400000,
		day: 86400000,
		weeks: 604800000,
		week: 604800000
	}

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

	Date[proto].date = Date[proto].format = function(mask, _zone) {
		mask = Date.masks[mask] || mask || Date.masks["default"]

		var undef, zonediff
		, date = this
		, origin = +date
		, get = "get" + (mask.slice(0, 4) == "UTC:" ? (mask = mask.slice(4), "UTC") : "")
		, zone = _zone == undef ? date._z : _zone

		if (zone != undef && get == "get") {
			get = "getUTC"
			date.setTime( origin + (36e5 * zone) )
			zonediff = 60 * zone
		}

		mask = mask.replace(maskRe, function(match, quote, text, MD, single, pad) {
			text = MD == "Y"  ? date[get + "FullYear"]()
			: single == "Z" || MD == "Z"   ? (
				quote = zonediff || get == "get" && -date.getTimezoneOffset() || 0,
				quote ? (
					(quote < 0 ? ((quote=-quote), "-") : "+") +
					(quote < 600 ? "0" : "") +
					(0|(quote/60)) +
					((quote%=60) || MD ? (pad || match == "ZZZZ" ? "" : ":") + (quote > 9 ? quote : "0" + quote) : "")
				)
				: "Z"
			)
			: MD              ? Date.names[ date[get + (MD == "M" ? "Month" : "Day" ) ]() + ( match == "DDD" ? 24 : MD == "D" ? 31 : match == "MMM" ? 0 : 12 ) ]
			: single == "Y"   ? date[get + "FullYear"]() % 100
			: single == "W"   ? ( quote = new Date(origin + ((4 - (date[get + "Day"]()||7)) * 86400000))
			                    , Math.ceil(((quote.getTime() - quote["s" + get.slice(1) + "Month"](0, 1)) / 86400000 + 1 ) / 7)
					    )
			: single == "M"   ? date[get + "Month"]() + 1
			: single == "H"   ? date[get + "Hours"]() % 12 || 12
			: single          ? date[get + map[single]]()
			: match == "u"    ? (date/1000)>>>0
			: match == "U"    ? origin
			: match == "Q"    ? ((date[get + "Month"]()/3)|0) + 1
			: match == "A"    ? Date[date[get + "Hours"]() > 11 ? "pm" : "am"]
			: match == "w"    ? date[get + "Day"]() || 7
			: match == "o"    ? new Date(origin + ((4 - (date[get + "Day"]()||7)) * 86400000))[get + "FullYear"]()
			: quote           ? text.replace(unescapeRe, "$1")
			: match
			if (match == "SS" && text < 100) {
				text = "0" + text
			}
			return pad && text < 10 && single != "Z" ? "0" + text : text
		})
		if (zonediff != undef) {
			date.setTime(origin)
		}
		return mask
	}

	Date[proto].tz = function(zone) {
		this._z = zone
		return this
	}

	Date[proto].add = function(amount, unit) {
		var date = this
		amount |= 0
		if ((unit == "month" || unit == "months") || (unit == "year" || unit == "years") && (amount *= 12)) {
			date.setUTCMonth(date.getUTCMonth() + amount)
		} else if (amount) {
			date.setTime(date.getTime() + (amount * (units[unit] || 1)))
		}
		return date
	}

	Date[proto].startOf = function(unit) {
		var date = this
		, month = 0
		if (unit == "year" || unit == "years") {
			date.setUTCMonth(0, 1)
			unit = "day"
		} else if (unit == "month" || unit == "months") {
			date.setUTCDate(1)
			unit = "day"
		}
		date.setTime(date - (date % (units[unit] || 1)))
		return date
	}

	Date[proto].endOf = function(unit) {
		return this.startOf(unit).add(1, unit).add(-1)
	}

	Date[proto].diff = function(from, unit) {
		var diff = (this - from) / (units[unit] || 1)
		return diff | 0
	}

	Date.am = "AM"
	Date.pm = "PM"

	Date.masks = {
		"default": "DDD MMM DD YYYY hh:mm:ss",
		"iso": "UTC:YYYY-MM-DD'T'hh:mm:ss'Z'"
	}
	Date.names = "JanFebMarAprMayJunJulAugSepOctNovDecJanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecemberSunMonTueWedThuFriSatSundayMondayTuesdayWednesdayThursdayFridaySaturday".match(/.[a-z]+/g)

	//*/


	/*
	 * // In Chrome Date.parse("01.02.2001") is Jan
	 * num = +date || Date.parse(date) || ""+date;
	 */

	String[proto].date = Number[proto].date = function(format, zoneOut, zoneIn) {
		var undef, match, year, month
		, date = new Date()
		, num = +this || "" + this

		if (isNaN(num)) {
			if (match = num.match(dateRe)) {
				// Big endian date, starting with the year, eg. 2011-01-31
				// Middle endian date, starting with the month, eg. 01/31/2011
				// Little endian date, starting with the day, eg. 31.01.2011
				year = match[1] > 99 ? 1 : 3
				month = Date.middleEndian ? 4 - year : 2
				date.setFullYear(match[year], match[month] - 1, match[6 - month - year])
			}

			// Time
			match = num.match(timeRe) || [0, 0, 0]
			date.setHours(
				match[6] && match[1] < 12 ? +match[1] + 12 :
				match[5] && match[1] == 12 ? 0 : match[1],
				match[2], match[3]|0, (1000 * match[4])|0
			)

			// Timezone
			if (match[7]) {
				zoneIn = (match[8]|0) + ((match[9]|0)/(match[8]<0?-60:60))
			}
		} else {
			date.setTime(num < 4294967296 ? num * 1000 : num)
		}

		if (zoneIn != undef) {
			date.setTime(date - (60 * zoneIn + date.getTimezoneOffset()) * 60000)
		}

		return format ? date.format(format, zoneOut) : date
	}

}(Date, "prototype")




