$(document).ready(function() {
	$("#submit-search").on("click", function(event) {
		var angle = 0;
		setInterval(function(){
      		angle+=3;
     		$(".cat-head").rotate(angle);
},10);
	});
});