"use strict";
var util = {
selectContains : {
	"" : "Select...",
	"USD" : "$ United States Dollars",
	"GBP" : "£ British Pounds",
	"EUR" : "€ Euros"
},
resultsDivs : ["JS-numTransactionOutput","JS-ATVOutput","JS-TurnoverOutput","JS-Occupancy","JS-Average-Days","JS-valueOutput","JS-upsellOutput"],
labels : ["Company Name", "Number of Rooms", "Currency", "Occupancy Rate","Average Number of Days Stayed","Average Room Rate", "Contact Name","Email Address","Contact Phone Number", "Number of Transactions : ","Average Transaction Value : ","Estimated Turnover : ","Value in minutes of 1 GBP : ","Number of Potential Upsells : "],
toDatabase  : ["JS-companyInput", "JS-number-of-rooms", "JS-currency","JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput","JS-numTransactionOutput","JS-ATVOutput","JS-TurnoverOutput","JS-valueOutput","JS-upsellOutput"],
formElements : ["JS-companyInput", "JS-number-of-rooms", "JS-currency","JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput"],
type : ["String", "Integer", "Currency","Float","Float","Float", "String", "Email", "Phone"],
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
mandatory : ["JS-number-of-rooms", "JS-currency", "JS-average-room-rate", "JS-Occupancy","JS-Average-Days"],
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
},
populateDiv : function(domName){
	//console.log(domName);
	var root = document.getElementById(domName);
	//for(var i = 0; i < root.length; i++){
		//util.addForm(root[i]);
//	}
	util.addForm(root);
},
isMandatory : function(isMand){
	for(var i = 0; i < util.mandatory.length; i++){
		var toFind = util.mandatory[i];
		if(util.mandatory[i] == "JS-currency"){
			toFind = "JS-selectCaps";
		}
		if(toFind == isMand){
			return true;
		}
	}
	return false;
},
addForm : function(domNode){
	//console.log(domNode);
	for(var i = 0; i < util.formElements.length; i++){
		var label = document.createElement("label");
		label.setAttribute("for",util.formElements[i]);
		label.innerHTML = util.labels[i];
		domNode.appendChild(label);
		if(util.type[i] != "Currency"){
			var input = document.createElement("input");
			if(util.isMandatory(util.formElements[i])){
				input.setAttribute("class","mandatory");
				input.setAttribute("className","mandatory");
			}
			input.setAttribute("type","text");
			input.setAttribute("id",util.formElements[i]);
			domNode.appendChild(input);
		}
		else{
			var container = document.createElement("div");
			if(util.isMandatory("JS-selectCaps")){
				container.setAttribute("class","mandatory");
				container.setAttribute("className","mandatory");
			}
			container.setAttribute("id","JS-selectCaps");
			var input = document.createElement("select");
			for(var key in util.selectContains){
				if(util.selectContains.hasOwnProperty(key)){
					var opt = document.createElement("option");
					opt.setAttribute("value",key);
					opt.innerHTML = util.selectContains[key];
					input.appendChild(opt);
				}
			}
			input.setAttribute("id",util.formElements[i]);
			//console.log(input);
			var dummyDiv = document.createElement("div");
			dummyDiv.setAttribute("id","JS-selectResponse");
			var responseText = document.createElement("div");
			responseText.setAttribute("id","JS-selectResponseText");
			responseText.innerHTML = util.selectContains[""];
			var dropImage = document.createElement("img");
			dropImage.setAttribute("src","images/WLPCalcdropdown.png");
			dropImage.setAttribute("id","JS-responseImg");
			dummyDiv.appendChild(responseText);
			dummyDiv.appendChild(dropImage);
			container.appendChild(dummyDiv);
			container.appendChild(input);
			domNode.appendChild(container);
		}
		var warningDiv = document.createElement("div");
		warningDiv.setAttribute("class","Warning Error");
		warningDiv.setAttribute("className","Warning Error");
		warningDiv.setAttribute("id",util.formElements[i]+"Error");
		domNode.appendChild(warningDiv);
	}
	util.addSubmit(domNode);
	util.addResults(domNode);
},
addSubmit:function(domNode){
	var submit = document.createElement("div");
	submit.setAttribute("class","submitSurround");
	submit.setAttribute("className","submitSurround");
	var subProper = document.createElement("div");
	subProper.setAttribute("id","submit");
	subProper.setAttribute("class","submitButton");
	subProper.setAttribute("className","submitButton");
	var divCeption = document.createElement("div");
	divCeption.innerHTML = "Submit";
	var clear = document.createElement("div");
	clear.setAttribute("id","JS-clear");
	clear.setAttribute("class","clearButton");
	clear.setAttribute("className","clearButton");
	var clearCeption = document.createElement("div");
	clearCeption.innerHTML = "Clear form";

	
	subProper.appendChild(divCeption);
	submit.appendChild(subProper);
	clear.appendChild(clearCeption);
	submit.appendChild(clear);
	domNode.appendChild(submit);
},
addResults:function(domNode){
	var divList = document.createElement("div");
	divList.setAttribute("class","queryResults");
	divList.setAttribute("className","queryResults");
	var queryHeader = document.createElement("div");
	queryHeader.setAttribute("class","resultsHeader");
	queryHeader.setAttribute("className","resultsHeader");
	queryHeader.innerHTML = "Results";
	var list = document.createElement("ul");
	for(var i = util.formElements.length; i < util.labels.length; i++){
		var listElement = document.createElement("li");
		var resLabel = document.createElement("div");
		if(util.resultsDivs[i-util.formElements.length] == "JS-valueOutput"){
			resLabel.setAttribute("id","JS-valueLabel");
		}
		resLabel.setAttribute("class","resultsLabel");
			resLabel.setAttribute("className","resultsLabel");
		resLabel.innerHTML = util.labels[i];
		var res = document.createElement("div");
		res.setAttribute("class","results");
				res.setAttribute("className","results");
		res.setAttribute("id",util.resultsDivs[i-util.formElements.length]);
		listElement.appendChild(resLabel);
		listElement.appendChild(res);
		list.appendChild(listElement);
	}
	divList.appendChild(queryHeader);
	divList.appendChild(list);
	domNode.appendChild(divList);
}
}
	var link = document.createElement('script');
	link.src = 'scripts/' + 'WLPCalcjson' + '.js';
	link.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(link);
 
	var link = document.createElement('script');
	link.src = 'scripts/' + 'WLPCalcmath' + '.js';
	link.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(link);
 