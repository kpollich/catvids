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

	$.ajax({
		url: api + "getVideoByVidId/" + vidId,
		async:false,
		dataType: 'json',
		success: function(data){
			vidJSON = data;
		}
	});

	return vidJSON;

	
}

});