frappe.ui.form.on("Material Request", "onload",
    function(frm) {	
	frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["material_request_series"]  
            },
            callback: function (data) {
			
			if(frm.doc.docstatus == 0)
			{
			 frm.set_value("naming_series",data.message.material_request_series);
			}
		
            }
        })
    });
	
	
