frappe.ui.form.on("Sales Invoice", "onload",
    function(frm,cdt,cdn) {
if (frm.doc.docstatus == 0)
{
	$.each(frm.doc.items || [], function(i, v) {
					if(v.sales_order && !v.cost_center)					
					frappe.model.set_value(v.doctype, v.name,"cost_center",locals["Sales Order"][v.sales_order].cost_center)
							
				})
				frm.refresh_field('items');
		//fetch sales_type value from sales_order and set it to sales_type of sales_invoice
		if(cdt.sales_order && !cdt.sales_type)
			{
				frappe.model.set_value(cdt,cdn,"sales_type",locals["Sales Order"][v.sales_order].sales_type);
			}
			frm.refresh_field('sales_type');
			//set is_pos 1 if sales_type = cash
				if(frm.doc.sales_type == "Cash")
			{
				frm.set_value("is_pos",1);
			}
			else
			{
				frm.set_value("is_pos",0);
			}
		
}		
frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
		filters: {"name": frappe.user.name} ,//user is current user here
		fieldname :["sales_invoice_series","sales_return_series"]  
            },
            callback: function (data) {
	
			if (frm.doc.docstatus == 0)
			{
              if(typeof frm.doc.is_return!== 'undefined')
			{
			if(frm.doc.is_return)
			{
			 frm.set_value("naming_series",data.message.sales_return_series);// for sales return
			}
			else
			{	
			 frm.set_value("naming_series",data.message.sales_invoice_series); //  for sales invoice
			}
			}
			else
			{	
			 frm.set_value("naming_series",data.message.sales_invoice_series); //  for sales invoice
			}	
			
            }
	}}
		)
    });
	
//set pos value to 1 is sales_type = cash	
frappe.ui.form.on("Sales Invoice", "sales_type", function (frm, cdt, cdn) {
	if(frm.doc.sales_type == "Cash")
	{
		frm.set_value("is_pos",1);
	}
	else
	{
		frm.set_value("is_pos",0);
	}
});
