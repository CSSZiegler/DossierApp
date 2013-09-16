
/**
 * countries list
 *
 */


var gcountries = [
["select_country", "Select Country"],["AF", "Afghanistan"],["AL", "Albania"],["DZ" , "Algeria"],["AD", "Andorra"],["AO", "Angola"],["AI", "Anguilla"],["AG","Antigua&Barbuda"],["AM", "Armenia"],["AR", "Argentina"],["AW","Aruba"],["AU", "Australia"],["AT", "Austria"],["AZ","Azerbaijan"],
["BS","Bahamas"],["BH", "Bahrain"],["BB","Barbados"],["BD","Bangladesh"],["BY","Belarus"],["BZ","Belize"],["BE","Belgium"],["BM", "Bermuda"],["BJ" ,"Benin"],["BT","Bhutan"],["BR", "Brazil"],["BN","Brunei"],["BO", "Bolivia"],["BW", "Botswana"],["BA","Bosnia-Herzegovina"],["BF", "Burkina Faso"],["BI", "Burundi"],["BG","Bulgaria"],
["KH", "Cambodia"],["CM", "Cameroon"],["CA", "Canada"],["CV", "Cape Verde"],["CF", "Central African Republic"],["TD", "Chad"],["CL", "Chile"],["CN","China"],["KM", "Comoros"],["CG", "Congo"],["HR","Croatia"],["CU","Cuba"],["CO","Colombia"],["CR","Costa Rica"],["CY","Cyprus"],["CZ", "Czech Republic"],
["DK", "Denmark"],["DJ", "Djibouti"],["DM","Dominica"],["DO", "Dominican Republic"],
["EC", "Ecuador"],["SV", "El Salvador"],["EG", "Egypt"],["GQ", "Equatorial Guinea"],["ER", "Eritrea"],["EE", "Estonia"],["ET", "Ethiopia"],
["FJ", "Fiji"],["FI", "Finland"],["FR", "France"],
["GA", "Gabon"],["GM", "Gambia"],["GH", "Ghana"],["DE","Germany"],["GD","Grenada"],["GE", "Georgia"],["GP", "Guadeloupe"],["GT","Guatemala"],["GN", "Guinea"],["GB", "Guinea-Bissau"],["GL", "Greenland"],["GR", "Greece"],["GY", "Guyana"],
["HT","Haiti"],["HN", "Honduras"],["HU","Hungary"],
["IS", "Iceland"],["ID","Indonesia"],["IN" ,"India"],["IQ","Iraq"],["IR","Iran"],["IE", "Ireland"],["IL", "Israel"],["IT", "Italy"],
["JM", "Jamaica"],["JP","Japan"],["JO", "Jordan"],
["KE", "Kenya"],["KI", "Kiribati"],["KZ", "Kazakhstan"],["KP", "North Korea"],["KR", "South Korea"],["KG", "Kyrgyzstan"],["KW", "Kuwait"],
["LS", "Lesotho"],["LR", "Liberia"],["LY", "Libya"],["LV", "Latvia"],["LI", "Liechtenstein"],["LT", "Lithuania"],["LU", "Luxembourg"],["LB", "Lebanon"],
["MG", "Madagascar"],["MW", "Malawi"],["ML", "Mali"],["MR", "Mauritania"],["MU", "Mauritius"],["MA", "Morocco"],["MZ","Mozambique"],["MM", "Myanmar"],["MX","Mexico"],["FM", "Micronesia"],["MY", "Malaysia"],["MV","Maldives"],["MN","Mongolia"],["MQ","Martinique"],["MS","Monserrat"],["MT", "Malta"],["MD", "Moldova"],["MC", "Monaco"],
["NA", "Namibia"],["NE", "Niger"],["NG","Nigeria"],["NR", "Nauru"],["NZ","New Zealand"],["NI","Nicaragua"],["NP","Nepal"],["AN","Netherlands Antilles"],["NL", "Netherlands"],["NO", "Norway"],
["OM", "Oman"],
["PK", "Pakistan"],["PA","Panama"],["PH", "Philippines"],["PW","Palau"],["PG", "Papua New Guinea"],["PR","Puerto Rico"],["PL", "Poland"],["PT","Portugal"],["PY", "Paraguay"],["PE", "Peru"],
["QA", "Qatar"],
["RW", "Rwanda"],["RU", "Russian Federation"],["RO", "Romania"],
["WS", "Samoa"],["ST", "Sao Tome"],["CS", "Slovakia"],["SI","Slovenia"],["ES", "Spain"],["SE", "Sweden"],["CH","Switzerland"],["SN", "Senegal"],["SC","Seychelles"],["SL", "Sierra Leone"],["SO", "Somalia"],["ZA","South Africa"],["SD","Sudan"],["SZ","Swaziland"],["SG", "Singapore"],["LK", "Sri Lanka"],["KN","St. Kitts"],["LU", "St. Lucia"],["MQ", "St. Martin"],["VC","St Vincent"],["SM", "San Marino"],["SA", "Saudi Arabia"],["SY", "Syria"],["SR","Suriname"],
["TW", "Taiwan"],["TJ", "Tajikistan"],["TZ", "Tanzania"],["TH","Thailand"],["TG", "Togo"],["TO","Tonga"],["TN","Tunisia"],["TP", "East Timor"],["TR", "Turkey"],["TM", "Turkmenistan"],["TC", "TurksCaicos"],["TT", "TrinidadTobago"],["TV", "Tuvalu"],
["UG", "Uganda"],["UA", "Ukraine"],["UY", "Uruguay"],["AE", "United Arab Emirates"],["GB", "United Kingdom"],["US", "United States"],["UZ","Uzbekistan"],
["VA", "Vatican City"],["VU","Vanuatu"],["VE", "Venezuela"],["VN","Vietnam"],
["YE", "Yemen"],["YU", "Yugoslavia"],
["ZM","Zambia"],["ZW", "Zimbabwe"]
];

