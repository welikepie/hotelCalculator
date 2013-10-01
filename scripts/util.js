"use strict";
var util = {
	formElements : ["JS-companyInput","JS-number-of-rooms", "JS-average-room-rate", "JS-contactInput", "JS-emailInput", "JS-phoneInput"],
	type : ["String","Integer","Float","String","Email","Integer"],
	mandatory : ["JS-number-of-rooms", "JS-average-room-rate"],
	inMandatory : function(input){
		for(var i = 0; i < util.mandatory.length; i++){
			if(util.mandatory[i] == input){
				return true;
			}
		}
		return false;
	},
	errorChecking : function(){
		var passed = true;
		if(util.formElements.length != util.type.length){
			alert("type and elements list are different lengths.");
			return false;
		}
		else{
			//console.log("///");
			for(var i = 0; i < util.formElements.length; i++){
				var toTest = document.getElementById(util.formElements[i]).value;
				if(util.type[i] == "String"){
					if(typeof toTest != "string" || toTest == ""){
						document.getElementById(util.formElements[i]+"Error").style.display = "inline";
						if(util.inMandatory(util.formElements[i]) == true){
							passed = false;
						}
					}
					else{
						document.getElementById(util.formElements[i]+"Error").style.display = "none";
					}
				}
				else if(util.type[i] == "Integer"){
					if(toTest % 1 != 0 || toTest == ""){
						document.getElementById(util.formElements[i]+"Error").style.display = "inline";
						if(util.inMandatory(util.formElements[i]) == true){
							passed = false;
						}
					}
					else{
						document.getElementById(util.formElements[i]+"Error").style.display = "none";
					}
				}
				else if(util.type[i] == "Float"){
					//regex a motherfucker for 0-9 and one .
					console.log(/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest));
					if(/[0-9]{1,}[.]{0,1}[0-9]{0,}/.test(toTest) == false){
						document.getElementById(util.formElements[i]+"Error").style.display = "inline";
						if(util.inMandatory(util.formElements[i]) == true){
							passed = false;
						}
					}	
					else{
						document.getElementById(util.formElements[i]+"Error").style.display = "none";
					}
				}
				else if(util.type[i] == "Email"){
					//regex ?
					//console.log(toTest);
					//console.log(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest)); 
					if(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(toTest) == false){
						document.getElementById(util.formElements[i]+"Error").style.display = "inline";
						if(util.inMandatory(util.formElements[i]) == true){
							passed = false;
						}
					}
					else{
						document.getElementById(util.formElements[i]+"Error").style.display = "none";
					}
					
				}
			}
		}
		return passed;
	}
}
