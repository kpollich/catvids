$(document).ready(function(){

	//grab the url query string and parse it for the Vid ID
	var pathname = $(location).attr("search");
	console.log(pathname);
	var vidId = pathname.substring(pathname.lastIndexOf("=")+1);
	if (vidId == -1 || vidId == ""){
		console.log("Hey some shit went wrong I guess.");
	
	
	}else{
	var video = getVideoById(vidId);
	document.title = video.Title + " " + document.title;
	$("#video-title").text(video.Title);
	}


function getVideoById(vidId){
	var vidJSON;
	//var api = "http://192.168.0.5:8080/randomVideo";
	var l_api = api + "getVidByVidId/" + vidId;


	$.ajax({
		url:api,
		async:false,
		dataType: 'json',
		success: function(data){
			vidJSON = data;
		}
	});

	return vidJSON;

	
}

});