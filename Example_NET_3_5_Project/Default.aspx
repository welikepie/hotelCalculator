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
       <div id="WLPcalculator"style="width:350px; height:px; overflow:hidden;">
			    <script type="text/javascript">
			        (function () {
			            var postOffTo = "Default.aspx/DoWork";
			            var scr = document.createElement("script");
			            scr.setAttribute("type", "text/javascript");
			            var inText = "var toPostTo = " + '"' + postOffTo + '";';
			            scr.text = inText;
			            document.getElementsByTagName('head')[0].appendChild(scr);
			            var link = document.createElement('script');
			            link.setAttribute("src", 'scripts/' + 'WLPCalcnoConsole' + '.js');
			            link.setAttribute("type", 'text/javascript');
			            document.getElementsByTagName('head')[0].appendChild(link);
			            var link = document.createElement('link');
			            link.href = 'styles/WLPCalccalculator.css';
			            link.rel = 'stylesheet';
			            document.getElementsByTagName('head')[0].appendChild(link);

			        })();
			    </script>
		    </div>
	</body>
</html>
</asp:Content>
