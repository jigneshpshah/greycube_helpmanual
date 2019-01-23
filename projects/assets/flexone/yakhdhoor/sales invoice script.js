//default naming series
frappe.ui.form.on("Sales Invoice", "onload",
    function(frm) {
if(cur_frm.doc.docstatus == 0)
{
	frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "Company",
				filters: {"name": cur_frm.doc.company} ,//company
				fieldname :["sales_invoice_series","sales_return_series",]  
            },
            callback: function (data) 
			{
				if(typeof cur_frm.doc.is_return!== 'undefined')
				{
						if(cur_frm.doc.is_return)
						{
							//return series
							console.log("on load is  return");
										frm.set_value("naming_series",data.message.sales_return_series);
						     //check if is return from pos then change pos profile here

						}
						else
						{
							// new invoice series
							console.log("on load is  new");
							frm.set_value("naming_series",data.message.sales_invoice_series);
						}
				}
				else
				{
							// new invoice series
							console.log("on load is  new and is return is undefined " );
							frm.set_value("naming_series",data.message.sales_invoice_series);
				}
		      
			}

		});
}
});


//naming series on company change
if(!cur_frm.doc.is_return)
{
console.log("is not return");
cur_frm.add_fetch("company","sales_invoice_series","naming_series"); // sales invoice series 		
}
if(cur_frm.doc.is_return)
{
console.log("is simple return");
cur_frm.add_fetch("company","sales_return_series","naming_series"); // sales invoice series 		
}
		
//for yakhdhoor app
frappe.ui.form.on('Sales Invoice', {
    customer: function (frm) {
        var df = frappe.meta.get_docfield("Sales Invoice", "customer_branch", frm.doc.name);
        df.options = [];
        if (frm.doc.customer != null) {
            frappe.call({
                method: "yakhdhoor.yakhdhoor.api.get_customer_branch",
                args: {
                    customer: frm.doc.customer
                },
                callback: function (r) {
                    if (r.message) {
                        var holder = []
                        r.message.forEach(function (element) {
                            holder.push(element.customer_branch)
                        });
                        df.options = holder;
                    } else {
                        df.options = [];
                    }
                }
            })
        }
    }
});
