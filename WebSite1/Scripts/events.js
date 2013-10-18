"use strict";
window.onload = function() {
	util.addSubmitListeners();
	document.getElementById("JS-currency").onchange = function() {
		document.getElementById("JS-selectResponseText").innerHTML = util.selectContains[document.getElementById("JS-currency").value];
	}
	//	<div id="JS-selectResponse">Select...</div>
	//				<select id="JS-currency">
}
var addedListeners = false;
document.getElementById("JS-clear").onclick = function() {
	for (var i = 0; i < util.formElements.length; i++) {
		document.getElementById(util.formElements[i]).value = "";
		document.getElementById(util.formElements[i] + "Error").style.display = "none";
		document.getElementById("JS-numTransactionOutput").innerHTML = "";
		document.getElementById("JS-ATVOutput").innerHTML = "";
		document.getElementById("JS-TurnoverOutput").innerHTML = "";
		document.getElementById("JS-valueOutput").innerHTML = "";
		document.getElementById("JS-upsellOutput").innerHTML = "";
		document.getElementById("JS-numTransactionOutput").value = "";
		document.getElementById("JS-ATVOutput").value = "";
		document.getElementById("JS-TurnoverOutput").value = "";
		document.getElementById("JS-valueOutput").value = "";
		document.getElementById("JS-upsellOutput").value = "";

	}
	document.getElementById("JS-selectResponseText").innerHTML = util.selectContains[document.getElementById("JS-currency").value];
}
document.getElementById("submit").onclick = function() {
    if (addedListeners == false) {
        addedListeners = true;
        util.addPermaListeners();
    }
    if (util.errorChecking() == true) {
        v.NUMBER_OF_ROOMS = document.getElementById("JS-number-of-rooms").value * 1;
        v.CURRENCY = document.getElementById("JS-currency").value;
        v.AVERAGE_ROOM_RATE = document.getElementById("JS-average-room-rate").value * 1;
        if (f.NUMBER_OF_TRANSACTIONS_PER_DAY() == true) {
            document.getElementById("JS-numTransactionOutput").innerHTML = v.NUMBER_OF_TRANSACTIONS_PER_DAY;
            document.getElementById("JS-numTransactionOutput").value= v.NUMBER_OF_TRANSACTIONS_PER_DAY;
        } else {
            console.log("f.NUMBER_OF_TRANSACTIONS_PER_DAY failed.");
        }
        if (f.AVERAGE_TRANSACTION_VALUE() == true) {
            document.getElementById("JS-ATVOutput").innerHTML = v.AVERAGE_TRANSACTION_VALUE + " " + v.CURRENCY;
            document.getElementById("JS-ATVOutput").value = v.AVERAGE_TRANSACTION_VALUE;
        } else {
            console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
        }
        if (f.TURNOVER() == true) {
            document.getElementById("JS-TurnoverOutput").innerHTML = v.TURNOVER;
            document.getElementById("JS-TurnoverOutput").value = v.TURNOVER;
        } //VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY
        else {
            console.log("f.TURNOVER failed.");
        }
        if (f.VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY() == true) {

            var temp = toFixed(v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY) + "";
            for (var i = 0; i < temp.length; i++) {
                if (temp.charAt(i) != "0" && temp.charAt(i) != ".") {
                    temp = temp.substring(0, i + 2);
                    break;
                }
            }
            document.getElementById("JS-valueLabel").innerHTML = "Value in minutes of 1 " + v.CURRENCY + " : ";
            document.getElementById("JS-valueOutput").innerHTML = temp + " minutes.";
            document.getElementById("JS-valueOutput").value = temp;
        } //
        else {
            console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
        }
        if (f.NUMBER_OF_UPSELLS() == true) {
            document.getElementById("JS-upsellOutput").innerHTML = Math.floor(v.NUMBER_OF_UPSELLS);
            document.getElementById("JS-upsellOutput").value = Math.floor(v.NUMBER_OF_UPSELLS);
        } else {
            console.log("f.NUMBER_OF_UPSELLS");
        }
        //alert("submitted to le database");
        pushToDatabase();
    }
}
function pushToDatabase() {
	var toOutput = {};
	for (var i = 0; i < util.toDatabase.length; i++) {
	    var foundVal = document.getElementById(util.toDatabase[i]).value;
	    console.log(util.toDatabase[i]);
	    console.log(foundVal);
	    if (foundVal != "") {
	        if (!isNaN(foundVal * 1) && util.toDatabase[i] != "JS-phoneInput") {
	            toOutput[util.toDatabase[i].substring(3, util.toDatabase[i].length).replace(/-/g, "")] = foundVal * 1;
	        } else {
	            toOutput[util.toDatabase[i].substring(3, util.toDatabase[i].length).replace(/-/g, "")] = foundVal;
	        }
	    }
	}
console.log(toOutput);
	var xhReq = new XMLHttpRequest();
	xhReq.open("POST", "Default.aspx/DoWork", true);
	xhReq.onreadystatechange = function() {
		console.log(JSON.parse(xhReq.status));
		if (xhReq.readyState != 4) {
			console.log({
				"error" : xhReq.readyState
			});
			return {
				"error" : xhReq.readyState
			};
		}
		var serverResponse = xhReq.responseText;
		console.log(JSON.parse(serverResponse));
	};
xhReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
console.log(JSON.stringify(toOutput));
console.log(JSON.stringify(toOutput).replace(/"/g, '\\"'));
var toWrite = { "input": JSON.stringify(toOutput) };
console.log(JSON.stringify(toWrite));
xhReq.send(JSON.stringify(toWrite));
	console.log(toOutput);
}

function toFixed(x) {
	if (Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split('e-')[1]);
		if (e) {
			x *= Math.pow(10, e - 1);
			x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
		}
	} else {
		var e = parseInt(x.toString().split('+')[1]);
		if (e > 20) {
			e -= 20;
			x /= Math.pow(10, e);
			x += (new Array(e + 1)).join('0');
		}
	}
	return x;
}
