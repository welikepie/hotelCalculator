"use strict";
//var loadEmUp = function(toPostTo) {
	
	util.populateDiv("WLPcalculator");
	util.addSubmitListeners();
	document.getElementById("JS-currency").onchange = function() {
		document.getElementById("JS-selectResponseText").innerHTML = util.selectContains[document.getElementById("JS-currency").value];
	}
	//	<div id="JS-selectResponse">Select...</div>
	//				<select id="JS-currency">
var DURATION_LOADING = 500;
var addedListeners = false;
function JSClear() {
		document.getElementById("JS-show3").style.display="none";
		document.getElementById("JS-show3").style.visibility="hidden";
		document.getElementById("JS-show1").style.display="inline";
		document.getElementById("JS-show1").style.visibility="visible";

	for (var i = 0; i < util.formElements.length; i++) {
		document.getElementById(util.formElements[i]).value = "";
		document.getElementById(util.formElements[i] + "Error").style.display = "none";
	}
		document.getElementById("JS-numTransactionOutput").innerHTML = "";
		document.getElementById("JS-ATVOutput").innerHTML = "";
		document.getElementById("JS-TurnoverOutput").innerHTML = "";
		document.getElementById("JS-valueOutput").innerHTML = "";
		document.getElementById("JS-upsellOutput").innerHTML = "";
		document.getElementById("JS-valMinuteOutput").innerHTML = "";
		document.getElementById("JS-valMinuteOutput").value = "";
		document.getElementById("JS-numTransactionOutput").value = "";
		document.getElementById("JS-ATVOutput").value = "";
		document.getElementById("JS-TurnoverOutput").value = "";
		document.getElementById("JS-valueOutput").value = "";
		document.getElementById("JS-upsellOutput").value = "";

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
			document.getElementById("JS-numTransactionOutput").value = v.NUMBER_OF_TRANSACTIONS_PER_DAY;
		} else {
			console.log("f.NUMBER_OF_TRANSACTIONS_PER_DAY failed.");
		}
		if (f.AVERAGE_TRANSACTION_VALUE() == true) {
			document.getElementById("JS-ATVOutput").innerHTML = v.AVERAGE_TRANSACTION_VALUE.toFixed(2) + " " + v.CURRENCY;
			document.getElementById("JS-ATVOutput").value = v.AVERAGE_TRANSACTION_VALUE.toFixed(2);
		} else {
			console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
		}
		if (f.TURNOVER() == true) {
			document.getElementById("JS-TurnoverOutput").innerHTML = v.TURNOVER.toFixed(2) +" "+v.CURRENCY;
			document.getElementById("JS-TurnoverOutput").value = v.TURNOVER.toFixed(2);
		}//VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY
		else {
			console.log("f.TURNOVER failed.");
		}
/*		if (f.VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY() == true) {

			var temp = TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES.toFixed(2);
			for (var i = 0; i < temp.length; i++) {
				if (temp.charAt(i) != "0" && temp.charAt(i) != ".") {
					temp = temp.substring(0, i + 2);
					break;
				}
			}
			document.getElementById("JS-valueLabel").innerHTML = "Value in minutes of 1 " + v.CURRENCY + " : ";
			document.getElementById("JS-valueOutput").innerHTML = temp + " minutes.";
			document.getElementById("JS-valueOutput").value = temp;
		}//*/
		if(f.DCC_BENEFIT_IN_MINUTES() == true){
			var temp = (u.parseTime(Math.ceil(v.TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES *1000)));
			//var temp = Math.ceil(v.TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES);
			//document.getElementById("JS-valueOutput").innerHTML = temp.days+" days, "+temp.hours+" hours.";
			var toWrite = "";
			var order=["days","hours","minutes","seconds"]
			var firstKey = "";
			for(var key in temp){
				if(temp[key] > 0 && firstKey==""){
					firstKey = key;
				}
				if(key=="seconds" && firstKey == ""){
					firstKey = "seconds";
				}
				if(firstKey != ""){
					console.log(temp.key);
					if(order.indexOf(key)-1 <= order.indexOf(firstKey)){
						if(toWrite.length > 0){
							toWrite+=", ";
						}
						if(temp[key]>1 || temp[key]==0){
							toWrite+=temp[key]+" "+key;
						}else{
							toWrite+=temp[key]+" "+key.substring(0,key.length-1);
						}
					}
				}
			}
			document.getElementById("JS-valueOutput").innerHTML = toWrite;
			document.getElementById("JS-valueOutput").value = Math.ceil(v.TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES *1000);
		}
		else {
			console.log("f.AVERAGE_TRANSACTION_VALUE failed.");
		}
		if(f.VALUE_OF_EACH_MINUTE() == true){
			document.getElementById("JS-valMinuteOutput").innerHTML = v.VALUE_OF_EACH_MIN.toFixed(2) + " "+v.CURRENCY;
			document.getElementById("JS-valMinuteOutput").value = v.VALUE_OF_EACH_MIN.toFixed(2);
		}
		if (f.NUMBER_OF_UPSELLS() == true) {
			document.getElementById("JS-upsellOutput").innerHTML = Math.ceil(v.NUMBER_OF_UPSELLS);
			document.getElementById("JS-upsellOutput").value = Math.ceil(v.NUMBER_OF_UPSELLS);
		} else {
			console.log("f.NUMBER_OF_UPSELLS");
		}
		//alert("submitted to le database");
		//pushToDatabase();
	document.getElementById("JS-show1").style.display="none";
	document.getElementById("JS-show1").style.visibility="hidden";
	console.log(document.getElementById("JS-show2"));
	document.getElementById("JS-show2").style.display="inline";
	document.getElementById("JS-show2").style.visibility="visible";
	window.setTimeout(function(){
		document.getElementById("JS-show2").style.display="none";
		document.getElementById("JS-show2").style.visibility="hidden";
		document.getElementById("JS-show3").style.display="inline";
		document.getElementById("JS-show3").style.visibility="visible";
	},DURATION_LOADING);
	}
	

}
function pushToDatabase() {
	/*var toOutput = {};
	for (var i = 0; i < util.toDatabase.length; i++) {
		var foundVal = document.getElementById(util.toDatabase[i]).value;
		    //console.log(util.toDatabase[i]);
			//console.log(foundVal);
		if (foundVal != "") {
			if (!isNaN(foundVal * 1) && util.toDatabase[i]!= "JS-phoneInput") {
				toOutput[util.toDatabase[i].substring(3, util.toDatabase[i].length).replace(/-/g,"")] = foundVal * 1;
			} else {
				toOutput[util.toDatabase[i].substring(3, util.toDatabase[i].length).replace(/-/g,"")] = foundVal;
			}
		}
}
console.log(toOutput);
	var xhReq = new XMLHttpRequest();
	xhReq.open("POST", toPostTo, true);
	xhReq.onreadystatechange = function() {
		//console.log(JSON.parse(xhReq.status));
		if (xhReq.readyState != 4) {
			console.log({
				"error" : xhReq.readyState
			});
			return {
				"error" : xhReq.readyState
			};
		}
		var serverResponse = xhReq.responseText;
		try{console.log(JSON.parse(serverResponse));}catch(e){
		}
	};
xhReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
console.log(JSON.stringify(toOutput));
console.log(JSON.stringify(toOutput).replace(/"/g, '\\"'));
var toWrite = { "input": JSON.stringify(toOutput) };
console.log(JSON.stringify(toWrite));
xhReq.send(JSON.stringify(toWrite));
	console.log(toOutput);
	*/
}


//}

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

