


/*
* @version  17.7.0
* @author   Lauri Rooden <lauri@rooden.ee>
* @license  MIT License
*/



!function(Date, proto) {
	var Date$prototype = Date[proto]
	, String$prototype = String[proto]
	, Number$prototype = Number[proto]
	, maskRe = /(\[)((?:\\?.)*?)\]|([YMD])\3\3\3?|([YMDHhmsWSZ])(\4?)|[uUASwoQ]|(["\n\r\u2028\u2029])/g
	, dateRe = /(\d+)[-.\/](\d+)[-.\/](\d+)/
	, timeRe = /(\d+):(\d+)(?::(\d+))?(\.\d+)?(?:\s*(?:(a)|(p))\.?m\.?)?(\s*(?:Z|GMT|UTC)?(?:([-+]\d\d):?(\d\d)?)?)?/i
	, fns = Object.create(null)
	, aliases = {
		sec: "s",
		second: "s",
		seconds: "s",
		min: "m",
		minute: "m",
		minutes: "m",
		hr: "h",
		hour: "h",
		hours: "h",
		day: "D",
		days: "D",
		week: "W",
		weeks: "W",
		month: "M",
		months: "M",
		year: "Y",
		years: "Y"
	}
	, units = {
		S: 1,
		s: 1000,
		m: 60000,
		h: 3600000,
		D: 86400000,
		W: 604800000
	}
	, tmp1 = new Date()
	, tmp2 = new Date()
	, map = {
		w: "Day()||7",
		Y: "FullYear()%100",
		M: "Month()+1",
		D: "Date()",
		h: "Hours()",
		H: "Hours()%12||12",
		m: "Minutes()",
		s: "Seconds()",
		S: "Milliseconds()"
	}

	function makeFn(mask, utc) {
		var get = "d.get" + (utc ? "UTC" : "")
		, setA = "a.setTime(+d+((4-(" + get + map.w + "))*864e5))"
		, str = (utc ? mask.slice(4) : mask).replace(maskRe, function(match, quote, text, MD, single, pad, esc) {
			var str = (
				esc            ? escape(esc).replace(/%u/g, "\\u").replace(/%/g, "\\x") :
				quote          ? text :
				MD == "Y"      ? get + "FullYear()" :
				MD             ? "Date.names[" + get + (MD == "M" ? "Month" : "Day" ) + "()+" + (match == "DDD" ? 24 : MD == "D" ? 31 : match == "MMM" ? 0 : 12) + "]" :
				match == "u"   ? "(d/1000)>>>0" :
				match == "U"   ? "+d" :
				match == "Q"   ? "((" + get + "Month()/3)|0)+1" :
				match == "A"   ? "Date[" + get + map.h + ">11?'pm':'am']" :
				match == "o"   ? setA + ",a" + get.slice(1) + "FullYear()" :
				single == "Z"  ? "(t=o)?(t<0?((t=-t),'-'):'+')+(t<600?'0':'')+(0|(t/60))" + (pad ? "" : "+':'") + "+((t%=60)>9?t:'0'+t):'Z'" :
				single == "W"  ? "Math.ceil(((" + setA + "-a.s" + get.slice(3) + "Month(0,1))/864e5+1)/7)" :
				get + map[single || match]
			)
			return quote || esc ? str : '"+(' + (
				match == "SS" ? "(t=" + str + ")>9?t>99?t:'0'+t:'00'+t" :
				pad && single != "Z" ? "(t=" + str + ")>9?t:'0'+t" :
				str
			) + ')+"'
		})

		return fns[mask] = Function("d,a,o", 'var t;return "' + str + '"')
	}

	Date$prototype.date = function(mask, _zone) {
		mask = Date.masks[mask] || mask || Date.masks["default"]
		var offset, undef
		, date = this
		, zone = _zone == undef ? date._z : _zone
		, utc = mask.slice(0, 4) == "UTC:"
		if (zone != undef && !utc) {
			offset = 60 * zone
			tmp1.setTime(+date + offset * 6e4)
			utc = mask = "UTC:" + mask
		} else {
			offset = utc ? 0 : -date.getTimezoneOffset()
			tmp1.setTime(+date)
		}
		return isNaN(+date) ? "" + date : (fns[mask] || makeFn(mask, utc))(tmp1, tmp2, offset)
	}

	Date$prototype.tz = function(zone) {
		this._z = zone
		return this
	}

	Date$prototype.add = function(amount, _unit, format) {
		var date = this
		, unit = aliases[_unit] || _unit
		if (unit == "M" || unit == "Y" && (amount *= 12)) {
			unit = date.getUTCDate()
			date.setUTCMonth(date.getUTCMonth() + amount)
			if (unit > (unit = date.getUTCDate())) {
				date.add(-unit, "D")
			}
		} else if (amount) {
			date.setTime(date.getTime() + (amount * (units[unit] || 1)))
		}
		return format ? date.date(format) : date
	}

	Date$prototype.startOf = function(_unit, format) {
		var date = this
		, unit = aliases[_unit] || _unit
		if (unit == "Y") {
			date.setUTCMonth(0, 1)
			unit = "D"
		} else if (unit == "M") {
			date.setUTCDate(1)
			unit = "D"
		}
		date.setTime(date - (date % (units[unit] || 1)))
		return format ? date.date(format) : date
	}

	Date$prototype.endOf = function(unit, format) {
		return this.startOf(unit).add(1, unit).add(-1, "S", format)
	}

	Date$prototype.since = function(from, _unit) {
		var diff
		, date = this
		, unit = aliases[_unit] || _unit
		if (typeof from == "string") {
			from = aliases[from] ? (tmp2.setTime(+date), tmp2.startOf(from)) : from.date()
		}
		if (units[unit]) {
			diff = (date - from) / units[unit]
		} else {
			diff = date.since("month", "S") - from.since("month", "S")
			if (diff) {
				tmp1.setTime(+date)
				diff /= units.D * tmp1.endOf("M").getUTCDate()
			}
			diff += 12 * (date.getUTCFullYear() - from.getUTCFullYear()) + date.getUTCMonth() - from.getUTCMonth()
			if (unit == "Y") {
				diff /= 12
			}
		}

		return diff
	}
	String$prototype.since = Number$prototype.since = function(from, unit) {
		return this.date().since(from, unit)
	}

	Date.am = "AM"
	Date.pm = "PM"

	Date.masks = {
		"default": "DDD MMM DD YYYY hh:mm:ss",
		"iso": "UTC:YYYY-MM-DD[T]hh:mm:ss[Z]"
	}
	Date.names = "JanFebMarAprMayJunJulAugSepOctNovDecJanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecemberSunMonTueWedThuFriSatSundayMondayTuesdayWednesdayThursdayFridaySaturday".match(/.[a-z]+/g)

	//*/


	/*
	 * // In Chrome Date.parse("01.02.2001") is Jan
	 * num = +date || Date.parse(date) || ""+date;
	 */

	String$prototype.date = Number$prototype.date = function(format, zoneOut, zoneIn) {
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

		return format ? date.date(format, zoneOut) : date
	}

}(Date, "prototype")




