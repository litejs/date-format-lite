
require("../")

var d1 = new Date(1276703114000);
d1.setUTCHours(13, 45, 55, 12);
var d2 = new Date(1000000000000);
var d3 = new Date(1234567890000);

require("testman").
describe ("Date.format").

	it ( "should format isoUtcDateTime" ).
		equal( d1.format("isoUtcDateTime"), "2010-06-16T13:45:55Z" ).
		equal( d2.format("isoUtcDateTime"), "2001-09-09T01:46:40Z" ).
		equal( d3.format("isoUtcDateTime"), "2009-02-13T23:31:30Z" ).

	it ( "should format timestamp" ).
		equal( d1.format("u"),   "1276695955" ).
		equal( d1.format("U"),   "1276695955012" ).
		equal( d2.format("u"),   "1000000000" ).
		equal( d2.format("U"),   "1000000000000" ).
		equal( d3.format("u"),   "1234567890" ).
		equal( d3.format("U"),   "1234567890000" ).

	it ( "should format meridiems" ).
		equal( d1.format("UTC:A"), "PM" ).
		equal( d1.format("UTC:a"), "pm" ).
		equal( d2.format("UTC:H:mm A"), "1:46 AM" ).
		equal( d2.format("UTC:H:mm a"), "1:46 am" ).
		equal( d3.format("UTC:A"), "PM" ).

	it ( "should format date and time" ).
		equal( d1.format('UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'), "2010-06-16T13:45:55Z" ).
		equal( d2.format("UTC:YY-M-D h:m:s"), "01-9-9 1:46:40" ).
		equal( d3.format("UTC:Y MMM DDD H A"), "9 Feb Fri 11 PM" ).

	it ( "should format ISO 8601 week numbers" ).
		equal( "2005-01-01".date("o-'W'WW-w"), "2004-W53-6").
		equal( "2005-01-02".date("o-'W'WW-w"), "2004-W53-7").
		equal( "2005-12-31".date("o-'W'WW-w"), "2005-W52-6").
		equal( "2007-01-01".date("o-'W'WW-w"), "2007-W01-1").
		equal( "2007-12-30".date("o-'W'WW-w"), "2007-W52-7").
		equal( "2007-12-31".date("o-'W'WW-w"), "2008-W01-1").
		equal( "2008-01-01".date("o-'W'WW-w"), "2008-W01-2").
		equal( "2008-12-28".date("o-'W'WW-w"), "2008-W52-7").
		equal( "2008-12-29".date("o-'W'WW-w"), "2009-W01-1").
		equal( "2008-12-30".date("o-'W'WW-w"), "2009-W01-2").
		equal( "2008-12-31".date("o-'W'WW-w"), "2009-W01-3").
		equal( "2009-01-01".date("o-'W'WW-w"), "2009-W01-4").
		equal( "2009-12-31".date("o-'W'WW-w"), "2009-W53-4").
		equal( "2010-01-01".date("o-'W'WW-w"), "2009-W53-5").
		equal( "2010-01-02".date("o-'W'WW-w"), "2009-W53-6").
		equal( "2010-01-03".date("o-'W'WW-w"), "2009-W53-7").

	it ( "should accept text in quotes" ).
		equal( d3.format('UTC:"Bla \\"a\\":"hh:mm'), 'Bla "a":23:31' ).
		equal( d3.format("UTC:'Bla \\'a\\':'hh:mm"), "Bla 'a':23:31" ).
		equal( d3.format("UTC:'a' a"), "a pm" ).

describe ("Date.parse").

	it ( "should parse dates" ).
		equal( "21/09/2011".date("YYYY-MM-DD"), "2011-09-21" ).
		equal( "21.09.2011".date("YYYY/MM/DD"), "2011/09/21" ).
		equal( "21-09-2011".date("YYYY.MM.DD"), "2011.09.21" ).
		run(function(){
			Date.middle_endian = true
		}).

		equal("9/21/2011".date("DD-MM-YYYY"), "21-09-2011" ).
		equal((1316563200).date("MM-DD-YYYY"), "09-21-2011" ).
		equal("1316563200".date("MM-DD-YYYY"), "09-21-2011" ).
		equal((1316563200012).date("SS"), "012" ).
		equal((1316563200012).date("S"), "12" ).

	it ( "should parse ISO 8601 week numbers" , { skip: "Not implemented" }).
		equal( "2004-W53-6".date("YYYY-MM-DD"), "2005-01-01" ).
		equal( "2004-W53-7".date("YYYY-MM-DD"), "2005-01-02" ).
		equal( "2005-W52-6".date("YYYY-MM-DD"), "2005-12-31" ).
		equal( "2007-W01-1".date("YYYY-MM-DD"), "2007-01-01" ).
		equal( "2007-W52-7".date("YYYY-MM-DD"), "2007-12-30" ).
		equal( "2008-W01-1".date("YYYY-MM-DD"), "2007-12-31" ).
		equal( "2008-W01-2".date("YYYY-MM-DD"), "2008-01-01" ).
		equal( "2008-W52-7".date("YYYY-MM-DD"), "2008-12-28" ).
		equal( "2009-W01-1".date("YYYY-MM-DD"), "2008-12-29" ).
		equal( "2009-W01-2".date("YYYY-MM-DD"), "2008-12-30" ).
		equal( "2009-W01-3".date("YYYY-MM-DD"), "2008-12-31" ).
		equal( "2009-W01-4".date("YYYY-MM-DD"), "2009-01-01" ).
		equal( "2009-W53-4".date("YYYY-MM-DD"), "2009-12-31" ).
		equal( "2009-W53-5".date("YYYY-MM-DD"), "2010-01-01" ).
		equal( "2009-W53-6".date("YYYY-MM-DD"), "2010-01-02" ).
		equal( "2009-W53-7".date("YYYY-MM-DD"), "2010-01-03" ).

done()

