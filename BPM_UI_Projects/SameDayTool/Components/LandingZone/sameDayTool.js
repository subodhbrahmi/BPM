
var app = angular.module("SameDayToolApp", []);
var responseData = "";
var newCombinedData = "";
	var dummyResponseData="";



function clearJSON(str)
{
	return str;
	//var checkoutput=JSON.stringify(str);
	//var strEnd = (checkoutput.length - 9);
	//return checkoutput.substr(7,strEnd);
}
function clearJSON2(str)
{
return str;
	var checkoutput=str;
	var strEnd = (checkoutput.length - 9);
	return checkoutput.substr(7,strEnd);
}

function parseKeyValue(arrayKeyValue)
{
	if(arrayKeyValue == null || arrayKeyValue === null || typeof arrayKeyValue === "undefined")
		{
			return false;
		}
		
		var allKeyArray2=arrayKeyValue.replace(/"}/g , "").replace(/"/g,"");;
		var allKeyArray = allKeyArray2.split(",");
		
////alert(allKeyArray.toSource());
		var strToReturn = [];
		for(var i=0; i< allKeyArray.length; i++)
		{
			var CodeNameArray=allKeyArray[i].split(":");
			if(CodeNameArray[1] != undefined)
			{
				strToReturn.push({value: CodeNameArray[0] , label: CodeNameArray[1]});
			}
		}
	 ////alert(CodeNameArray.toSource());
    return strToReturn;
}





