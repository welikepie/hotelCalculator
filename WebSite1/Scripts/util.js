"use strict";
var util = {
selectContains : {
	"" : "Select...",
	"USD" : "$ United States Dollars",
	"GBP" : "£ British Pounds",
	"EUR" : "€ Euros"
},
toDatabase: ["JS-companyInput", "JS-number-of-rooms", "JS-currency", "JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput", "JS-numTransactionOutput", "JS-ATVOutput", "JS-TurnoverOutput", "JS-valueOutput", "JS-upsellOutput"],
formElements : ["JS-companyInput", "JS-number-of-rooms", "JS-currency","JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput"],
type : ["String", "Integer", "Currency","Float", "String", "Email", "Phone"],
errorMessageEmpty : ["We'd love to know your company name.</div>",
"We'd love to know how many rooms you have.",
"We'd love to know which currency you're using!",
"We'd love to know the average room rate.",
"We'd love to know how to contact you (in a non-creepy way).",
"We'd love to know your email address (in a non-creepy way).",
"We'd love to your phone number (in a non-creepy way)."],
errorMessageWrongType : ["We'd much rather have your company name.",
"We'd much rather have a number here.",
"We'd much rather have a currency here.",
"We'd much rather have a number here.",
"We'd much rather have your contact name here.",
"We'd much rather have your email address here.",
"We'd much rather have your phone number here."],
onSuccessMessage : ["This looks much more like a company name.",
"This looks much more like how many rooms you have.",
"This looks just like a currency we can use.",
"This looks much more like your average room rate.",
"This looks much more like a name we could contact.",
"This looks much more like an email address.",
"This looks much more like a phone number."],
mandatory : ["JS-number-of-rooms", "JS-currency", "JS-average-room-rate"],
inMandatory : function(input) {
	for (var i = 0; i < util.mandatory.length; i++) {
		if (util.mandatory[i] == input) {
			return true;
		}
	}
	return false;
}, addSubmitListeners : function() {
	//		for(var i = 0; i < util.formElements.length; i++){
	document.getElementById(util.formElements[util.formElements.length - 1]).onkeypress = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) {
			var el = document.getElementById("submit");
			if (el.onclick) {
				el.onclick();
			} else if (el.click) {
				el.click();
			}
		}
	}
	//	}
}, addPermaListeners : function() {
	for (var i = 0; i < util.formElements.length; i++) {
		util.permaListen(document.getElementById(util.formElements[i]), i);
	}
}, permaListen : function(input,i) {
	if (input.tagName.toLowerCase() != "select") {
		input.onkeyup = function(e) {
			util.discreteTest(input.value, i);
		}
	} else {
		//input.onchange = util.discreteTest(input.value,i);
		input.onchange = function(e) {
			document.getElementById("JS-selectResponseText").innerHTML = util.selectContains[document.getElementById("JS-currency").value];
			util.discreteTest(input.value, i);
		}
	}
}, discreteTest : function(value, index) {
	var toTest = value;
	if (util.type[index] == "Phone") {
		var toText = 0;
		if (toTest.match(/[0-9+\-\(\)\[\],. ]{1,}/) != null) {
			toText = toTest.match(/[0-9+\-\(\)\[\],. ]{1,}/)[0].length;
		}
		if (toText != toTest.length || toTest == "" || /[a-zA-Z]{1,}/.test(toTest) == true) {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (/[a-zA-Z]{0,}/.test(toTest) == true) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	}
	if (util.type[index] == "Currency") {
		if (toTest == "" || toTest.length == 0) {
			document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	}
	if (util.type[index] == "String") {
		if ( typeof toTest != "string" || toTest == "") {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if ( typeof toTest != "string") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	} else if (util.type[index] == "Integer") {
		if (toTest % 1 != 0 || toTest == "") {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (toTest % 1 != 0) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	} else if (util.type[index] == "Float") {
		//regex a motherfucker for 0-9 and one .
		if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || toTest == "" || /[a-zA-Z]{1,}/.test(toTest) == true) {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || /[a-zA-Z]{1,}/.test(toTest) == true) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	} else if (util.type[index] == "Email") {
		//regex ?
		if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest) == false || toTest == "") {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest) == false) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").className = "Error Success";
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	}
	return true;

}, errorChecking : function() {
	var passed = true;
	if (util.formElements.length != util.type.length) {
		alert("type and elements list are different lengths.");
		return false;
	} else {
		for (var i = 0; i < util.formElements.length; i++) {
			if (util.discreteTest(document.getElementById(util.formElements[i]).value, i) == false) {
				passed = false;
			}

		}
		return passed;
	}
}
} 