//Load popular videos via catDB API
getPopularVideos($("#videos-wrapper"));	

$("body").on ("click", ".toggle-video", function() {
	$(this).parent().nextAll('.expand-video').toggle();
});