app.controller("FetchRecordCtrl", function($scope, $http) {
		var allStates = new Object();
		var showRetiveData = false;
		var region = "MW";
	    //var mServiceName = "RetrieveGeoFromForcePort";
		
		var userId = sessionStorage.getItem('userIDs');
		
	    //var userId = "tc8966";
		
				  
	
				  

     			
				  //////////////////////////////////////////////////////////////////////////////
        
	//alert("calling service");
   //var mServiceName=RetrieveTechCommonDetailsPort;
    var mServiceName = "RetrieveGeoFromForcePort";
   var request = {"input":
						{"xmlns":"http:\/\/www.example.org\/RetrieveGeoFromForce","xmlns$ns":				     
						"http:\/\/www.example.org\/RetrieveGeoFromForce","region":{"$t":"MW"},"userId":{"$t":"tc0996"}}};
		var wsUrl = "http://txcdtd20sb834g.itservices.sbc.com:9090/active-bpel/services/JSON/"+mServiceName;
		var jsonStr = JSON.stringify(request);
		$http({
		url: wsUrl,
		method: 'POST',
		headers: { 'Content-Type': 'text/xml' },
		data: jsonStr
		}).
		success(function(aResponse, status, headers, config) {
	
				 
				dummyResponseData = JSON.parse(JSON.stringify(aResponse));
				//dummyResponseData = JSON.parse(initialData);
				// //alert(aResponse1.toSource());
				////alert("responseData------"+responseData.toSource());
				//var response=JSON.stringify(responseData);
				////alert(response);
				 $scope.mAOI = 0;
				 $scope.mAG = 0;
				 $scope.mGroup = 0;
				 strAOIReturn = "";
				 strAGReturn = "";
				 strGroupsReturn = "";
				 strCenterRet="";
				 //attributeGeoData = responseData.output.attributeGeo;
				  attributeGeoData=  dummyResponseData.output.attributeGeo;
				  
				 var newAoiData = "";
				 var newAgData = "";
				 var newCenterData = "";
				 	 var attributeCenterData = "";
				 
                  for(i=0;i<=attributeGeoData.length;i++) {
				  if(attributeGeoData[i]!= undefined && attributeGeoData[i]	!=""){	  
				     var attributeData = attributeGeoData[i].value;
					// //alert(" aoivalue "+attributeData.$t.toSource());
				          if(newAoiData!="")
						    newAoiData = newAoiData+",";
					       newAoiData = newAoiData +':' + attributeData.$t;
					
					 
                  var attributeGeoData1 = attributeGeoData[i].attribute;
                  for(j=0; j<=attributeGeoData1.length;j++) 
                  {
				  if(attributeGeoData1[j]!="" && attributeGeoData1[j]!= undefined){
				  ////alert(" attributeGeoData1[j] "+attributeGeoData1[j].toSource());
				  if(attributeGeoData1[j].value != "" && attributeGeoData1[j].value != undefined){
					       var AGValue=attributeGeoData1[j].value;
					  //	//alert(" agvalue "+AGValue.$t.toSource());
						
							   if(newAgData!="")
								newAgData = newAgData+",";
							   newAgData = newAgData +':' + AGValue.$t;
							   
						  var attributeCenterData = attributeGeoData1[j].attributeCenter;
					  if(attributeCenterData!= undefined && attributeCenterData!=""){	
						  for(p=0;p<=attributeCenterData.length;p++){
									 ////alert(" inside p loop ");
						  	   if(attributeCenterData[p]!= undefined && attributeCenterData[p]!=""){	
						  	
							   var CenterValue=attributeCenterData[p].value;
					     	
						
							   if(newCenterData!="")
								newCenterData = newCenterData+",";
							   newCenterData = newCenterData +':' + CenterValue.$t;
							  
							  var attributeGroupsData = attributeCenterData[p].attributeGroups.value;
					         var attributeGroupsDataArray = JSON.stringify(attributeGroupsData).split(",");
							   for(k=0;k<attributeGroupsDataArray.length;k++)
							  {
							  var groupValue=clearJSON2(attributeGroupsDataArray[k]);
							 if(strGroupsReturn != "")
							 strGroupsReturn += ",";
							  strGroupsReturn += groupValue+':' + groupValue;
							  }
							  
						  }}}
						
					  
					
                } }}
               } } 
			   ////alert("final centerValue ===>"+newCenterData.toSource());
			  // //alert(" final groups value "+strGroupsReturn.toSource());
				 $scope.strAOIRet= parseKeyValue(newAoiData);
				 $scope.strAGRet = parseKeyValue(newAgData);
				  $scope.strCenterRet = parseKeyValue(newCenterData);
				 $scope.strGroupsRet =  parseKeyValue(strGroupsReturn);
				  
			}).
			error(function(data, status, headers, config) {
			  // log error
			  //alert("error"+status);
			});
		$scope.selectAOI = function() 
		{
				 var selectedAOI =  $scope.mAOI;	
				 $scope.strAGRet = null;
				 $scope.strGroupsRet =  null;
				 var newCenterData="";
			    strAGReturn = "";
				strGroupsReturn = "";
				newAgData ="";
				 sessionStorage.setItem('sAOI',selectedAOI);			 
				 //attributeGeoData = responseData.output.attributeGeo;
				   attributeGeoData=  dummyResponseData.output.attributeGeo;
			 
				 //  //alert("attributeGeoData ==>"+ attributeGeoData.toSource());
                  for(i=0;i<=attributeGeoData.length;i++) {
				  if(attributeGeoData[i] !="" && attributeGeoData[i]!= undefined){
                  var AOIValue=attributeGeoData[i].value;
				  AOIValue = AOIValue.$t;
					if(AOIValue == selectedAOI || selectedAOI == "0")
					{
			
					  var attributeGeoData1 = attributeGeoData[i].attribute;
					  for(j=0;j<=attributeGeoData1.length;j++) 
					  { if(attributeGeoData1[j] !="" && attributeGeoData1[j]!= undefined){
						  var AGValue=attributeGeoData1[j].value;
										  
							   if(newAgData!="")
								newAgData = newAgData+",";
							   newAgData = newAgData +':' + AGValue.$t;
					      ////alert(newAgData);	
						///////////////
						var attributeCenterData = attributeGeoData1[j].attributeCenter;
					  if(attributeCenterData!= undefined && attributeCenterData!=""){	
						  for(p=0;p<=attributeCenterData.length;p++){
									 ////alert(" inside p loop ");
						  	   if(attributeCenterData[p]!= undefined && attributeCenterData[p]!=""){	
						  	
							   var CenterValue=attributeCenterData[p].value;
					     	
						
							   if(newCenterData!="")
								newCenterData = newCenterData+",";
							   newCenterData = newCenterData +':' + CenterValue.$t;
							  
							  var attributeGroupsData = attributeCenterData[p].attributeGroups.value;
					         var attributeGroupsDataArray = JSON.stringify(attributeGroupsData).split(",");
							   for(k=0;k<attributeGroupsDataArray.length;k++)
							  {
							  var groupValue=clearJSON2(attributeGroupsDataArray[k]);
							 if(strGroupsReturn != "")
							 strGroupsReturn += ",";
							  strGroupsReturn += groupValue+':' + groupValue;
							  }
							  
						  }}}
						/////////////////
						  
						   
					  }}break;
					}
                }}
				////alert("select newAgData"+newAgData.toSource());
				 $scope.strAGRet = parseKeyValue(newAgData);
				 $scope.strCenterRet = parseKeyValue(newCenterData);
				 $scope.strGroupsRet =  parseKeyValue(strGroupsReturn);
		}
		$scope.selectAG = function() {
				var selectedAOI =  $scope.mAOI;	
				 var selectedAG =  $scope.mAG;
				 var newCenterData ="";
				 $scope.strGroupsRet =  null;
				 strGroupsReturn = ""
				 var CenterValue="";
				 sessionStorage.setItem('sAG',selectedAG);		
				// attributeGeoData = responseData.output.attributeGeo;
				  attributeGeoData=  dummyResponseData.output.attributeGeo;
				// //alert("attributeGeoData==>>>>>"+attributeGeoData.toSource());
                  for(i=0;i<=attributeGeoData.length;i++) {
				  if(attributeGeoData[i] !="" && attributeGeoData[i]!= undefined){
                   
					  var attributeGeoData1 = attributeGeoData[i].attribute;
					  for(j=0;j<=attributeGeoData1.length;j++) 
					  {
					   if(attributeGeoData1[j] !="" && attributeGeoData1[j]!= undefined){
						  var AGValue=clearJSON(attributeGeoData1[j].value);
						  AGValue = AGValue.$t;
						  ////alert("AGValue==>>>"+AGValue.toSource());
						  if(AGValue == selectedAG || selectedAG == "0")
						  {
						  ////
						  //alert("selectedAG==>>>"+selectedAG.toSource());
						  	 
						  var attributeCenterData = attributeGeoData1[j].attributeCenter;
						       
						 
						   
						 
					  if(attributeCenterData!= undefined && attributeCenterData!=""){	
					  
					//  //alert(attributeCenterData.length);
						  for(p=0;p<=attributeCenterData.length;p++){
							 
						  	   if(attributeCenterData[p]!= undefined && attributeCenterData[p]!=""){	
						 
							   var CenterValue=attributeCenterData[p].value;
					     	////alert("CenterValue==>>"+CenterValue.toSource());
						
							   if(newCenterData!="")
								newCenterData = newCenterData+",";
							   newCenterData = newCenterData +':' + CenterValue.$t;
							  
							 // //alert("newCenterData===>>>>"+newCenterData);
							  var attributeGroupsData = attributeCenterData[p].attributeGroups.value;
					         var attributeGroupsDataArray = JSON.stringify(attributeGroupsData).split(",");
							   for(k=0;k<attributeGroupsDataArray.length;k++)
							  {
							  var groupValue=clearJSON2(attributeGroupsDataArray[k]);
							 if(strGroupsReturn != "")
							 strGroupsReturn += ",";
							  strGroupsReturn += groupValue+':' + groupValue;
							  }
							    
						  }}}
						  //////
						  
							  }
						  
					  }}
               } }
			 //  //alert("--------"+strGroupsReturn);
				 //$scope.strAOIRet=parseKeyValue(strAOIReturn);
				 //$scope.strAGRet = parseKeyValue(strAGReturn);
				  $scope.strCenterRet = parseKeyValue(newCenterData);
			 $scope.strGroupsRet =  parseKeyValue(strGroupsReturn);
				 
				//alert("strCenterRet------------>"+strCenterRet.toSource());
	
	 }
 
	 $scope.selectCenter = function() {
	  var selectedAOI =  $scope.mAOI;	
				 var selectedAG =  $scope.mAG;
				 //alert(selectedAG);
				 var selectedCenter=$scope.mCenter;
				//alert(selectedCenter);
				 var newCenterData ="";
				 strGroupsRet="";
				 $scope.strGroupsRet =  null;
				 strGroupsReturn = ""
				 var CenterValue="";
				 sessionStorage.setItem('sAG',selectedAG);	
				 sessionStorage.setItem('sCENTER',selectedCenter);	
				  attributeGeoData=  dummyResponseData.output.attributeGeo;
				 //alert("attributeGeoData==>>>>>"+attributeGeoData.toSource());
				 
                  for(i=0;i<=attributeGeoData.length;i++) {

			 //alert("attributeGeoData");
				  
				    if(attributeGeoData[i] != undefined && attributeGeoData[i].attribute !="" && attributeGeoData[i].attribute!= undefined){
               var attributeGeoData1 = attributeGeoData[i].attribute;
					  for(j=0;j<=attributeGeoData1.length;j++) 
					  {
					   
					    
					   if(attributeGeoData1[j]!=undefined  && attributeGeoData1[j].attributeCenter!= undefined && attributeGeoData1[j].attributeCenter!=""){
					  var attributeGeoData2 = attributeGeoData1[j].attributeCenter;
					  
					  for(k=0;k<=attributeGeoData2.length;k++){
					  
	 if(attributeGeoData2[k] !="" && attributeGeoData2[k]!= undefined && attributeGeoData2[k].attributeGroups.value!=undefined){
					  CenterValue=clearJSON(attributeGeoData2[k].value);
						  CenterValue = CenterValue.$t;
					  
					  
					  if(CenterValue == selectedCenter || selectedCenter == "0")
						  {
						 
						  var attributeGroupsData = attributeGeoData2[k].attributeGroups.value;
					         var attributeGroupsDataArray = JSON.stringify(attributeGroupsData).split(",");
							   for(p=0;p<attributeGroupsDataArray.length;p++)
							  {
							  var groupValue=clearJSON2(attributeGroupsDataArray[p]);
							 if(strGroupsReturn != "")
							 strGroupsReturn += ",";
							  strGroupsReturn += groupValue+':' + groupValue;
							  }
					  
					 }
					  }
					  }
					  
					  
					  }
					  }
			}
			}	 
	 
	 		  
			 $scope.strGroupsRet =  parseKeyValue(strGroupsReturn);
				 
				////alert("strGroupsRet------------>"+strGroupsRet.toSource());
	 
	 }
 
	  

	  
	  
	  $scope.retreiveCommomDetails=function()
	  {
	  var details = "";
	  var selectedattuid =  $scope.attuid1;
	 sessionStorage.setItem('uATTId1',selectedattuid);
		var mServiceName = "RetrieveTechDetailsPort";
		var userId = sessionStorage.getItem('uATTId1');
		//alert("userId===>>"+userId);
		 
		var selectedAg=$scope.mAG;
		 sessionStorage.setItem('uag1',selectedAg);
		 var mmag=sessionStorage.getItem('uag1');
		//alert(mmag);
	
		
		var request = {"input" : {
        "xmlns" : "http://www.example.org/RetrieveTechCommonDetails",
        "region" : {
          "$t" : "MW"
        },
        "attuid" : {
          "$t" : userId
        },
		"groups" : {
          "$t" : mmag  
        }
      }};
		var wsUrl = "http://txcdtd20sb834g.itservices.sbc.com:9090/active-bpel/services/JSON/RetrieveTechDetailsPort";
		var jsonStr = JSON.stringify(request);
		$http({
		url: wsUrl,
		headers: { 'Content-Type': 'text/xml' },
		method: 'POST',
	 
		data: jsonStr
		
		}).
		success(function(aResponse, status, headers, config) {
		var responsedata1 = JSON.parse(JSON.stringify(aResponse));
		//alert(responsedata1.toSource());
		var details=responsedata1.output.techCommonDetails;
	 
		//alert("details are "+details.toSource()+" && detials length =>"+details.length);
		newCombinedData = responsedata1.output.techCommonDetails;
		combinedData="";
		var dataName="";
	    var dataValue="";
		var dataValueArray= new Array();
		var count=0;
		var userEnteredValue = userId;
		var enteredAG=mmag;//"IN_INDY_E_U";
		var splitArray =  new Array();
		var agLength=0;
		var attuidValueBlank = "dd";
	
		if(userEnteredValue=="" || userEnteredValue=="undefined" || userEnteredValue==null){
		   attuidValueBlank = "true";
		}

		if(userEnteredValue.indexOf(",") != -1){
                                                      splitArray =  userEnteredValue.split(",");
                                                  }else{
                                                      splitArray.push(userEnteredValue);
                    }

			   
				//alert("splitArray"+splitArray);
  
				//alert("details.length"+details.length);
		for(i=0;i<details.length;i++)
		{	//alert("combinedData"+combinedData.toSource());
		    combinedData=details[i].nameValue;
			
		  if(attuidValueBlank=="true"){
		  ////alert("ag");
		  for(j=0;j<combinedData.length;j++){
									   if(combinedData[j]!= undefined && combinedData[j].name.$t=="AG"){ 
											if(enteredAG==combinedData[j].value.$t){
												  combinedData.splice(7,3);
												 dataValueArray.push(combinedData);
												 $scope.dataValues	= dataValueArray; 
											} 
									   }  
								 }
						$scope.row_html="<select onchange='angular.element(this).scope().confirmData()' id='scDetail' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
					  $scope.row_html1="<select onchange='angular.element(this).scope().confirmData()' id='scDetail1' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
					  $scope.row_html2="<select onchange='angular.element(this).scope().confirmData()' id='scDetail2' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
		  }
		  else {
		   //alert("att");
		  				//alert("combinedData"+combinedData); 
			 for(k=0;k<splitArray.length;k++){
								 for(j=0;j<10;j++){
							       if(combinedData[j]!= undefined && combinedData[j]!= "undefined"){
								          if(combinedData[j].name.$t=="attuid"){ 
												if(splitArray[k]==combinedData[j].value.$t){
												     combinedData.splice(7,3);
													 dataValueArray.push(combinedData);
													 $scope.dataValues	= dataValueArray;
												}  
										   }  
								} } 
					  $scope.row_html="<select onchange='angular.element(this).scope().confirmData()' id='scDetail' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
					  $scope.row_html1="<select onchange='angular.element(this).scope().confirmData()' id='scDetail1' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
					  $scope.row_html2="<select onchange='angular.element(this).scope().confirmData()' id='scDetail2' ng-model='scDetail'> <option value='y'>y</option><option value='n'>n</option></select> ";
				   }
			 }
		}
		}).
		error(function(data, status, headers, config) {
		  // log error
		  //alert("error"+status);
		});
	  
	  }
	  
	  $scope.saveData =  function(){
	  
	
	     //alert( $("#scDetail").val());
		 var selectedID = $("#rowdata").find("td:first").text();
		 
	  }
		  $scope.confirmData =  function(element){
		  
		 
	          
				  //alert("text is ==>"+element);
				var scheduleChangeValue = $("#scDetail").val();
				var scheduleChangeValue1 = $("#scDetail1").val();
				var scheduleChangeValue2 = $("#scDetail2").val();
				var selectedID = $("#rowdata").children('td:first').text();
				var options=false;
				var options1=false;
				var options2=false;
				var finalData=new Array();
 if ($("#scDetail").val() != "") {
options=true;
}
 if ($("#scDetail1").val() != "") {
options1=true;
}
 if ($("#scDetail2").val() != "") {
options2=true;
}

//alert($("#rowdata").text());				
		////alert("scheduleChangeValue====>>>>"+scheduleChangeValue);
////alert("scheduleChangeValue1====>>>>"+scheduleChangeValue1);
////alert("scheduleChangeValue2====>>>>"+scheduleChangeValue2);
////alert("selectedID====>>>>"+selectedID);
		
			 var mergescheduleChange={"name": {
									"$t": "scheduleChange"
													},
													"value": {
														"$t": "y"
													}
												};
												
	var mergeoverTime={"name": {
									"$t": "overTime"
													},
													"value": {
														"$t": "y"
													}
												};
												
	var mergeskills={"name": {
									"$t": "skills"
													},
													"value": {
														"$t": "y"
													}
												};
				
				count=count+1;
				  
				for(i=0;i<newCombinedData.length;i++)
		{
		           var newData = newCombinedData[i].nameValue;
				   
				   	////alert("before ==>"+newData.toSource());
			
			      for(j=0;j<10;j++){

					if(newData[j]!= undefined && newData[j]!= "undefined"){
					 
								          if(newData[j].name.$t=="attuid" && newData[j].value.$t==selectedID.trim()){
										  
										  if(count==1){
										  
										  //alert("Into cOUNt");
										  newData.splice(7,0,mergescheduleChange,mergeoverTime,mergeskills);
										  }
										  
										 
										  if(options==true){
										  ////alert("newData[j]===>"+newData[j].toSource()+"j==>"+j);

									//	//alert("1");
											newData[7].value.$t = scheduleChangeValue;
								////alert("after1 newData===>>"+newData.toSource());
												} 
											 if(options1==true){
										  ////alert("newData[j]===>"+newData[j].toSource()+"j==>"+j);
										  ////alert("2");
											newData[8].value.$t = scheduleChangeValue1;
								////alert("after2 newData===>>"+newData.toSource());
												} 
											 if(options2==true){
										  ////alert("newData[j]===>"+newData[j].toSource()+"j==>"+j);
										 // //alert("3");
					
											newData[9].value.$t = scheduleChangeValue2;
								////alert("after3 newData===>>"+newData.toSource());
												} 
										  
								
										  finalData.push(newData);
										   
								//alert("Final newData===>>"+finalData.toSource());
												} 
												
					
											 
												
												
										   }  
					} 
				} 
				
				
	  }
	  
	  

});

	app.directive('myAoiDirective', function() {
	  return function(scope, element, attrs) {
				var sessionsAOI = 0;
					if(sessionStorage != null  &&  sessionStorage.getItem('sAOI') != null &&  sessionStorage.getItem('sAOI') != undefined)
					{
						  sessionsAOI = sessionStorage.getItem('sAOI');
					}

				 angular.forEach(scope, function(value, key) {
				   if(scope.aoi.value  == sessionsAOI)
				   {
					 angular.element(element).attr('selected','selected');
				   }
				 }
				);
		
	  };
	})
	app.directive('myAgDirective', function() {
	  return function(scope, element, attrs) {
				var sessionsAG = 0;
					if(sessionStorage != null &&  sessionStorage.getItem('sAG') != null &&  sessionStorage.getItem('sAG') != undefined)
					{
						sessionsAG= sessionStorage.getItem('sAG');
					}

				 angular.forEach(scope, function(value, key) {
				   if(scope.ag.value  == sessionsAG)
				   {
					 angular.element(element).attr('selected','selected');
				   }
				 }
				);
		
	  };
	})
	app.controller("LoginCtrl", function($scope, $http) {

	var mServiceName = "GetLastLoginSchemaPortType";
	var userId = sessionStorage.getItem('userIDs');
    
	var getLoginTime=sessionStorage.getItem('lastLoginTime');
	if(getLoginTime != null && getLoginTime != undefined)
	{
    	 $scope.lastLoginTime =   getLoginTime;
		 $scope.userName = "Logged in as "+sessionStorage.getItem('userFullName')+" ("+sessionStorage.getItem('userIDs')+")"; 
	}
	else
	{
		   var request =   {"userId":
						{"xmlns":"http:\/\/www.example.org\/GetStatesSchema","xmlns$ns":"http:\/\/www.example.org\/GetStatesSchema","useId":
						{"$t":userId}}};
		var wsUrl = "http://txcdtd20sb834g.itservices.sbc.com:9090/active-bpel/services/JSON/"+mServiceName;
		var jsonStr = JSON.stringify(request);
	 // Validate form fields before submitting the request
		 
		if(userId == "" || userId === null )
		{
			////alert("UserId is null");
			return;
		}
		$http({
		url: wsUrl,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: jsonStr
		}).
		success(function(aResponse, status, headers, config) {
				var jsonOBJ = JSON.stringify(aResponse.lastLoginTime.lastLoginTime);
				var strEnd = (jsonOBJ.length - 9);
				$scope.lastLoginTime =  jsonOBJ.substr(7, strEnd);   
				$scope.userName = ""+sessionStorage.getItem('userFullName')+" ("+sessionStorage.getItem('userIDs')+")";  
				sessionStorage.setItem('lastLoginTime',$scope.lastLoginTime);			
		 // //alert("succes"+data);
		}).
		error(function(data, status, headers, config) {
		  // log error
		  //alert("error"+status);
		});
	}
});
app.controller("HomeCtrl", function($scope, $http) {
    $scope.firstName = "John",
    $scope.lastName = "Doe"
    $scope.myVar = true;
	$scope.myVar1= false;
	$scope.myVar2= false;
    $scope.toggle = function() {
		$scope.myVar = true;
		$scope.myVar1= false;
		$scope.myVar2= false;
	//	//alert("$scope.myVar"+$scope.myVar);
    };
    $scope.toggle1 = function() {
		$scope.myVar = false;
		$scope.myVar1 = true;
		$scope.myVar2 = false;    
		////alert("$scope.myVar1"+$scope.myVar1);
    };
    $scope.toggle2 = function() {
		$scope.myVar = false;
		$scope.myVar1 = false;
		$scope.myVar2 = true;    
		//	//alert("$scope.myVar2"+$scope.myVar2);
    };
});


