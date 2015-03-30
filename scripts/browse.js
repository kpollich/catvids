$(document).ready( function() {
	$(".video-link").click( function() {
		console.log($(this).next());
		$(this).nextAll(".expand-video").slideToggle("slow", function() {
		});
	});
});