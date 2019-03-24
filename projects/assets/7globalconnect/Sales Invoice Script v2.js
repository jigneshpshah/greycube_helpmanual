frappe.ui.form.on('Sales Invoice Item', {
    item_code: function(frm,cdt,cdn) {
        // do your stuff
        frm.trigger('set_items_commission_rate');
    }
});


frappe.ui.form.on("Sales Invoice", {
    commission_type: function (frm, cdt, cdn) {
        frm.trigger('set_items_commission_rate');
    },
    validate: function (frm, cdt, cdn) {
        frm.trigger('set_items_commission_rate');
    },
    items_add: function (frm, cdt, cdn) {
        frm.trigger('set_items_commission_rate');
    },

    set_items_commission_rate: function (frm) {
        let commission_type_map = {
            "Initial Sales": "initial_sales_commission",
            "Yearly Renewal": "yearly_renewal_commission",
            "Referral Fees- Initial Sales": "referral_fees"
        }


        frm.add_fetch("item_code", commission_type_map[frm.doc.commission_type], "commission_rate");
            let items = $.map(frm.doc.items, function (i) { return i.item_code });
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Item",
                    filters: {
                        "item_code": ["in", items.join(', ')],
                    },
                    fields: ["initial_sales_commission", "yearly_renewal_commission", "referral_fees", "item_code"],
                },
            }).then(function (r) {
                if (r.message) {
                    let total_commission = 0;
                    let total_base_net = 0;
                    for (let d of frm.doc.items) {
                        let item = r.message.filter(function (i) { return i.item_code == d.item_code });
                        d.commission_rate = flt(item[0][commission_type_map[frm.doc.commission_type]]);
                        total_commission += flt(d.base_net_amount) * flt(d.commission_rate / 100);
                        total_base_net +=flt(d.base_net_amount)
                    }
                    frm.refresh_field("items");
                    frm.set_value("total_commission", total_commission);
                    frm.set_value("commission_rate",flt((total_commission/total_base_net)*100,1));                    
                }
            });
    }
});
