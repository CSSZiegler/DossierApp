/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: To validate the API key entered by the user.
 */	
function settingtheAPIKey(FormRef){
	if((FormRef.txtAPIKey.text==null) | (FormRef.txtAPIKey.text=="") ){
		alert("Please enter the API key. If you do not have an API key, click on 'Do not have an API Key' link below to get the key.");
	}else{
		gApiKey = FormRef.txtAPIKey.text;
		//check for key validity
		var validateKey_inputparam = {};
		validateKey_inputparam["serviceID"] = "dossierXMLService";
	    validateKey_inputparam["APIKey"] = gApiKey;
	    validateKey_inputparam["FirstName"] = "raj";
	    validateKey_inputparam["LastName"] = "koneru";
	    validateKey_inputparam["httpheaders"] = {};
	    validateKey_inputparam["httpconfigs"] = {};	    
	   kony.print("input::"+JSON.stringify(validateKey_inputparam));
	   	kony.application.showLoadingScreen("loadskin","Validating the key...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);	
	    var validateKey = appmiddlewareinvokerasync(validateKey_inputparam, validateKey_callBack);
	}
}

/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: CallBack to validate the API key entered by the user.
 */	
function validateKey_callBack(status,validateKey){
	
	if(status==400){
		if(validateKey.opstatus==0){
			//#ifdef desktopweb
				piplServicefn(frmHome);
			//#else
				frmHome.show(); //if API is  valid show home page
				kony.application.dismissLoadingScreen();
			//#endif
			
		}	
		else{
			alert("Invalid API key.Please enter a valid key.");
			kony.application.dismissLoadingScreen();
		}
	}
	
}

/**
*	Name    : dossierXMLService_callBack
*	Author  : Kony Solutions
*	Purpose : This function is callback function with status and resultData object which triggers by appmiddlewareinvokerasync method in function piplServicefn().  .
*/
	function dossierXMLService_callBack(status, dossierXMLService)
	{
		if (status == 400){			
			if (dossierXMLService["opstatus"] == 0) {						
				dataArray = [];
				var image_Profile = "profile.png";
				var display_Location = "";				
				var display_friends = "";
				var display_jobs = "";
				var phoneNo = "";
				var Profile_URL = "";
				var Age = "";	
				var firstLocation = "";
				var noOfLocations = 0;
				var noOfRelatives = 0;
				var usersFullInfo = "";
				var ageWithLocation = "";
				
				var JSON_Obj = dossierXMLService["dossierSet"];
				
				if(JSON_Obj.length == undefined){
					alert("API key is valid but you exceeded your API calls limit.")
					kony.application.dismissLoadingScreen();
					return;
				}
				
				if(kony.os.toNumber(JSON_Obj.length) == 0){
					alert("No record found.")
					kony.application.dismissLoadingScreen();
					return;
				}
				
				if(JSON_Obj.length > 30) objLength = 30;
				else objLength = JSON_Obj.length;
				
				
				for (var i=0; (i<JSON_Obj.length)&&(JSON_Obj[i]["names"]!= null); i++){
					display_Location = "";				
					display_friends = "";
					display_jobs = "";					
					Profile_URL = "";
					noOfLocations = 0;
					noOfRelatives = 0;	
					if('names' in JSON_Obj[i]){
						var profile_name = JSON_Obj[i]["names"];
					}
					else { 
						profile_name = "";
					}
					
					if('addresses' in JSON_Obj[i]){
						var nextDisplayInfo = "";
						var locDataArr = []; //locDataArr for setting the data in segmentedUI2[segLocations] which has two coloums. 
						noOfLocations = JSON_Obj[i]["addresses"].length;
						firstLocation = JSON_Obj[i]["addresses"][0]["display"];
						for (var j=0; j< JSON_Obj[i]["addresses"].length; j++ ){							
							var personNextAddress = JSON_Obj[i]["addresses"][j+1];
							if (personNextAddress == undefined || personNextAddress == null) nextDisplayInfo = "";
							else nextDisplayInfo = personNextAddress["display"];
								locDataArr.push({"lblSegLoc1":JSON_Obj[i]["addresses"][j]["display"], "lblSegLoc2":nextDisplayInfo })
							j++;
						}							
					}
	
					else{
						locDataArr = [{"lblSegLoc1":"Locations not found.", "lblSegLoc2":"" }]; //Setting static info if profile doesn't have location[Address].
						noOfLocations = 0;
						firstLocation = "";
					}
					
					if('dobs' in JSON_Obj[i])
						Age = JSON_Obj[i]["dobs"]+" years old";
					else Age = "";
					
					if('relationships' in JSON_Obj[i]){
						var nextFriendInfo = "";
						var friendDataArr = [];//friendDataArr for setting the data in segmentedUI2[segFriendsInfo] which has two coloums.
						noOfRelatives = JSON_Obj[i]["relationships"].length;
						for (var j=0; j<JSON_Obj[i]["relationships"].length ; j++){
							var relatedNextPerson = JSON_Obj[i].relationships[j+1];
							if(relatedNextPerson == undefined || relatedNextPerson == null) nextFriendInfo = "";
							else nextFriendInfo = relatedNextPerson["display"];
								friendDataArr.push({"lblSegFriends1":JSON_Obj[i].relationships[j]["display"], "lblSegFriends2":nextFriendInfo});
							j++;					
							}						
					}
					else{
						friendDataArr = [{"lblSegFriends1":"Friends not found.", "lblSegFriends2":""}];// Setting static info if profile doesn't have friend list. 
						noOfRelatives = 0;						
					}		
					
					if('images' in JSON_Obj[i]){
						var image_Profile = JSON_Obj[i].images;
					}
					else { 
						image_Profile = "profile.png";
					}
									
					if('source' in JSON_Obj[i]){
						var name = JSON_Obj[i]["source"]["name"];
						Profile_URL = JSON_Obj[i]["source"]["url"];
					}
					else  Profile_URL = "";					
	
					if('phones' in JSON_Obj[i])
						phoneNo = "Contact No. :"+JSON_Obj[i].phones;
					else phoneNo = "";
					
					if('jobs' in JSON_Obj[i]){						
						for (var j=0; j<JSON_Obj[i]["jobs"].length ; j++){
							display_jobs = display_jobs + JSON_Obj[i].jobs[j]["display"]+" <br/><br/>";						
							}												
					}
					else display_jobs = "";	
											
					if('educations' in JSON_Obj[i]){
						var Education = JSON_Obj[i].educations;

					}
					else Education = "";
					
					if((Age!= "") && (firstLocation != "")){
						usersFullInfo = profile_name+", "+Age+", "+firstLocation+" ...";
						ageWithLocation = Age+", "+firstLocation;	
					}					
					else if((Age == "") && (firstLocation != "")){
						usersFullInfo = profile_name+", "+firstLocation+" ...";
						ageWithLocation = firstLocation;
					}
					else if((Age != "") && (firstLocation == "")){
						usersFullInfo = profile_name+", "+Age;
						ageWithLocation = Age;
					}
					else usersFullInfo = profile_name;
					 			
					dataArray.push({"imgProfileID":image_Profile,
									"lblUserInfo":profile_name,
									"lblUserFullInfo":usersFullInfo,
									"lblUserAgeLoc":ageWithLocation,
									"lblName":profile_name,
									"lblSponsored":name,
									"lblAge":Age,
									"lblAgeLocID":firstLocation,// ageWithLocation,									
									"lblNoLocations":noOfLocations+" Locations",
									"lblRelatives":noOfRelatives+" Related" ,
									"linkURLID":Profile_URL.substring(0,35)+"...",// substring due to maintain fixed length of URL.
									"richtxtLocation":locDataArr,//display_Location
									"richtxtRelation":friendDataArr,//display_friends
									"richtxtJobs":display_jobs,
									"lblEdu":Education, 									
									"lblPhoneNo":phoneNo,
									"URL":Profile_URL
									})	
								
					}
					//#ifdef ipad
						frmPipl.segElements.selectedIndex = [0,0];		
					//#endif

					frmPipl.segElements.setData(dataArray);
					frmPipl.show();
					kony.application.dismissLoadingScreen();
			}else {
				//alert("Error: "+JSON.stringify(dossierXMLService));
				if(dossierXMLService["opstatus"] == 8009) alert("API key is missing or invalid.");
				else alert("Cannot connect to host.");
				kony.application.dismissLoadingScreen();
			}
		}
	}
	
/**
*	Name    : piplServicefn
*	Author  : Kony Solutions
*	Purpose : This function is used to invoke the Pipl.com Search API Service using appmiddlewareinvokerasync method  .
*/		
	function piplServicefunction(FirstName , LastName, City, State, Country){
		var dossierXMLService_inputparam = {};
	    dossierXMLService_inputparam["serviceID"] = "dossierXMLService";
	    dossierXMLService_inputparam["APIKey"] = gApiKey;
	    dossierXMLService_inputparam["FirstName"] = FirstName;
	    dossierXMLService_inputparam["LastName"] = LastName;
	    dossierXMLService_inputparam["City"] = City;
	    dossierXMLService_inputparam["State"] = State;//State
	    dossierXMLService_inputparam["Country"] = Country;//
	    dossierXMLService_inputparam["httpheaders"] = {};
	    dossierXMLService_inputparam["httpconfigs"] = {};	    
	    if((FirstName != null && LastName != null) && (FirstName != "" && LastName != "")){
	    	kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);	
	    	var dossierXMLService = appmiddlewareinvokerasync(dossierXMLService_inputparam, dossierXMLService_callBack);
	    }
	    else{
			alert("Please enter atleast FirstName and LastName.");
			return;
		}
	}
