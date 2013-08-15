process.chdir( process.argv[1].replace(/[^/]+$/, "") )

require("../date-format.js")

var d1 = new Date(1276703114000);
d1.setUTCHours(13, 45, 55, 12);
var d2 = new Date(1000000000000);
var d3 = new Date(1234567890000);

var found = 0
, failed = []
, tests =
	{ "2010-06-16T13:45:55Z": d1.format("isoUtcDateTime")
	, "1276695955": d1.format("u")
	, "1276695955012": d1.format("U")
	, "2001-09-09T01:46:40Z": d2.format("isoUtcDateTime")
	, "1:46 AM": d2.format("UTC:H:mm A")
	, "01 AM": d2.format("YY A")
	, "2009-02-13T23:31:30Z": d3.format("isoUtcDateTime")
	, 'Bla:23:31': d3.format('UTC:"Bla:"hh:mm')
	, "2011-09-21": "21/09/2011".date("YYYY-MM-DD")
	, "2011/09/21": "21.09.2011".date("YYYY/MM/DD")
	, "2011.09.21": "21-09-2011".date("YYYY.MM.DD")
	}


for (var test in tests) {
	found++
	if (test != tests[test]) failed.push(test + " != " + tests[test])
}


console.log(found + " tests found, " + failed.length + " failed.")
if (failed.length) throw failed.join("\n")
