function getPopularVideos (appendToId) {

		//var api = "http://floyd.cs.millersville.edu:8080/getPopularVideos";
		var api = "http://192.168.0.5:8080/getPopularVideos";
		$.getJSON (api, function (data) {
			$.each (data, function (key, val) {

				var voteContainer = '<div class="video-link" id="' + val.VidId + '">\
									 <div class="vote-container">\
									 <span class="upmeow-text">' + val.UpMeows + '</span>\
									 <img class="upmeow" title="UpMeow this post! Purr!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">\
									 <img class="downmeow" title="DownMeow this post! Hiss!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">\
									 <span class="downmeow-text">' + val.DownMeows + '</span></div>';

				var vidTitle = '<span class="post-hover">' + val.Title + '</span></div>';

				var embed = getId(val.Url);

				var vidLiElements = '<li class="tags">Tags: ' + val.Tags + '</li>\
									<li class="expand-video">\
										<iframe width="560" height="315" src="https://www.youtube.com/embed/' + embed + '" frameborder="0" allowfullscreen></iframe>\
									</li>';

				$(appendToId).append('<ul id="video-list"><li>' + voteContainer + vidTitle + vidLiElements + '</li></ul>');
		});
	});
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function upMeowVideo(catVidId) {
		
	$.ajax({
    	url: api +"/upMeow/" + catVidId,
    	type: 'PUT',
    	success: function(result) {
            console.log("upMeowed");

    	}
    });
}	

function downMeowVideo(catVidId) {

	$.ajax({
    	url: api + "/donwnMeow/" + catVidId,
    	type: 'PUT',
    	success: function(result) {
        	console.log("downMeowed");
    	}
    });
}

//Load popular videos via catDB API
getPopularVideos($("#videos-wrapper"));	
	
$(".post-hover").on("click", function() {
	console.log($(this));
	$(this).parent().nextAll(".expand-video").slideToggle("slow", function() {});
});

$(".upmeow").on ("click", function() {
	  $(this).rotate({animateTo:360});
	  $(this).parent().find(".upmeow-text").css("background-color", "orange");
	  var catVidId = $(this).parent.parent.id;
	  console.log(catVidId);
});

$(".downmeow").on ("click", function() {
	  $(this).rotate({animateTo:180});
	  $(this).nextAll(".downmeow-text").css("background-color", "cyan");
});



/*

<ul id="video-list">
		<li>
			<div class="video-link">
				<div class="vote-container">
					<span class="upmeow-text">666</span>
					<img class="upmeow" title="UpMeow this post! Purr!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">
					<img class="downmeow" title="DownMeow this post! Hiss!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">
					<span class="downmeow-text">420</span>
				</div>
				<span class="post-hover">Kittens on a slide! Mega cute!</span>
			</div>
			<li class="tags">Tags: cute, kittens, slide</li>
			<li class="expand-video"><iframe width="640" height="360" src="https://www.youtube.com/embed/gppbrYIcR80?feature=player_detailpage" frameborder="0" allowfullscreen></iframe></li>
		</li>
	</ul>

*/