/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: This function is used to open specific URL in native browser from frmDossier form.
*/	
	function url_MoreInfo(){
		var url4MoreInfo = frmPipl.segElements.selectedItems[0].URL;
		kony.application.openURL(url4MoreInfo);
	
	}

/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: To open pipl developer account page to login/register to get API key
*/
	function url_APIKey(){
		kony.application.openURL("http://dev.pipl.com/apps/mykeys");
		popUpAPIKeyinfo.dismiss();
	} 
	
/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: Setting first tab as active tab in init event callback of frmDossier form
 */	
	function displayFirstTab(frmName){
		frmName.tabpaneDossier.activeTabs = [0];		
	}

/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: Setting first row as selected/active row
 */		
	function firstRowSelect(){
		if(dataArray != [])//selecting first row of segment 
		frmPipl.segElements.selectedIndex = [0,0];  //indicates 1st row in 1st section of segmented ui.
		frmPipl.tabpaneDossier.setVisibility(false);
		frmPipl.tabpaneDossier.lineLoc1.setVisibility(true);
		frmPipl.tabpaneDossier.lineLoc2.setVisibility(true);
		retrieveDossierInfo(frmPipl);
	}

/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: Retrieve more info on onClick event callback of segmentedUI2[segElements] and showing same information in frmDossier[Tabpane]	
 */	
	function retrieveDossierInfo(frmName){	
		frmName.tabpaneDossier.lineLoc1.setVisibility(true);
		frmName.tabpaneDossier.lineLoc2.setVisibility(true);
		frmName.tabpaneDossier.imgProfileTab.src = frmPipl.segElements.selectedItems[0].imgProfileID;
		frmName.tabpaneDossier.lblName.text = frmPipl.segElements.selectedItems[0].lblName;
		frmName.tabpaneDossier.lblAge.text = frmPipl.segElements.selectedItems[0].lblAge;
		if(frmName.tabpaneDossier.lblAgeLocID != undefined && frmName.tabpaneDossier.lblAgeLocElement != undefined){
			if(frmPipl.segElements.selectedItems[0].lblAgeLocID != ""){
				frmName.tabpaneDossier.lblAgeLocID.text = frmPipl.segElements.selectedItems[0].lblAgeLocID;
				frmName.tabpaneDossier.lblAgeLocElement.text = frmPipl.segElements.selectedItems[0].lblAgeLocID;
				frmName.tabpaneDossier.hbxLocImgFriendsTab.setVisibility(true);
				frmName.tabpaneDossier.hbxLocImgElementTab.setVisibility(true);
			}else{
				frmName.tabpaneDossier.hbxLocImgFriendsTab.setVisibility(false);
				frmName.tabpaneDossier.hbxLocImgElementTab.setVisibility(false);
			}
		}	
		frmName.tabpaneDossier.lblPhoneNo.text = frmPipl.segElements.selectedItems[0].lblPhoneNo;
		frmName.tabpaneDossier.lblNoLocations.text = frmPipl.segElements.selectedItems[0].lblNoLocations;
		frmName.tabpaneDossier.lblRelatives.text = frmPipl.segElements.selectedItems[0].lblRelatives;
		frmName.tabpaneDossier.segLocations.setData(frmPipl.segElements.selectedItems[0].richtxtLocation);
		if(frmPipl.segElements.selectedItems[0].lblEdu != ""){
			frmName.tabpaneDossier.lblEdu.text = frmPipl.segElements.selectedItems[0].lblEdu;
			frmName.tabpaneDossier.hbxEdu.setVisibility(true);
			frmName.tabpaneDossier.lineEdu1.setVisibility(true);
			frmName.tabpaneDossier.lineEdu2.setVisibility(true);	
		}else{ frmName.tabpaneDossier.hbxEdu.setVisibility(false);
				frmName.tabpaneDossier.lblEdu.text = "";
				frmName.tabpaneDossier.lineEdu1.setVisibility(false);
				frmName.tabpaneDossier.lineEdu2.setVisibility(false);
		}
		frmName.tabpaneDossier.linkURLID.text = frmPipl.segElements.selectedItems[0].linkURLID;
		//#ifdef desktopweb
			frmName.tabpaneDossier.lblFrdInfo.text = frmPipl.segElements.selectedItems[0].lblUserFullInfo;
		//#else
			frmName.tabpaneDossier.lblFrdInfo.text = frmPipl.segElements.selectedItems[0].lblName;
		//#endif	
						
		frmName.tabpaneDossier.segFriendsInfo.setData(frmPipl.segElements.selectedItems[0].richtxtRelation);
		frmName.tabpaneDossier.imgElement.src = frmPipl.segElements.selectedItems[0].imgProfileID;
		if(frmName.tabpaneDossier.imgFriendsTab != undefined && frmName.tabpaneDossier.lblUserInfoElementTab != undefined){
			frmName.tabpaneDossier.imgFriendsTab.src = frmPipl.segElements.selectedItems[0].imgProfileID;
			frmName.tabpaneDossier.lblUserInfoElementTab.text = frmPipl.segElements.selectedItems[0].lblName;
		}
		frmName.tabpaneDossier.lblSponsored.text = frmPipl.segElements.selectedItems[0].lblSponsored;
		if(frmPipl.segElements.selectedItems[0].richtxtJobs != ""){
			frmName.tabpaneDossier.richtxtJobs.text = frmPipl.segElements.selectedItems[0].richtxtJobs;
			frmName.tabpaneDossier.hbxJobs.setVisibility(true);
			frmName.tabpaneDossier.lineJob1.setVisibility(true);
			frmName.tabpaneDossier.lineJob2.setVisibility(true);
			}
		else{
			frmName.tabpaneDossier.lineJob1.setVisibility(false);
			frmName.tabpaneDossier.lineJob2.setVisibility(false);
			frmName.tabpaneDossier.hbxJobs.setVisibility(false);
			frmName.tabpaneDossier.richtxtJobs.text = "";
		}
		frmName.tabpaneDossier.setVisibility(true);
	}
	
/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: To navigate to frmDossier form
 */		
	function navToDossierForm(){
		frmDossier.show();	
	}
	
/**
 * Function Name: settingtheAPIKey
 * Owner: Kony 
 * Purpose: To capture search data entered by user.
 */	
	function piplServicefn(FormName){
		firstName = "";
		lastName = "";
		var city = "";
		var state = "";
		var country = "";		
		firstName = FormName.txtFirstName.text;
		lastName = FormName.txtLastName.text;
		if(frmHome.txtCity != null || frmHome.txtCity != undefined)
			city = frmHome.txtCity.text;
		if(frmHome.lstbxState != undefined && (frmHome.lstbxState.selectedKeyValue != null && frmHome.lstbxCountry.selectedKeyValue != null))
		{
			state = frmHome.lstbxState.selectedKeyValue[0];
			country = frmHome.lstbxCountry.selectedKeyValue[0];
		}
			
		piplServicefunction(firstName , lastName, city, state, country);	
	}
	
	

	
