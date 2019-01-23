frappe.ui.form.on("Sales Order", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["cost_center","warehouse","sales_order_series"]  
            },
            callback: function (data) {
		if(frm.doc.docstatus == 0)
		{
               frm.set_value("naming_series",data.message.sales_order_series);
               frm.set_value("cost_center",data.message.cost_center);
		}
		
            }
        })
    });


frappe.ui.form.on("Sales Order",{
	item_warehouse: function(frm,cdt,cdn) {
        if (frm.doc.item_warehouse) {
			$.each(frm.doc.items || [], function(i, v) {
					frappe.model.set_value(v.doctype, v.name,"warehouse",frm.doc.item_warehouse)
										
				})
				frm.refresh_field('items');
        }
	}
});

frappe.ui.form.on("Sales Order",{
	validate: function(frm,cdt,cdn) {
        if (frm.doc.item_warehouse) {
			$.each(frm.doc.items || [], function(i, v) {
					frappe.model.set_value(v.doctype, v.name,"warehouse",frm.doc.item_warehouse)
										
				})
				frm.refresh_field('items');
        }
	}
});
