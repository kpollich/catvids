function getPopularVideos (appendToId) {

		//var api = "http://floyd.cs.millersville.edu:8080/getPopularVideos";
		var api = "http://192.168.0.5:8080/getPopularVideos";

		$.getJSON (api, function (data) {
			$.each (data, function (key, val) {

				var voteContainer = '<div class="video-link" id="' + val.CatVidId + '">\
									 <div class="vote-container">\
									 <span class="upmeow-text">' + val.UpMeows + '</span>\
									 <img class="upmeow" title="UpMeow this post! Purr!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">\
									 <img class="downmeow" title="DownMeow this post! Hiss!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">\
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
											<a href="../comment/index.html?vidId=' + val.CatVidId + '">Comment on this video</a>\
										</li>';

				$(appendToId).append('<ul id="video-list"><li>' + voteContainer + vidTitle + vidPostedBy + vidLiElements + vidCommentsLink + '</li></ul>');
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

//Load popular videos via catDB API
getPopularVideos($("#videos-wrapper"));	
	
$("body").on ("click", ".upmeow", function() {
	  $(this).rotate({animateTo:360});
	  $(this).parent().find(".upmeow-text").css("background-color", "orange");
});

$("body").on ("click", ".downmeow", function() {
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
			<li class="expand-video"><iframe width="640" height="360" src="https://www.youtube.com/embed/gppbrYIcR80?feature=player_detailpage" frameborder="0" allowfullscreen></iframe></li>
		</li>
	</ul>

*/