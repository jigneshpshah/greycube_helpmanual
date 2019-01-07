Sales Order

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
               frm.set_value("naming_series",data.message.sales_order_series);
               frm.set_value("cost_center",data.message.cost_center);
		
            }
        })
    });


frappe.ui.form.on('Sales Order Item', {
    "item_code": function(frm) {
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
  });
  
  
  ============================================
  Sales Invoice
  ======================================
  frappe.ui.form.on("Sales Invoice", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["sales_invoice_series"]  
            },
            callback: function (data) {
               frm.set_value("naming_series",data.message.sales_invoice_series);
		
            }
        })
    });
    
    ====================================================
    Quotation
    ====================================================
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
               frm.set_value("naming_series",data.message.quotation_series);
		
            }
        })
    });
    
    
    ======================================================
    Payment Entry
    ======================================================
    frappe.ui.form.on("Payment Entry", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["payment_entry_series"]  
            },
            callback: function (data) {
               frm.set_value("naming_series",data.message.payment_entry_series);
		
            }
        })
    });
    ======================================================
    Journal Entry
    ======================================================
    frappe.ui.form.on("Journal Entry", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["journal_entry_series"]  
            },
            callback: function (data) {
               frm.set_value("naming_series",data.message.journal_entry_series);
		
            }
        })
    });
    
    
    ==============================================================
    
    Stock Entry
    =====================================================
    
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
               frm.set_value("naming_series",data.message.stock_entry_series);
		
            }
        })
    });
    
    ===============================================================
    
    Delivery Note Series
    ================================================================
    
    frappe.ui.form.on("Delivery Note", "onload",
    function(frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["delivery_note_series"]  
            },
            callback: function (data) {
               frm.set_value("naming_series",data.message.delivery_note_series);
		
            }
        })
    });
    
