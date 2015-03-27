$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$(document).ready( function() {
	$("#post-video-form").submit( function(e) {
		e.preventDefault();
		var data = JSON.stringify($(this).serializeObject());
		$("#result").text(data);

		//Do API call with JSON data here

		//Redirect user after clicking submit
		//NOTE: This isn't a true form submit (there is no action page required)
		//We're really just shuffling JSON around 
	});
});