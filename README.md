[1]: https://secure.travis-ci.org/litejs/date-format-lite.png
[2]: https://travis-ci.org/litejs/date-format-lite
[3]: https://coveralls.io/repos/litejs/date-format-lite/badge.png
[4]: https://coveralls.io/r/litejs/date-format-lite
[tests]: https://raw.github.com/litejs/date-format-lite/master/tests/run.js "tests/run.js"


    @version    18.0.0-rc.2
    @date       2017-07-27


Date format &ndash; [![Build][1]][2] [![Coverage][3]][4]
===========

Format, parse and manipulate dates in JavaScript.

Weighing under 4KB (2KB gzipped),
it includes everything you need to work with dates.  
To keep things simple,
there are only handful methods added
to native `Date` object prototype:


 - Date#**date**(format, [zoneOffset])
 - Date#**since**(from, unit)
 - Date#**add**(amount, [unit])
 - Date#**startOf**(unit, [format])
 - Date#**endOf**(unit, [format])
 - Date#**locale**(locale, [format])
 - Date#**tz**(zone, [format])


`String` and `Number` are extended with same methods
and will be parsed to date first.

`#add`, `#startOf` and `#endOf` methods are mutating the original date object. Clone can made `Date(+date).startOf("month")`

List of known units: sec, second, seconds, min, minute, minutes, hr, hour, hours, day, days, week, weeks, month, months, year, years

```javascript
var number = 1234567890
, date = new Date(1234567890000)                         // Date {Sat Feb 14 2009 01:31:30 GMT+0200}
, string = "2009-02-13T23:31:30Z"

date.date("iso") == number.date("iso")                   // true
number.date("iso") == string.date("iso")                 // true
date.date("iso")                                         // "2009-02-13T23:31:30Z"
date.date("UTC:hh:mm")                                   // "23:31"
date.date("hh:mm", 2.5)                                  // "02:01"

"2013-07-10T13:47:36Z".date("hh:mm [(local time)]")      // "16:47 (local time)"

"2013-07-10T06:00:00Z".since("day", "hours")             // 6
"2013-07-10T06:00:00Z".since("day", "days")              // 0.25
"2005-06-06T01:02Z".since("2005-06-07T13:02Z", "months") // -0.05)
```

Install
-------

npm install date-format-lite --save

```javascript
require("date-format-lite")
```

Parse Dates
-----------

Numbers below 4294967296 are threated as seconds from epoh,
so range from 1970-01-01T00:00:00.000Z to 1970-02-19T17:02:47.296Z
are not usable in milliseconds.

```javascript
"2013-07-10".date()           // Date {Wed Jul 10 2013 03:00:00 GMT+0300 (EEST)}
"2013-07-10T13:47:36Z".date() // Date {Wed Jul 10 2013 16:47:36 GMT+0300 (EEST)}
"10/07/2013".date()           // Date {Wed Jul 10 2013 03:00:00 GMT+0300 (EEST)}
Date.middleEndian = true
"10/07/2013".date()           // Date {Mon Oct 07 2013 03:00:00 GMT+0300 (EEST)}
// Change format
"10/07/2013".date("YYYY-MM-DD")// 2013-07-10
```


Add custom formats
------------------

```javascript
Date.masks.my = '[DayNo] D'
now.format("my")              // DayNo 10
```

Internationalization
--------------------

```javascript
require("date-format-lite/locale/de.js")
// Set global locale
Date.locale("de") // default en
// Set locale to a specific date object
new Date().locale("de")
```

Syntax
------

- **Y**     - A two digit representation of a year without leading zeros. Examples: 99 or 3
- **YY**    - A two digit representation of a year. Examples: 99 or 03
- **YYYY**  - A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
- **M**     - Numeric representation of a month, without leading zeros. 1 through 12
- **MM**    - Numeric representation of a month, with leading zeros. 01 through 12
- **MMM**   - A short textual representation of a month. Jan through Dec
- **MMMM**  - A full textual representation of a month, such as January or March. January through December
- **D**     - Day of the month without leading zeros. 1 to 31
- **DD**    - Day of the month, 2 digits with leading zeros. 01 to 31
- **DDD**   - A short textual representation of a day. Mon through Sun
- **DDDD**  - A full textual representation of the day of the week. Sunday through Saturday
- **H**     - 12-hour format of an hour without leading zeros. 1 through 12
- **HH**    - 12-hour format of an hour with leading zeros. 01 through 12
- **h**     - 24-hour format of an hour without leading zeros. 0 through 23
- **hh**    - 24-hour format of an hour with leading zeros. 00 through 23
- **m**     - Minutes without leading zeros. 0 through 59
- **mm**    - Minutes with leading zeros. 00 to 59
- **s**     - Seconds without leading zeros. 0 through 59
- **ss**    - Seconds with leading zeros. 00 to 59
- **S**     - Milliseconds without leading zeros. 0 through 999
- **SS**    - Milliseconds with leading zeros. 000 to 999
- **U**     - Milliseconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **u**     - Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
- **A**     - Ante meridiem and Post meridiem. AM or PM
- **"text"** - text, quotes should be escaped, eg '"a \\"quoted text\\"" YYYY'

###### Time zone designators
- **Z**     - Time offsets from UTC in the form ±hh[:mm] Examples: +02:00
- **ZZ**    - Time offsets from UTC in the form ±hh[mm] Examples:  +0200

###### ISO-8601
- **w**     - Day of the week. 1 (for Monday) through 7 (for Sunday)
- **W**     - Week number of year, first week is the week with 4 January in it
- **o**     - ISO-8601 year number. This has the same value as YYYY,
except that if the ISO week number (W) belongs to the previous or next year,
that year is used instead

### Notes

- If no UTC relation information is given with a time representation, the time is assumed to be in local time.
- If the time is in UTC, add a Z directly after the time without a space.
- Software should only ever deal with UTC except when displaying times to the user.

### ToDo

- [ ] Add timezone support for Date#date()

### Browser Support

It should work in all browsers from IE5 and up but automated testing is currently broken.


Links
-----

-   [Source-code on Github](https://github.com/litejs/date-format-lite)
-   [Package on npm](https://npmjs.org/package/date-format-lite)

### Licence

Copyright (c) 2012-2017 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


