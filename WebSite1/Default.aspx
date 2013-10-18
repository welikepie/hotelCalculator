﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="_Default" %>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
<!DOCTYPE html>
  <html lang="en">
	<head>
		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta charset="utf-8" />
		<title>Hotel Calculator</title>
		<meta name="description" content="SIX Hotel Calculator" />
		<meta name="author" content="AMRoche, of WeLikePie Productions" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
		
		<link rel="stylesheet" href="styles/style.css"/>
		<link rel="shortcut icon" href="/favicon.ico" />
<!--[if IE 9]>
		  <style type="text/css">
		    #calculator .submitSurround .submitButton{
		       filter: none;
		    }
		    #calculator .submitSurround .submitButton:hover{
		       filter: none;
		    }
		  </style>
		<![endif]-->
<!--[if lte IE 7]>
	<style type="text/css">
		 *,*:before,*:after{
		  	-moz-box-sizing:border-box; *behavior: url(styles/boxsizing.htc);
		  -webkit-box-sizing:border-box; *behavior: url(styles/boxsizing.htc);
		  box-sizing:border-box; *behavior: url(styles/boxsizing.htc);
		  }
	</style>
<![endif]-->
	</head>
	<body>

		<div id="calculator">
			<label for="JS-companyInput">Company Name
			</label>
			<input type="text" id="JS-companyInput">
			<div class = "Warning Error" id="JS-companyInputError">
			</div>
			<label for="JS-number-of-rooms">Number of Rooms
			</label>
			<input type="text" class="mandatory" id="JS-number-of-rooms">
			<div class = "Warning Error" id="JS-number-of-roomsError">
			</div>
			<label for="JS-currency">Currency
			</label>
			<div class="mandatory" id="JS-selectCaps">
				<div id="JS-selectResponse">
					<div id="JS-selectResponseText">Select...</div>
					<img src="images/dropdown.png" id="JS-responseImg"></img>
				</div>
				<select id="JS-currency">
					<option value="">Select...</option>
					<option value="GBP">£ British Pounds</option>
					<option value="USD">$ United States Dollars</option>
					<option value="EUR">€ Euros</option>
				</select>
			</div>
			<div class = "Warning Error" id="JS-currencyError">
			</div>
			<label for="JS-average-room-rate">Average Room Rate (Per Night)
			</label>
			<input type="text" class="mandatory" id="JS-average-room-rate">
			<div class = "Warning Error" id="JS-average-room-rateError">
			</div>
			<label for="JS-contactInput">Contact Name
			</label>
			<input type="text" id="JS-contactInput">
			<div class = "Warning Error" id="JS-contactInputError">
			</div>
			<label for="JS-emailInput">Email Address
			</label>
			<input type="text" id="JS-emailInput">	
			<div class = "Warning Error" id="JS-emailInputError">
			</div>
			<label for="JS-phoneInput">Contact Phone Number
			</label>
			<input type="text" id="JS-phoneInput">
			<div class = "Warning Error" id="JS-phoneInputError">
			</div>
			<div class="submitSurround">
				<div class="submitButton" id="submit">
					<div>Submit</div>
				</div>
				<div class="clearButton" id="JS-clear">
					<div>Clear form</div>
				</div>
			</div>
			<div class="queryResults">
				<div class="resultsHeader">
					Results
				</div>
				<ul>
					<li><div class="resultsLabel">Number of Transactions : </div><div class="results" id="JS-numTransactionOutput"></div></li>
					<li><div class="resultsLabel">Average Transaction Value : </div><div class="results" id="JS-ATVOutput"></div></li>
					<li><div class="resultsLabel">Estimated Turnover : </div><div class="results" id="JS-TurnoverOutput"></div></li>
					<li><div class="resultsLabel" id="JS-valueLabel">Value in minutes of 1 GBP :  </div><div class="results" id="JS-valueOutput"></div></li>
					<li><div class="resultsLabel">Number of Potential Upsells : </div><div class="results" id="JS-upsellOutput"></div></li>
				</ul>
			</div>
		</div>
	</body>
	<footer>
		<script type="text/javascript" src="scripts/noConsole.js"></script>
		<script type="text/javascript" src="scripts/util.js"></script>
		<script type="text/javascript" src="scripts/math.js"></script>
		<script type="text/javascript" src="scripts/events.js"></script>

	</footer>

</html>
</asp:Content>