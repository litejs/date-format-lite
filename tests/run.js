
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
		equal( d1.format("USS"), "1276695955012012" ).
		equal( d2.format("u"),   "1000000000" ).
		equal( d2.format("U"),   "1000000000000" ).
		equal( d2.format("USS"), "1000000000000000" ).
		equal( d3.format("u"),   "1234567890" ).
		equal( d3.format("U"),   "1234567890000" ).
		equal( d3.format("USS"), "1234567890000000" ).

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

	it ( "should accept text in quotes" ).
		equal( d3.format('UTC:"Bla \\"a\\":"hh:mm'), 'Bla "a":23:31' ).
		equal( d3.format("UTC:'Bla \\'a\\':'hh:mm"), "Bla 'a':23:31" ).
		equal( d3.format("UTC:'a' a"), "a pm" ).
	
	it ( "should parse dates" ).
		equal( "21/09/2011".date("YYYY-MM-DD"), "2011-09-21" ).
		equal( "21.09.2011".date("YYYY/MM/DD"), "2011/09/21" ).
		equal( "21-09-2011".date("YYYY.MM.DD"), "2011.09.21" ).
		ok(function(){
			return Date.middle_endian = true
		}).

		equal("9/21/2011".date("DD-MM-YYYY"), "21-09-2011" ).
		equal((1316563200).date("MM-DD-YYYY"), "09-21-2011" ).
		equal("1316563200".date("MM-DD-YYYY"), "09-21-2011" ).
		equal((1316563200012).date("SS"), "012" ).
		equal((1316563200012).date("S"), "12" ).
done()

