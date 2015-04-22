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
		console.log(data);

		console.log(data.Title);

		var embed = getId(data.Url);

		console.log(embed);

		$("#randomVideoContainer").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/"' + embed + 'frameborder="0" allowfullscreen></iframe>');

		//console.log($)

		//console.log(video);


		});
	});

/****************************************************************************************/
	//Typeahead Stuff
	var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
	var matches, substrRegex;
	 
	// an array that will be populated with substring matches
	matches = [];
	 
	// regex used to determine if a string contains the substring `q`
	substrRegex = new RegExp(q, 'i');
	 
	// iterate through the pool of strings and for any string that
	// contains the substring `q`, add it to the `matches` array
	$.each(strs, function(i, str) {
		if (substrRegex.test(str)) {
		// the typeahead jQuery plugin expects suggestions to a
		// JavaScript object, refer to typeahead docs for more info
			matches.push({ value: str });
			}
		});
		cb(matches);
		};
	};
	 
	//Replace this array with one created via the Catabases API that contains
	//all categories
	var categories = ['funny', 'silly', 'cute', 'kitten', 'baby', 'dog', 'cat', 'old', 'bath', 'adorable',
				  'the dark lord will rise again', 'playing', 'sad', 'amazing', 'wow', 'incredible'
				 , 'awesome', 'fun', 'stupid', 'pretty', 'group', 'music', 'catnip', 'friends', 'story'
				 , 'stuck in tree'
	];
	 
	$('.typeahead').typeahead({
			hint: false,
			highlight: true,
			minLength: 2,
		},
		{
			name: 'categories',
			displayKey: 'value',
			source: substringMatcher(categories)
	}); 
/****************************************************************************************/



});