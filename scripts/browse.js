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
});