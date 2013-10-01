"use strict";
document.getElementById("submit").onclick = function() {
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
			document.getElementById("JS-ATVOutput").innerHTML = v.AVERAGE_TRANSACTION_VALUE;
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
			var temp = v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY + "";
			for (var i = 0; i < temp.length; i++) {
				if (temp[i] != "0" && temp[i] != ".") {
					temp = temp.substring(0, i + 2);
					break;
				}
			}
			document.getElementById("JS-valueOutput").innerHTML = temp + " " + v.CURRENCY;
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


