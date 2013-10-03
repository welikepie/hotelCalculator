"use strict";
window.onload = function(){
	util.addSubmitListeners();
}
var addedListeners = false;
document.getElementById("submit").onclick = function() {
	if(addedListeners == false){
			addedListeners = true;
			util.addPermaListeners();
		}
	if (util.errorChecking() == true) {
		v.NUMBER_OF_ROOMS = document.getElementById("JS-number-of-rooms").value * 1;
		v.CURRENCY = document.getElementById("JS-currency").value;
		v.AVERAGE_ROOM_RATE = document.getElementById("JS-average-room-rate").value * 1;
		if (f.NUMBER_OF_TRANSACTIONS_PER_DAY() == true) {
			document.getElementById("JS-numTransactionOutput").innerHTML = v.NUMBER_OF_TRANSACTIONS_PER_DAY;
		} else {
			console.log("f.NUMBER_OF_TRANSACTIONS_PER_DAY failed.");
		}
		if (f.AVERAGE_TRANSACTION_VALUE() == true) {
			document.getElementById("JS-ATVOutput").innerHTML = v.AVERAGE_TRANSACTION_VALUE + " "+v.CURRENCY;
		} else {
			console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
		}
		if (f.TURNOVER() == true) {
			document.getElementById("JS-TurnoverOutput").innerHTML = v.TURNOVER;
		}//VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY
		else {
			console.log("f.TURNOVER failed.");
		}
		if (f.VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY() == true) {
			
			var temp = toFixed(v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY) + "";
			for (var i = 0; i < temp.length; i++) {
				if (temp[i] != "0" && temp[i] != ".") {
					temp = temp.substring(0, i + 2);
					break;
				}
			}
			document.getElementById("JS-valueLabel").innerHTML = "Value in minutes of 1 "+v.CURRENCY+" : ";
			document.getElementById("JS-valueOutput").innerHTML = temp + " minutes.";
		}//
		else {
			console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
		}
		if (f.NUMBER_OF_UPSELLS() == true) {
			document.getElementById("JS-upsellOutput").innerHTML = Math.floor(v.NUMBER_OF_UPSELLS);
		} else {
			console.log("f.NUMBER_OF_UPSELLS");
		}
	}
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


