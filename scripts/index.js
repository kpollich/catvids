$(document).ready(function() {
	$("#submit-search").one("click", function(event) {
		var angle = 0;
		setInterval(function(){
      		angle+=3;
     		$(".cat-head").rotate(angle);
		},10);
	});

	/*$(".search-button").hover(
		function() {
			$(this).addClass("search-button-shadow");
		},
		functon() {
			$(this).removeClass("search-button-shadow");
		});*/

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