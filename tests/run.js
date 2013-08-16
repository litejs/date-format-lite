
require("../")

var d1 = new Date(1276703114000);
d1.setUTCHours(13, 45, 55, 12);
var d2 = new Date(1000000000000);
var d3 = new Date(1234567890000);

require("testman").
describe ("Date.format").
	it ( "should format" ).
		equal( "2010-06-16T13:45:55Z", d1.format("isoUtcDateTime") ).
		equal( "1276695955", d1.format("u") ).
		equal( "1276695955012", d1.format("U") ).
		equal( "1276695955012012", d1.format("USS") ).
		equal( "2001-09-09T01:46:40Z", d2.format("isoUtcDateTime") ).
		equal( "1:46 AM", d2.format("UTC:H:mm A") ).
		equal( "01 AM", d2.format("YY A") ).
		equal( "2009-02-13T23:31:30Z", d3.format("isoUtcDateTime") ).
		equal( 'Bla:23:31', d3.format('UTC:"Bla:"hh:mm') ).
	
	it ( "should parse" ).
		equal( "2011-09-21", "21/09/2011".date("YYYY-MM-DD") ).
		equal( "2011/09/21", "21.09.2011".date("YYYY/MM/DD") ).
		equal( "2011.09.21", "21-09-2011".date("YYYY.MM.DD") ).
		ok(function(){
			return Date.middle_endian = true
		}).

	
		equal("21-09-2011", "9/21/2011".date("DD-MM-YYYY") ).
		equal("09-21-2011", (1316563200).date("MM-DD-YYYY") ).
		equal("012", (1316563200012).date("SS") ).
		equal("12", (1316563200012).date("S") ).
done()

