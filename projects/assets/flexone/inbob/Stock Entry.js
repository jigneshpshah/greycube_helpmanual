frappe.ui.form.on("Stock Entry", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["stock_entry_series"]  
            },
            callback: function (data) {
				if(frm.doc.docstatus ==0)
				{
               frm.set_value("naming_series",data.message.stock_entry_series);
				}
		
            }
        })
    });
