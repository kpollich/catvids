$(document).ready(function(){

	//grab the url query string and parse it for the Vid ID
	var pathname = $(location).attr("search");
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
			showSingleVideo('../',$("#video-wrapper"),vidJSON);

		}
	});

	return vidJSON;

	
}
$("#comment-form").submit(function(event){

	event.preventDefault();

	$("#catvidID").val(vidId);
	var postData = $(this).serializeArray();
	console.log(postData);	
	$.ajax({
        type: 'POST',
        url: api + "postComment",
        data: postData,
        dataType: 'json',
        complete: function(json) {
         	$("#comment").val("");
         	$("#userName").val("");
         	$("#comment-wrapper").append(json);

          }
        });
    });
});