/**
 * Function Name: fillCountryDropDown
 * Owner: Kony 
 * Purpose: To populate the select country drop down
 */
	
	function fillCountryDropDown(FormRef){
		FormRef.lstbxCountry.masterData  = gcountries;
		FormRef.lstbxState.setEnabled(false);
		FormRef.lstbxState.skin = "sknLsbBgImageDisabled";
		FormRef.lstbxState.focusSkin = "sknLsbBgImageDisabled";
		FormRef.lstbxState.masterData = [["select_state", "Select State"]];
	}
	
/**
 * Function Name: CSList_callbackFunction
 * Owner: Kony 
 * Purpose: callback function to populate the Select state drop down.
 */

	function CSList_callbackFunction(status,resultedData)
	{
		var arrStateMasterData = [];				
		if(status == 400)
		{	
			if(resultedData["opstatus"] == 0)
			{
				var resultedData = JSON.parse(resultedData["states"]);
				for (var key in resultedData)
				{				
					kony.print("key: "+key+"Value : "+resultedData[key]);
					if(key != "httpresponse" )
						arrStateMasterData.push([key, resultedData[key]]);
				}
				arrStateMasterData.sort();
				arrStateMasterData.unshift(["select_state", "Select State"]);
				gFormRef.lstbxState.masterData = arrStateMasterData;
				gFormRef.lstbxState.setEnabled(true);
				gFormRef.lstbxState.skin = "sknListBxBgImage";
				gFormRef.lstbxState.focusSkin = "sknListBxBgImage";
			}else alert("Unable to reach host");
		}
		kony.application.dismissLoadingScreen();	
	}
	
/**
 * Function Name: fillStatesDropDown
 * Owner: Kony 
 * Purpose: Service call to get states based on the country.
 */	
	function fillStatesDropDown(eventObj,FormRef)
	{		
		gFormRef = FormRef;
		var inputParam = {};				
		var selectedCountry = eventObj.selectedKeyValue[0];		
		inputParam["serviceID"] = "city_state_List";
		inputParam["country"] = selectedCountry
		inputParam["httpheaders"] = {};
		inputParam["httpconfigs"] = {};
		inputParam.appID = "dossierapp";
		inputParam.appver ="1.0.0";
		inputParam["channel"] = "rc";
		inputParam["platform"] = kony.os.deviceInfo().name;		
		if(inputParam["country"] != null && inputParam["country"] != "select_country"){	
			kony.application.showLoadingScreen("loadingskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
			var CSListServiceHandler = appmiddlewareinvokerasync(inputParam, CSList_callbackFunction);	
		}
	}
	
	
	