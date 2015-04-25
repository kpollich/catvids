$(document).ready(function(){

	var vidTitle = $.url().param("vidID");
	console.log(vidTitle);
	$("#video-title").text(vidTitle);


});