import "../";

var now: Date = new Date();
var d1 = now.format("iso");
var d2 = now.format("iso", 0);

console.log(d1, d2);

