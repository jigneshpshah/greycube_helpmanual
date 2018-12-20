frappe.ui.form.on("Sales Order",{
	validate: function(frm) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "User",
				filters: {"name": frappe.user.name} ,//user is current user here
				fieldname :["warehouse"]   
			},
			callback: function(r) {
				$.each(frm.doc.items || [], function(i, v) {
					frappe.model.set_value(v.doctype, v.name,"warehouse",r.message.warehouse)
										
				})
				frm.refresh_field('items');
			}
		})
	}
})
