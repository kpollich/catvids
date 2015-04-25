$(document).ready(function(){

	var api = "http://192.168.0.5:8080/getVideoById?catVidId="

	//grab the url query string and parse it for the Vid ID
	var pathname = $(location).attr("search");
	console.log(pathname);
	/*if(pathname == ""){
		console.error("haha wat");
	}*/
	var vidId = pathname.substring(pathname.lastIndexOf("=")+1);
	console.log(" vid ID: " +vidId);
	if (vidId == -1 || vidId == ""){
		console.log("Hey some shit went wrong I guess.");
	
	
	}else{
	document.title = vidId + " " + document.title;


	$("#video-title").text("Video #"+vidId);
	}
});