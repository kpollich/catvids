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

$(document).ready(function() {

/*************EVENT HANDLERS**************************************************************/	
	$("#submit-search").one("click", function(event) {
		var angle = 0;
		setInterval(function(){
      		angle+=3;
     		$(".cat-head").rotate(angle);
		},10);
	});

	$("#submit-random").on("click", function(event) {
		event.preventDefault();
		var api = "http://floyd.cs.millersville.edu:8080/randomVideo"
		$.getJSON( api, function ( data ) {
		
			var embed = getId(data.Url);

			$("#randomVideoContainer").empty();

			$("#randomVideoContainer").append('<iframe id="appendedRandomVid" width="560" height="315" src="https://www.youtube.com/embed/' + embed + '" frameborder="0" allowfullscreen></iframe>');

		});
	});

/****************************************************************************************/
	
});