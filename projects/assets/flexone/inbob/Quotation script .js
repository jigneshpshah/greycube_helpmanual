frappe.ui.form.on("Quotation", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["quotation_series"]  
            },
            callback: function (data) {
				if(frm.doc.docstatus ==0)
				{
				frm.set_value("naming_series",data.message.quotation_series);
				}
		
            }
        })
    });
