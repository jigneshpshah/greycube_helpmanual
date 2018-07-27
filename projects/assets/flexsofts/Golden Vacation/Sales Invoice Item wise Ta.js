frappe.ui.form.on('Sales Invoice', {
    validate: function(doc, dt, dn) {
        for (i = 0; i < cur_frm.doc.items.length; i++) {

            if (Object.keys(JSON.parse(cur_frm.doc.items[i].item_tax_rate)).length != 0) {
                var itemtaxrate = Object.values(JSON.parse(cur_frm.doc.items[i].item_tax_rate))[0];
                cur_frm.doc.items[i].line_tax_rate = itemtaxrate;
                cur_frm.doc.items[i].line_tax_amount = (cur_frm.doc.items[i].amount * itemtaxrate) / 100;
                       cur_frm.doc.items[i].line_total_tax_amount=cur_frm.doc.items[i].line_tax_amount+cur_frm.doc.items[i].amount;

            } else {
                cur_frm.doc.items[i].line_tax_rate = 0;
                cur_frm.doc.items[i].line_tax_amount = 0.0;
            }
        }
    },
    branch:function(doc, dt, dn) {
                                if(cur_frm.doc.branch){
                                    frappe.call({
                                                method: "frappe.client.get",
                                                args: {
                                                                doctype: "Branch",
                                                                filters: {"name":cur_frm.doc.branch}    
                                                },
                                                callback: function(r) {
                                                                for (i = 0; i < cur_frm.doc.items.length; i++) {
                                                                                cur_frm.doc.items[i].cost_center = r.message.cost_center                                                                            
                                                                }
                                                                
                                                }
                                   })
                                }
    }
});
