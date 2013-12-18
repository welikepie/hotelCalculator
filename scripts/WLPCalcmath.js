//PERCENTAGES ARE EXPRESSED AS DECIMAL POINTS BECAUSE MATHEMAGICS.
//v is variable object.
//f is function object.
//c is the currency object.
"use strict";
var v = {
	CURRENCY : "GBP",
	//---------------------------
	NUMBER_OF_ROOMS : null,
	OCCUPANCY : 0.75,
	AVERAGE_STAY : 1.5,
	TRANSACTIONS_PER_DAY : null,
	//----------------------------
	AVERAGE_ROOM_RATE : null,
	EXTRAS : 1.25,
	AVERAGE_TRANSACTION_VALUE : null,
	//-----------------------------
	NUMBER_OF_TRANSACTIONS_PER_DAY : null,
	TURNOVER : null,
	//-----------------------------
	VISA_AND_MASTERCARD_TRANSACTIONS : 0.65,
	FOREIGN_CARD : 0.5, //Percentage of card which originate in a country which does not have the same currency as the hotel.
	DCC_ACCEPTANCE : 0.5, //Number of people who agreed to be charged at a hotel in another country.
	COST_BENEFIT : 0.013, //This is the coefficient we apply to the value in GBP of the transactions that were accepted in DCC to calculate the amount we reimburse to the hotel.
	TOTAL_BENEFIT_PA : null,

	TIME_SAVING_MINUTES : 0.5,
	WORKING_MINUTES_IN_YEAR : 115200,
	YEARLY_TIME_SAVING_YEARS : null, //in years, apparently. Who'd've thunk.

	COST_OF_MANPOWER : 31200, //cost of manpower per person, per year. That looks about right for that number.
	VALUE_SAVING_IN_CURRENCY : null,
	//-----------------------------------------
	MINUTES_ON_DESK_IN_DAY : 480,
	VALUE_OF_EACH_MIN : null,
	//-----------------------------------------
	WEEKS_IN_YEAR : 48,
	HOURS_IN_WEEK : 40,
	MINUTES_IN_HOUR : 60, //change the constants of time itself. I dare you.
	VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY : null,
	//-----------------------------------------
	TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES : null,
	ASSUMED_TIME_FOR_UPSELL : 2,
	NUMBER_OF_UPSELLS : null
}
var c = {//currency exchange rates from pounds. Accurate as of 15/11/13 at 10:30am from XE.com
	toUSDfromPOUNDS : 0.622535,
	toEURfromPOUNDS : 0.836894,
	toCHFfromPOUNDS : 0.677658,
	toUSD : function(input) {
		return input / c.toUSDfromPOUNDS;
	},
	toEUR : function(input) {
		return input / c.toEURfromPOUNDS;
	},
	toCHF : function(input){
		return input/ c.toCHFfromPOUNDS;
	},
	fromUSD : function(input) {
		return input * c.toUSDfromPOUNDS;
	},
	fromEUR : function(input) {
		return input * c.toEURfromPOUNDS;
	},
	fromCHF : function(input){
		return input * c.toCHFfromPOUNDS;
	}
}
var f = {
	NUMBER_OF_TRANSACTIONS_PER_DAY : function() {
		try {
//			if(document.getElementById("JS-occupancy").value.indexOf("%")>0){
//			v.OCCUPANCY = parseFloat(document.getElementById("JS-occupancy").value.replace("%","").replace(/\s/g,""),10);
//			}else if(parseFloat(document.getElementById("JS-occupancy").value.replace("%","").replace(/\s/g,""),10) > 1){
			v.OCCUPANCY = parseFloat(document.getElementById("JS-occupancy").value.replace("%","").replace(/\s/g,""),10)/100;
//			}else{
//				v.OCCUPANCY = parseFloat(document.getElementById("JS-occupancy").value.replace("%","").replace(/\s/g,""),10);
//			}
			v.AVERAGE_STAY = parseFloat(document.getElementById("JS-averageDays").value.replace("%","").replace(/\s/g,""),10); 
			v.NUMBER_OF_TRANSACTIONS_PER_DAY = (v.NUMBER_OF_ROOMS * v.OCCUPANCY) / v.AVERAGE_STAY;
			return true;
		} catch(e) {
			console.log(e);
			return false;
		}
	},
	AVERAGE_TRANSACTION_VALUE : function() {
		try {
			if (v.CURRENCY != "GBP") {
				if (v.CURRENCY == "EUR") {
				//	v.AVERAGE_ROOM_RATE = c.fromEUR(v.AVERAGE_ROOM_RATE);
				}
				if (v.CURRENCY == "USD") {
				//	v.AVERAGE_ROOM_RATE = c.fromUSD(v.AVERAGE_ROOM_RATE);
				}
			}
			//alert(v.AVERAGE_ROOM_RATE);
			v.AVERAGE_TRANSACTION_VALUE = (v.AVERAGE_ROOM_RATE * v.AVERAGE_STAY) * v.EXTRAS;
				return true;

		} catch(e) {
			console.log(e);
			return false;
		}
	},
	TURNOVER : function() {
		try {
			v.TURNOVER = v.NUMBER_OF_TRANSACTIONS_PER_DAY * v.AVERAGE_TRANSACTION_VALUE;
				return true;

		} catch(e) {
			console.log(e);
			return false;
		}
		return true;
	},
	VALUE_SAVING_IN_MINUTES_OF_ONE_CURRENCY : function() {
		try {
			v.TOTAL_BENEFIT_PA = v.TURNOVER * v.VISA_AND_MASTERCARD_TRANSACTIONS * v.FOREIGN_CARD * v.DCC_ACCEPTANCE * v.COST_BENEFIT;
			//alert(v.TOTAL_BENEFIT_PA);
			var temp = v.COST_OF_MANPOWER;
			if (v.CURRENCY != "GBP") {
				if (v.CURRENCY == "EUR") {
					temp = c.fromEUR(v.COST_OF_MANPOWER);
				}
				if (v.CURRENCY == "USD") {
					temp = c.fromUSD(v.COST_OF_MANPOWER);
				}
				if (v.CURRENCY == "CHF"){
					temp = c.fromCHF(v.COST_OF_MANPOWER);
				}
			}
			v.YEARLY_TIME_SAVING_YEARS = (v.NUMBER_OF_TRANSACTIONS_PER_DAY * v.TIME_SAVING_MINUTES) / v.WORKING_MINUTES_IN_YEAR;
			v.VALUE_SAVING_IN_CURRENCY = temp * v.YEARLY_TIME_SAVING_YEARS;
			v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY = v.VALUE_SAVING_IN_CURRENCY / v.WEEKS_IN_YEAR / v.HOURS_IN_WEEK / v.MINUTES_IN_HOUR;
		return true;

		} catch(e) {
			console.log(e);
			return false;
		}
	},
	DCC_BENEFIT_IN_MINUTES : function(){
		try{
			v.TOTAL_BENEFIT_PA = v.TURNOVER * v.VISA_AND_MASTERCARD_TRANSACTIONS * v.FOREIGN_CARD * v.DCC_ACCEPTANCE * v.COST_BENEFIT;
			//alert(v.TOTAL_BENEFIT_PA);
			var temp = v.COST_OF_MANPOWER;
			if (v.CURRENCY != "GBP") {
				if (v.CURRENCY == "EUR") {
					temp = c.fromEUR(v.COST_OF_MANPOWER);
				}
				if (v.CURRENCY == "USD") {
					temp = c.fromUSD(v.COST_OF_MANPOWER);
				}
				if (v.CURRENCY == "CHF"){
					temp = c.fromCHF(v.COST_OF_MANPOWER);
				}
			}
			v.YEARLY_TIME_SAVING_YEARS = (v.NUMBER_OF_TRANSACTIONS_PER_DAY * v.TIME_SAVING_MINUTES) / v.WORKING_MINUTES_IN_YEAR;
			v.VALUE_SAVING_IN_CURRENCY = temp * v.YEARLY_TIME_SAVING_YEARS;
			v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY = v.VALUE_SAVING_IN_CURRENCY / v.WEEKS_IN_YEAR / v.HOURS_IN_WEEK / v.MINUTES_IN_HOUR;
			v.TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES = (v.TOTAL_BENEFIT_PA/365)/v.VALUE_SAVING_PER_MINUTE_OF_1_CURRENCY ;
		return true;
		}
		catch(e){
			console.log(e.stack);
		}
	},
	VALUE_OF_EACH_MINUTE : function(){
		try{
		v.VALUE_OF_EACH_MIN = v.TURNOVER / v.MINUTES_ON_DESK_IN_DAY;
		} catch(e){
			console.log(e.stack);
			return false;
		}
		return true;
	},
	NUMBER_OF_UPSELLS : function() {
		try {
			v.NUMBER_OF_UPSELLS = v.TIME_EQUIVALENT_OF_DCC_BENEFIT_IN_MINUTES / v.ASSUMED_TIME_FOR_UPSELL;
			v.NUMBER_OF_UPSELLS = Math.ceil(v.NUMBER_OF_UPSELLS/365);
			//alert(v.ASSUMED_TIME_FOR_UPSELL);
			return true;
		} catch(e) {
			console.log(e.stack);
			return false;
		}
		return true;
	}
}
var u = {
	parseTime : function(input){
		var toUse = parseInt(input,10);
		//console.log(toUse);
		var x = toUse / 1000;
		var seconds = Math.floor(x % 60);
		x /= 60;
		var minutes = Math.floor(x % 60);
		x /= 60;
		var hours = Math.floor(x % 24);
		x /= 24;
		var days = Math.floor(x);
		return {"days":commaformat(days.toString()),"hours":hours,"minutes":minutes,"seconds":seconds};		
	}
}

							var link = document.createElement('script');
							link.src = 'scripts/' + 'WLPCalcevents' + '.js';
							link.type = 'text/javascript';
							document.getElementsByTagName('head')[0].appendChild(link);
