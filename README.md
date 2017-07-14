[1]: https://secure.travis-ci.org/litejs/date-format-lite.png
[2]: https://travis-ci.org/litejs/date-format-lite
[3]: https://coveralls.io/repos/litejs/date-format-lite/badge.png
[4]: https://coveralls.io/r/litejs/date-format-lite
[tests]: https://raw.github.com/litejs/date-format-lite/master/tests/run.js "tests/run.js"


    @version    17.7.0
    @date       2017-07-14
    @stability  2 - Unstable


Date format &ndash; [![Build][1]][2] [![Coverage][3]][4]
===========

A small library for parsing and formatting dates
that extends native Date object.


Install
-------

npm install date-format-lite --save

```javascript
require("date-format-lite")
```


Format Dates
------------

`date-format-lite` adds `format(mask, [zone])` method to native `Date.prototype`.

-   **mask** `String` - Output format, e.g. `hh:mm:ss`.
-   **zone** `Number, optional` - UTC offset in hours, e.g. `-6.5`.

```javascript
var now = new Date()          // Date {Wed Jul 10 2013 16:47:36 GMT+0300 (EEST)}
now.format("iso")             // 2013-07-10T13:47:36Z
now.format("hh:mm")           // 16:47 (local time)
now.format("UTC:hh:mm")       // 13:47
now.format("hh:mm", 2.5)      // 16:17
```

Mutate  Dates
------------

`date-format-lite` adds `add(amount, [unit])` method to native `Date.prototype`.

-   **amount** `Number` - Time to add, negative number will be subtracted.
-   **unit** `String, optional` - e.g. seconds, minutes, hours, days, weeks, months, years.

```javascript
now.format("iso")                     // 2013-07-10T13:47:36Z
now.add(1, "days").format("iso")      // 2013-07-11T13:47:36Z
now.add(-2, "hours").format("iso")    // 2013-07-11T11:47:36Z
```

Parse Dates
-----------

`date-format-lite` adds `date([outFormat], [outZone], [inZone])` method
to native `String.prototype` and `Number.prototype`.

-   **outFormat** `String, optional` - Output format, e.g. `hh:mm:ss`.
    Returns date object when format not specified.
-   **outZone** `Number, optional` - UTC offset for output in hours, e.g. `-6.5`.
-   **inZone** `Number, optional` - UTC offset in input in hours, e.g. `-6.5`.

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
Date.masks.my = '"DayNo "D'
now.format("my")              // DayNo 10
```

Change default format
---------------------

```javascript
Date.masks.default = 'YYYY-MM-DD hh:mm:ss'
now.format()         // 2013-07-10 13:47:36
```

Change language
---------------

```javascript
// Add to estonian-lang.js
Date.names = "Jaan Veeb Märts Apr Mai Juuni Juuli Aug Sept Okt Nov Dets jaanuar veebruar märts aprill mai juuni juuli august september oktoober november detsember P E T K N R L pühapäev esmaspäev teisipäev kolmapäev neljapäev reede laupäev".split(" ")

// Change AM and PM
Date.am = "a.m."
Date.pm = "p.m."
```


See [tests][tests] for more examples

Syntax
------

- **Y**     - A two digit representation of a year without leading zeros. Examples: 99 or 3
- **YY**    - A two digit representation of a year. Examples: 99 or 03
- **YYYY**  - A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
- **M**     - Numeric representation of a month, without leading zeros. 1 through 12
- **MM**    - Numeric representation of a month, with leading zeros. 01 through 12
- **MMM**   - A short textual representation of a month, three letters. Jan through Dec
- **MMMM**  - A full textual representation of a month, such as January or March. January through December
- **D**     - Day of the month without leading zeros. 1 to 31
- **DD**    - Day of the month, 2 digits with leading zeros. 01 to 31
- **DDD**   - A textual representation of a day, three letters. Mon through Sun
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
- **Z**     - Time offsets from UTC in the form ±hh[:mm] Examples: +02,    +02:30
- **ZZ**    - Time offsets from UTC in the form ±hh[mm] Examples:  +02,    +0230
- **ZZZ**   - Time offsets from UTC in the form ±hh:mm Examples:   +02:00, +02:30
- **ZZZZ**  - Time offsets from UTC in the form ±hhmm Examples:    +0200,  +0230


###### ISO-8601
- **w**     - Day of the week. 1 (for Monday) through 7 (for Sunday)
- **W**     - Week number of year, first week is the week with 4 January in it
- **o**     - ISO-8601 year number. This has the same value as YYYY,
except that if the ISO week number (W) belongs to the previous or next year,
that year is used instead

### Notes

- If no UTC relation information is given with a time representation, the time is assumed to be in local time.
- If the time is in UTC, add a Z directly after the time without a space.

### ToDo

- [ ] Add timezone support for Date.format

### Browser Support

It should work IE6 and up but automated testing is currently broken.


Links
-----

-   [Source-code on Github](https://github.com/litejs/date-format-lite)
-   [Package on npm](https://npmjs.org/package/date-format-lite)

### Licence

Copyright (c) 2012-2016 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


