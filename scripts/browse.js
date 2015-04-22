function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}


$(document).ready( function() {
	$(".post-hover").click( function() {
		$(this).parent().nextAll(".expand-video").slideToggle("slow", function() {
		});
	});

	$(".upmeow").click ( function() {
		  $(this).rotate({animateTo:360});
		  $(this).parent().find(".upmeow-text").css("background-color", "orange");
	});

	$(".downmeow").click ( function() {
		  $(this).rotate({animateTo:180});
		  $(this).nextAll(".downmeow-text").css("background-color", "cyan");
	});

	getPopularVideos($("#video-list"));	
});

function getPopularVideos (appendToId) {

	var api = "http://floyd.cs.millersville.edu:8080/getPopularVideos";

	$.getJSON (api, function (data) {
		$.each (data, function (key, val) {

			var voteContainer = '<div class="vote-container">\
								 <span class="upmeow-text>' + val.UpMeows + '</span>\
								 <img class="upmeow" title="UpMeow this post! Purr!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30"\
								 <img class="downmeow" title="DownMeow this post! Hiss!" src="../img/Giant-Cat-Head-1.jpg" height="30" width="30">\
								 <span class="downmeow-text">' + val.DownMeows + '</span>';

			var vidTitle = '<span class="post-hover">' + val.Title + '</span></div>';

			var vidLiElements = '<li class="tags">Tags: ' + val.Tags + '</li>\
								<li class="expand-video">\
									<iframe width="640" height="360" src="https://www.youtube.com/embed/' + getId(val.Url) + '" frameborder="0" allowfullscreen></iframe>\
								</li>';

			$(appendToId).append("<li>" + voteContainer + vidTitle + vidLiElements + "</li>");
		});
	});
}