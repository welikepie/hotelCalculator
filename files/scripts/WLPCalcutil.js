"use strict";
var util = {
selectContains : {
	"" : "Select...",
	"USD" : "$ United States Dollars",
	"GBP" : "£ British Pounds",
	"EUR" : "€ Euros",
	"CHF" : "SFr. Swiss Franc"
},//test
exText : "<h1>And the hat. She's a witch!</h1> How do you know she is a witch? I don't want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! We shall say 'Ni' again to you, if you do not appease us. Bring her forward!",
resultsDivs : ["JS-numTransactionOutput","JS-ATVOutput","JS-TurnoverOutput","JS-valMinuteOutput","JS-valueOutput","JS-upsellOutput"],
labels : ["Number of Rooms", "Currency", "Average Room Rate","Occupancy Rate","Average Number of Days Stayed",
"Daily Number of Transactions: ",
"Average Transaction Value <span class=\"subheading\">(with additional purchases included)</span>: ",
"Estimated Daily Turnover: ",
"Value of Each Minute <span class=\"subheading\">(based on 8 hours of activity on the front desk)</span>: ",
"Potential Time Savings per Year <span class=\"subheading\">(using DCC and advanced card payment technologies)</span>: ",
"Number of Potential Upsells per Year <span class=\"subheading\">(based on an average upsell time of 2 minutes)</span>: "
],
toDatabase  : ["JS-number-of-rooms", "JS-currency","JS-average-room-rate", "JS-numTransactionOutput","JS-ATVOutput","JS-TurnoverOutput","JS-valueOutput","JS-upsellOutput"],
formElements : ["JS-number-of-rooms", "JS-currency","JS-average-room-rate","JS-occupancy","JS-averageDays"],
type : ["Integer", "Currency","Float", "Percent","Float"],
errorMessageEmpty : ["We'd love to know how many rooms you have.",
"We'd love to know which currency you're using!",
"We'd love to know the average room rate.",
"We'd love to know average room occupancy.",
"We'd love to know how long people stay for."],
errorMessageWrongType : [
"We'd much rather have a number here.",
"We'd much rather have a currency here.",
"We'd much rather have a number here.",
"We'd much rather have a percentage here.",
"We'd much rather have a number here."],
onSuccessMessage : [
"This looks much more like a number of rooms.",
"This looks just like a currency we can use.",
"This looks much more like a room rate.",
"This looks like an average occupancy.",
"This looks much more like average days."],
invalidValue : [
"We'd love a value more than zero.","","We'd love a value more than zero.","We'd love a value between 1 and 100.","We'd love a value more than zero."
],
mandatory : ["JS-number-of-rooms", "JS-currency", "JS-average-room-rate", "JS-occupancy","JS-averageDays"],
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
	if (util.type[index] == "Percent") {
		if (toTest % 1 != 0 || toTest == "" || parseFloat(toTest,10) > 100 || parseFloat(toTest,10) ==0) {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (toTest % 1 != 0 ) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}
			else if (parseFloat(toTest,10) > 100 || parseFloat(toTest,10) ==0){
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.invalidValue[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Warning");

			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
				document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Success");
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	}
	/*if(util.type[index] == "Percent"){
		console.log(parseFloat(toTest.replace("%", "").replace(/\s/g,""),10));
		if(toTest.length > 0 && /[a-zA-Z]{1,}/.test(toTest) == false){
			if(toTest.indexOf("%")>0 && parseFloat(toTest.replace("%", "").replace(/\s/g,""),10) >= 0 && parseFloat(toTest.replace("%", "").replace(/\s/g,""),10) <= 100 ){
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
			}
			else{
				try{
				parseFloat(toTest,10);
				if(parseFloat(toTest,10) > 0 && parseFloat(toTest,10)<100){
				if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
				} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}


			}
			else{
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className" , "Error Warning");
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				return false;
			}
				}
				catch(e){
					document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
					document.getElementById(util.formElements[index] + "Error").setAttribute("className" , "Error Warning");
					document.getElementById(util.formElements[index] + "Error").style.display = "inline";
					return false;
					console.log(e);
				}
			}
		}else{
			document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			document.getElementById(util.formElements[index] + "Error").setAttribute("className", "Error Warning");
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			return false;
		}
	}*/
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
			document.getElementById(util.formElements[index] + "Error").setAttribute("className" , "Error Warning");
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className" , "Error Success");
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	}
	if (util.type[index] == "Currency") {
		if (toTest == "" || toTest.length == 0) {
			document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Warning");
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className", "Error Success");
				document.getElementById(util.formElements[index] + "Error").setAttribute("class", "Error Success");
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
			document.getElementById(util.formElements[index] + "Error").setAttribute("className", "Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class", "Error Warning");

			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Success");
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	} else if (util.type[index] == "Integer") {
		if (toTest % 1 != 0 || toTest == "" || parseFloat(toTest,10) == 0) {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (toTest % 1 != 0) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			}else if (parseFloat(toTest,10) == 0){
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.invalidValue[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Warning");

			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
				document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Success");
			} else {
				document.getElementById(util.formElements[index] + "Error").style.display = "none";
			}
		}
	} else if (util.type[index] == "Float") {
		//regex for 0-9 and one .
		if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || toTest == "" || /[a-zA-Z]{1,}/.test(toTest) == true || parseFloat(toTest,10)==0) {
			if (toTest == "") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageEmpty[index] + "</div>";
			} else if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || /[a-zA-Z]{1,}/.test(toTest) == true) {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.errorMessageWrongType[index] + "</div>";
			} else if (parseFloat(toTest,10)==0){
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='fail'></div><div class='message'>" + util.invalidValue[index] + "</div>";
			}
			document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Warning");
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
				document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Success");
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
			document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Warning");
			document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Warning");
			document.getElementById(util.formElements[index] + "Error").style.display = "inline";
			if (util.inMandatory(util.formElements[index]) == true) {
				return false;
			}
		} else {
			if (document.getElementById(util.formElements[index] + "Error").style.display != "none") {
				document.getElementById(util.formElements[index] + "Error").innerHTML = "<div class='succ'></div><div class='message'>" + util.onSuccessMessage[index] + "</div>";
				document.getElementById(util.formElements[index] + "Error").setAttribute("className","Error Success");
				document.getElementById(util.formElements[index] + "Error").setAttribute("class","Error Success");
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
	var JSSHOW1 = document.createElement("div");
	JSSHOW1.setAttribute("class","JS-show");
	JSSHOW1.setAttribute("className","JS-show");
	JSSHOW1.setAttribute("id","JS-show1");
	var JSSHOW2 = document.createElement("div");
	JSSHOW2.setAttribute("class","JS-show");
	JSSHOW2.setAttribute("className","JS-show");
	JSSHOW2.setAttribute("id","JS-show2");
	var JSSHOW3 = document.createElement("div");
	JSSHOW3.setAttribute("class","JS-show");
	JSSHOW3.setAttribute("className","JS-show");
	JSSHOW3.setAttribute("id","JS-show3");
	for(var i = 0; i < util.formElements.length; i++){
		var label = document.createElement("label");
		label.setAttribute("for",util.formElements[i]);
		label.innerHTML = util.labels[i];
		JSSHOW1.appendChild(label);
		if(util.type[i] == "Percent"){
			var input = document.createElement("input");
			if(util.isMandatory(util.formElements[i])){
				input.setAttribute("class","mandatory");
				input.setAttribute("className","mandatory");
			}
			input.setAttribute("type","text");
			input.setAttribute("id",util.formElements[i]);
			JSSHOW1.appendChild(input);
			var percentSign = document.createElement("span");
			percentSign.innerHTML = "%";
			percentSign.setAttribute("id","percentSign");
			JSSHOW1.appendChild(percentSign);
		}
		else if(util.type[i] != "Currency"){
			var input = document.createElement("input");
			if(util.isMandatory(util.formElements[i])){
				input.setAttribute("class","mandatory");
				input.setAttribute("className","mandatory");
			}
			input.setAttribute("type","text");
			input.setAttribute("id",util.formElements[i]);
			JSSHOW1.appendChild(input);
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
			JSSHOW1.appendChild(container);
		}
		var warningDiv = document.createElement("div");
		warningDiv.setAttribute("class","Warning Error");
		warningDiv.setAttribute("className","Warning Error");
		warningDiv.setAttribute("id",util.formElements[i]+"Error");
		JSSHOW1.appendChild(warningDiv);
	}
	util.addSubmit(JSSHOW1);
	util.addResults(JSSHOW3);
	util.addExplanatory(JSSHOW1,false,false);
	util.addExplanatory(JSSHOW3,false,true);
	util.addLoader(JSSHOW2);
	domNode.appendChild(JSSHOW1);
	domNode.appendChild(JSSHOW2);
	domNode.appendChild(JSSHOW3);
},
addLoader: function(domNode){
	var image = document.createElement("img");
	image.id="loaderImage";
	image.src="images/loader.gif";
	domNode.appendChild(image);
	var heading = document.createElement("div");
	heading.id="loaderHead";
	heading.innerHTML = "Calculating Results" ;
	domNode.appendChild(heading);
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
	divCeption.innerHTML = "Calculate your results";
	subProper.appendChild(divCeption);
	submit.appendChild(subProper);
	domNode.appendChild(submit);
},
addResults:function(domNode){
	var divList = document.createElement("div");
	divList.setAttribute("class","queryResults");
	divList.setAttribute("className","queryResults");
	var queryHeader = document.createElement("div");
	queryHeader.setAttribute("class","resultsHeader");
	queryHeader.setAttribute("className","resultsHeader");
	queryHeader.innerHTML = "<h3>Your Results</h3>";
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
},
"addExplanatory" : function(domNode,text,button){
if(text == true){
	var ExText = document.createElement("div");
	ExText.innerHTML = util.exText;
	ExText.setAttribute("className","exText");
	ExText.setAttribute("class","exText");
	domNode.appendChild(ExText);
}
if(button == true){
	var clear = document.createElement("div");
	clear.setAttribute("id","JS-clear");
	clear.setAttribute("class","submitButton");
	clear.setAttribute("className","submitButton");
	clear.onclick = JSClear;
	var clearCeption = document.createElement("div");
	clearCeption.innerHTML = "Start again";
	clear.appendChild(clearCeption);
	var surrounder = document.createElement("div");
	surrounder.setAttribute("class","submitSurround");
	surrounder.setAttribute("className","submitSurround");
	surrounder.appendChild(clear);
	domNode.appendChild(surrounder);
}
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
 