frappe.ui.form.on("Payment Entry", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["payment_entry_series","payment_pay_series"]  
            },
            callback: function (data) {
		if(frm.doc.docstatus ==0)
		{
		if(frm.doc.payment_type == "Receive")
		{
               	frm.set_value("naming_series",data.message.payment_entry_series);
		}
		else
		{
               	frm.set_value("naming_series",data.message.payment_pay_series);
		}
		}
		
            }
        })
    });
frappe.ui.form.on("Payment Entry", "payment_type",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["payment_entry_series","payment_pay_series"]  
            },
            callback: function (data) {
		if(frm.doc.docstatus ==0)
		{
		if(frm.doc.payment_type == "Receive")
		{
               	frm.set_value("naming_series",data.message.payment_entry_series);
		}
		else
		{
               	frm.set_value("naming_series",data.message.payment_pay_series);
		}
		}
            }
        })
    });
