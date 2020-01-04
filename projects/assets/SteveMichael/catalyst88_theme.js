<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFHGP8G"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


frappe.ready(function() {
	$("#footer-subscribe-button").click(function() {

		if($("#footer-subscribe-email").val() && validate_email($("#footer-subscribe-email").val())) {
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
