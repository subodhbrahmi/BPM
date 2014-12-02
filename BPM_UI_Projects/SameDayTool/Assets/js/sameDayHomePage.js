 var count=0;
  var toggleVisibility=function(){ 
  //alert("function")
  if(count%2==0){
	document.getElementById("hideTD").style.display = "block"; 
  }else{
	document.getElementById("hideTD").style.display = "none";  
 }
	count++
 } ;
		
  var count1=0;
var toggleVisibility1=function(){ 
  //alert("function 1")
  if(count1%2==0){
  //alert(count)
  document.getElementById("hideTD1").style.display = "block"; 
  }else{
  document.getElementById("hideTD1").style.display = "none";  
 }
	count++
};		
function AdjustIframeHeightOnLoad() 
{ 
//alert('1');
document.getElementById("iframeLoader").style.height = document.getElementById("iframeLoader").contentWindow.document.body.scrollHeight + "px"; 
}
function AdjustIframeHeight(i)
{ 
//alert('2');
document.getElementById("iframeLoader").style.height = parseInt(i) + "px";
 }
 
 var testButton= function(){
alert("Data Saved Successfully");
//$("#getData").show();
document.getElementById("getData").style.display = "block";
}
var checkOne= function(){
//alert("ran")
if (document.getElementById('checkONE').checked) {
            document.getElementById("OneOne").checked = true;
			document.getElementById("OneTwo").checked = true;
			document.getElementById("OneThree").checked = true;
			document.getElementById("OneFour").checked = true;
			document.getElementById("OneFive").checked = true;
			
			
			//alert("checked");
        }else {
		
		document.getElementById("OneOne").checked = false;
		document.getElementById("OneTwo").checked = false;
		document.getElementById("OneThree").checked = false;
		document.getElementById("OneFour").checked = false;
		document.getElementById("OneFive").checked = false;
		
		}
}
var checkTwo= function(){
//alert("ran2")
if (document.getElementById('checkTWO').checked) {
            document.getElementById("TwoOne").checked = true;
			document.getElementById("TwoTwo").checked = true;
			document.getElementById("TwoThree").checked = true;
			document.getElementById("TwoFour").checked = true;
			document.getElementById("TwoFive").checked = true;
			
			//alert("checked");
        }else {
		
		document.getElementById("TwoTwo").checked = false;
			document.getElementById("TwoThree").checked = false;
			document.getElementById("TwoFour").checked = false;
			document.getElementById("TwoOne").checked = false;
			document.getElementById("TwoFive").checked = false;
		
		}
}
var checkThree= function(){
//alert("ran3")
if (document.getElementById('checkTHREE').checked) {
      document.getElementById("ThreeOne").checked = true;
			document.getElementById("ThreeTwo").checked = true;
			document.getElementById("ThreeThree").checked = true;
			document.getElementById("ThreeFour").checked = true;
			document.getElementById("ThreeFive").checked = true;
			//alert("checked");
        }else {
		
		document.getElementById("ThreeOne").checked = false;
			document.getElementById("ThreeTwo").checked = false;
			document.getElementById("ThreeThree").checked = false;
			document.getElementById("ThreeFour").checked = false;
			document.getElementById("ThreeFive").checked = false;
		}
} 