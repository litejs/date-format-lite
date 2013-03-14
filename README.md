
[1]: https://raw.github.com/litejs/date-format-lite/master/date-format-lite.js
[2]: https://raw.github.com/litejs/date-format-lite/master/date-format-lite.min.js
[3]: https://raw.github.com/litejs/date-format-lite/master/test/run.js "test/run.js"


Date format
===========

Lite version of Date format and parse for node.js and browser.
Download [compressed][2] 
(2093 bytes or 1099 bytes gzipped)
or [uncompressed][1] source.



## How to use

### In browser

```html
<script src=date-format-lite.min.js></script>
```

### In node.js

npm install date-format-lite

```javascript
require("date-format-lite")

```

### Usage

```javascript
var dateStr = new Date().format("isoUtcDateTime")
var dateStr = new Date().format("hh:mm")

```

See [tests][3] for more examples

## Syntax

```javascript
YY    - A two digit representation of a year. Examples: 99 or 03
YY    - A two digit representation of a year. Examples: 99 or 03
YYYY  - A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
M     - Numeric representation of a month, without leading zeros. 1 through 12
MM    - Numeric representation of a month, with leading zeros. 01 through 12
MMM   - A short textual representation of a month, three letters. Jan through Dec
MMMM  - A full textual representation of a month, such as January or March. January through December
D     - Day of the month without leading zeros. 1 to 31
DD    - Day of the month, 2 digits with leading zeros. 01 to 31
DDD   - A textual representation of a day, three letters. Mon through Sun
DDDD  - A full textual representation of the day of the week. Sunday through Saturday
H     - 12-hour format of an hour without leading zeros. 1 through 12
HH    - 12-hour format of an hour with leading zeros. 01 through 12
h     - 24-hour format of an hour without leading zeros. 0 through 23
hh    - 24-hour format of an hour with leading zeros. 00 through 23
m     - Minutes without leading zeros. 0 through 59
mm    - Minutes with leading zeros. 00 to 59
s     - Seconds without leading zeros. 0 through 59
ss    - Seconds with leading zeros. 00 to 59
S     - Milliseconds without leading zeros. 0 through 999
SS    - Milliseconds with leading zeros. 000 to 999
u     - Milliseconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
U     - Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
a     - Lowercase Ante meridiem and Post meridiem. am or pm
A     - Uppercase Ante meridiem and Post meridiem. AM or PM
Z     - Difference to Greenwich time (GMT) with colon between hours and minutes. Example: GMT +02:00
w     - Week number of year, First week is the week with 4 January in it
```

### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


