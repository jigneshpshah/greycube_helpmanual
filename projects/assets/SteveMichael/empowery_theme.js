$(function(){
  $(".hero-and-content > .container").prepend('<div id="headerwrap"></div>');
  $(".hero-and-content .container .page-container").addClass('container');
  $("#page-homepage").removeClass('container');
  $("#page-homepage").parent().find("#headerwrap").hide();
 	if($("ul.ml-auto input.navbar-search").height()){
	 		var litxt = $("ul.ml-auto input.navbar-search").parent().parent();
			$("ul.ml-auto").append(litxt);
	 }
  
});



frappe.ready(function() {
	$("#footer-subscribe-button").click(function() {

		if($("#footer-subscribe-email").val() && valid_email($("#footer-subscribe-email").val())) {
			$("#footer-subscribe-email").attr('disabled', true);
			$("#footer-subscribe-button").html("Sending...")
				.attr("disabled", true);
			erpnext.subscribe_to_newsletter({
				email: $("#footer-subscribe-email").val(),
				callback: function(r) {
					if(!r.exc) {
						$("#footer-subscribe-button").html(__("Added"))
							.attr("disabled", true);
					} else {
						$("#footer-subscribe-button").html(__("Error: Not a valid id?"))
							.addClass("btn-danger").attr("disabled", false);
						$("#footer-subscribe-email").val("").attr('disabled', false);
					}
				}
			});
		}
		else
			frappe.msgprint(frappe._("Please enter valid email address"))
	});
});
