"use strict";
var util = {
	formElements : ["JS-companyInput", "JS-number-of-rooms", "JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput"],
	type : ["String", "Integer", "Float", "String", "Email", "Phone"],
	errorMessageEmpty : ["<strong>We're really sorry, this was left empty.</strong> We'd love to know your company name.", "<strong>We're really sorry, this was left empty.</strong> We'd love to know how many rooms you have.", "<strong>We're really sorry, this was left empty.</strong> We'd love to know the average room rate.", "<strong>We're really sorry, this was left empty.</strong> We'd love to know how to contact you (in a non-creepy way).", "<strong>We're really sorry, this was left empty.</strong> We'd love to know your email address (in a non-creepy way).", "<strong>We're really sorry, this was left empty.</strong> We'd love to your phone number (in a non-creepy way)."],
	errorMessageWrongType : ["<strong>We didn't expect this.</strong> We'd much rather have your company name.", "<strong>We didn't expect this.</strong> We'd much rather have a number here.", "<strong>We didn't expect this.</strong> We'd much rather have a number here.", "<strong>We didn't expect this.</strong> We'd much rather have your contact name here.", "<strong>We didn't expect this.</strong> We'd much rather have your email address here.", "<strong>We didn't expect this.</strong> We'd much rather have your phone number here."],
	onSuccessMessage : ["<strong>Huzzah!</strong> This looks much more like a company name.", "<strong>Huzzah!</strong> This looks much more like how many rooms you have.", "<strong>Huzzah!</strong> This looks much more like your average room rate.", "<strong>Huzzah!</strong> This looks much more like a name we could contact.", "<strong>Huzzah!</strong> This looks much more like an email address.", "<strong>Huzzah!</strong> This looks much more like a phone number."],
	mandatory : ["JS-number-of-rooms", "JS-average-room-rate"],
	inMandatory : function(input) {
		for (var i = 0; i < util.mandatory.length; i++) {
			if (util.mandatory[i] == input) {
				return true;
			}
		}
		return false;
	},
	addSubmitListeners : function(){
//		for(var i = 0; i < util.formElements.length; i++){
			document.getElementById(util.formElements[util.formElements.length-1]).onkeypress = function(e){
				e = e || window.event;
				if(e.keyCode==13){
					var el = document.getElementById("submit");
					if (el.onclick) {
					   el.onclick();
					} else if (el.click) {
					   el.click();
					}
				}
			}	
	//	}
	},
	addPermaListeners : function(){
		for(var i = 0; i < util.formElements.length; i++){
			util.permaListen(document.getElementById(util.formElements[i]),i);
		}
	},
	permaListen : function(input,i){
		console.log(i);
			input.onkeyup = function(e){
				util.discreteTest(input.value,i);
			}		
	},
	discreteTest : function(value, index) {
		var toTest = value;
		if (util.type[index] == "Phone") {
			var toText = 0;
			if(toTest.match(/[0-9+\-\(\)\[\],. ]{1,}/)!=null){
				//console.log(
					toText = toTest.match(/[0-9+\-\(\)\[\],. ]{1,}/)[0].length;
					console.log(toText+","+toTest.length);
					//);
			}
			if ( toText != toTest.length || toTest == "" || /[a-zA-Z]{1,}/.test(toTest) == true) {
				if (toTest == "") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageEmpty[index];
				} else if (/[a-zA-Z]{0,}/.test(toTest) == true) {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageWrongType[index];
				}
				document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				if (util.inMandatory(util.formElements[index]) == true) {
					return false;
				}
			} else {
				if(document.getElementById(util.formElements[index] + "Error").style.display != "none"){
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.onSuccessMessage[index];
					document.getElementById(util.formElements[index] + "Error").className = "Error Success";
				}else{
					document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}
			}
		}
		if (util.type[index] == "String") {
			if ( typeof toTest != "string" || toTest == "") {
				if (toTest == "") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageEmpty[index];
				} else if ( typeof toTest != "string") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageWrongType[index];
				}
				document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				if (util.inMandatory(util.formElements[index]) == true) {
					return false;
				}
			} else {
				if(document.getElementById(util.formElements[index] + "Error").style.display != "none"){
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.onSuccessMessage[index];
					document.getElementById(util.formElements[index] + "Error").className = "Error Success";
				}else{
					document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}
			}
		} else if (util.type[index] == "Integer") {
			if (toTest % 1 != 0 || toTest == "") {
				if (toTest == "") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageEmpty[index];
				} else if (toTest % 1 != 0) {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageWrongType[index];
				}
				document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				if (util.inMandatory(util.formElements[index]) == true) {
					return false;
				}
			} else {
				if(document.getElementById(util.formElements[index] + "Error").style.display != "none"){
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.onSuccessMessage[index];
					document.getElementById(util.formElements[index] + "Error").className = "Error Success";
				}else{
					document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}
			}
		} else if (util.type[index] == "Float") {
			//regex a motherfucker for 0-9 and one .
			if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || toTest == "" || /[a-zA-Z]{1,}/.test(toTest) == true ) {
				if (toTest == "") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageEmpty[index];
				} else if (/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false || /[a-zA-Z]{1,}/.test(toTest) == true) {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageWrongType[index];
				}
				document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				if (util.inMandatory(util.formElements[index]) == true) {
					return false;
				}
			} else {
				if(document.getElementById(util.formElements[index] + "Error").style.display != "none"){
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.onSuccessMessage[index];
					document.getElementById(util.formElements[index] + "Error").className = "Error Success";
				}else{
					document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}
			}
		} else if (util.type[index] == "Email") {
			//regex ?
			if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest) == false || toTest == "") {
				if (toTest == "") {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageEmpty[index];
				} else if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest) == false) {
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.errorMessageWrongType[index];
				}
				document.getElementById(util.formElements[index] + "Error").className = "Error Warning";
				document.getElementById(util.formElements[index] + "Error").style.display = "inline";
				if (util.inMandatory(util.formElements[index]) == true) {
					return false;
				}
			} else {
				if(document.getElementById(util.formElements[index] + "Error").style.display != "none"){
					document.getElementById(util.formElements[index] + "Error").innerHTML = util.onSuccessMessage[index];
					document.getElementById(util.formElements[index] + "Error").className = "Error Success";
				}else{
					document.getElementById(util.formElements[index] + "Error").style.display = "none";
				}
			}
		}
		return true;

	},
	errorChecking : function() {
		var passed = true;
		if (util.formElements.length != util.type.length) {
			alert("type and elements list are different lengths.");
			return false;
		} else {
			for (var i = 0; i < util.formElements.length; i++) {
				console.log(util.discreteTest(document.getElementById(util.formElements[i]).value, i));
				if(util.discreteTest(document.getElementById(util.formElements[i]).value, i)==false){
					passed = false;
				}
				
			}
			return passed;
		}
	}
} 