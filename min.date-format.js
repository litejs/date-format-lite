!function(e,h){var l=/(["'])((?:[^\\]|\\.)*?)\1|YYYY|[MD]{3,4}|SS|([YMDHhmsw])(\3?)|[uUaAZS]/g,m=/(\d{4})[-.\/](\d\d?)[-.\/](\d\d?)/,n=/(\d\d?)[-.\/](\d\d?)[-.\/](\d{4})/,p=/(\d\d?):(\d\d):?(\d\d)?\.?(\d{3})?/,q=/pm/i,k=/.[a-z]+/g,r=/\\(.)/g;e[h].format=function(d){d=e.masks[d]||d||e.masks["default"];var b=this,c="get"+("UTC:"==d.slice(0,4)?(d=d.slice(4),"UTC"):"");return d.replace(l,function(a,f,d,g,h){"Y"==g?a=b[c+"FullYear"]()%100:"YYYY"==a?a=b[c+"FullYear"]():"M"==g?a=b[c+"Month"]()+1:"MMM"==
a?a=e.monthNames[b[c+"Month"]()]:"MMMM"==a?a=e.monthNames[b[c+"Month"]()+12]:"D"==g?a=b[c+"Date"]():"DDD"==a?a=e.dayNames[b[c+"Day"]()]:"DDDD"==a?a=e.dayNames[b[c+"Day"]()+7]:"H"==g?a=""+b[c+"Hours"]()%12||12:"h"==g?a=b[c+"Hours"]():"m"==g?a=b[c+"Minutes"]():"s"==g?a=b[c+"Seconds"]():"S"==a?a=b[c+"Milliseconds"]():"SS"==a?(a=b[c+"Milliseconds"](),a=99<a?a:(9<a?"0":"00")+a):a="u"==a?b/1E3>>>0:"U"==a?+b:"a"==a?11<b[c+"Hours"]()?"pm":"am":"A"==a?11<b[c+"Hours"]()?"PM":"AM":"Z"==a?"GMT "+-b.getTimezoneOffset()/
60:"w"==g?1+Math.floor((b-new e(b[c+"FullYear"](),0,4))/6048E5):f?d.replace(r,"$1"):a;d=a;return h?9<d?d:"0"+d:d})};e.masks={"default":"DDD MMM DD YYYY hh:mm:ss",isoUtcDateTime:'UTC:YYYY-MM-DD"T"hh:mm:ss"Z"'};e.monthNames="JanFebMarAprMayJunJulAugSepOctNovDecJanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember".match(k);e.dayNames="SunMonTueWedThuFriSatSundayMondayTuesdayWednesdayThursdayFridaySaturday".match(k);String[h].date=Number[h].date=function(d){var b,c,a=new e,f=+this||
""+this;if(isNaN(f)){if(b=f.match(m))a.setFullYear(b[1],b[2]-1,b[3]);else if(b=f.match(n))c=e.middle_endian?1:2,a.setFullYear(b[3],b[c]-1,b[3-c]);b=f.match(p)||[0,0,0];f.match(q)&&12>b[1]&&(b[1]+=12);a.setHours(b[1],b[2],b[3]||0,b[4]||0);f.indexOf("Z")&&a.setTime(a-6E4*a.getTimezoneOffset())}else a.setTime(4294967296>f?1E3*f:f);return d?a.format(d):a}}(Date,"prototype");
