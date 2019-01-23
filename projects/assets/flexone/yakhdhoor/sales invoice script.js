//default naming series
if(typeof cur_frm.doc.is_return!== 'undefined')
{
	if(frm.doc.is_return)
		{
		cur_frm.add_fetch("company","sales_return_series","naming_series"); //sales return series
		}
	else
	{
	cur_frm.add_fetch("company","sales_invoice_series","naming_series"); // sales invoice series 
	}
}
else
{
	cur_frm.add_fetch("company","sales_invoice_series","naming_series"); // sales invoice series 
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
