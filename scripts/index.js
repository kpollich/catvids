//GOT THIS HERE THANKS http://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}


var api = "http://192.168.0.5:8080";

function getVideos(appendToId,urlRoute,getData) {
		$.getJSON (api+urlRoute,{tags:getData}, function (data) {
			$.each (data, function (key, val) {
				var voteContainer = '<div class="video-link" id="' + val.CatVidId + '">\
									 <div class="vote-container">\
									 <span class="upmeow-text">' + val.UpMeows + '</span>\
									 <img class="upmeow" title="UpMeow this post! Purr!" src="img/Giant-Cat-Head-1.jpg" height="30" width="30">\
									 <img class="downmeow" title="DownMeow this post! Hiss!" src="img/Giant-Cat-Head-1.jpg" height="30" width="30">\
									 <span class="downmeow-text">' + val.DownMeows + '</span></div>';

				var vidTitle = '<span class="post-hover">' + val.Title + '</span>';

				var vidPostedBy = '<span class="posted-by"> Posted by: ' + val.Poster + '</span></div>'

				var embed = getId(val.Url);

				var vidLiElements = '<li class="expand-video">\
										<iframe width="560" height="315" src="https://www.youtube.com/embed/' + embed + '" frameborder="0" allowfullscreen></iframe>\
									</li>';

				
									//<a href="../comment/index.html?vidId=69">Comment on this video</a>
									//<a href="../comment/index.html?vidId=' + val.VidId + '">Comment on this video</a>\
				var vidCommentsLink = '<li class="comment-li">\
											<a href="/comment/index.html?vidId=' + val.CatVidId + '">Comment on this video</a>\
										</li>';

				$(appendToId).append('<ul id="video-list"><li>' + voteContainer + vidTitle + vidPostedBy + vidLiElements + vidCommentsLink + '</li></ul>');

				$("#"+val.CatVidId).one("click", ".upmeow", function() {
	  				$(this).rotate({animateTo:360});
	  				$(this).parent().find(".upmeow-text").css("background-color", "orange");
	  				var catVidId = $(this).parent().parent().attr('id');
	 				upMeowVideo(catVidId);
	 				//add 1 to upmeow
	  				var newVote = Number($(this).parent().find(".upmeow-text").text()) + 1;
	  				$(this).parent().find(".upmeow-text").text(newVote);			
				});

				$("#"+val.CatVidId).one("click", ".downmeow", function() {
	  				$(this).rotate({animateTo:180});
	  				$(this).nextAll(".downmeow-text").css("background-color", "cyan");
	  				var catVidId = $(this).parent().parent().attr('id');
	  				downMeowVideo(catVidId);
	  				//add 1 to downmeow
	  				var newVote = Number($(this).parent().find(".downmeow-text").text()) + 1;
	  				$(this).parent().find(".downmeow-text").text(newVote);
				});
		});
	});
}

function upMeowVideo(catVidId) {	
	$.ajax({
    	url: api +"/upMeow/" + catVidId,
    	method: "PUT",
    	//crossDomain : true,
    	success: function(result) {
    		//turn off other option
    		$("#"+catVidId).off("click", ".downmeow");
    	}
    });
}	

function downMeowVideo(catVidId) {
	$.ajax({
    	url: api + "/downMeow/" + catVidId,
    	type: 'PUT',
    	success: function(result) {
    		//turn off other option
    		$("#"+catVidId).off("click", ".upmeow");
    	}
    });
}

$(document).ready(function() {

/*************EVENT HANDLERS**************************************************************/	
	
	$(".search-button").one("click", function(event) {
		var angle = 0;
		setInterval(function(){
      		angle+=3;
     		$(".cat-head").rotate(angle);
		},10);
	});


	//for search by user
	$("#submit-search-byUser").on("click", function(event){
		event.preventDefault();
		$("#videoContainer").empty();
		var userName = $("body").find("#searchbar").val();
		getVideos($("#videoContainer"),"/getVideosByUser/"+userName,"what")
	});

	//for search by user
	$("#submit-search-tags").on("click", function(event){
		event.preventDefault();
		$("#videoContainer").empty();
		var tags = $("body").find("#searchbar").val();
		getVideos($("#videoContainer"),"/getVideosByTags",tags)

	});

	//for all videos
	$("#submit-allVideos").on("click", function(event){
		event.preventDefault();
		$("#videoContainer").empty();
		getVideos($("#videoContainer"),"/getAllVideos","what")
	});

	$("#submit-random").on("click", function(event) {
		event.preventDefault();
		$.getJSON( api +"/randomVideo", function ( data ) {
			var embed = getId(data.Url);
			$("#videoContainer").empty();
			$("#videoContainer").append('<iframe id="appendedRandomVid" width="560" height="315" src="https://www.youtube.com/embed/' + embed + '" frameborder="0" allowfullscreen></iframe>');
		});
	});

/****************************************************************************************/
});