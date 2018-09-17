// User Selects Commission_Type in parent , based on that for each child items, commission rate is fetched from item table and set here
//
frappe.ui.form.on("Sales Invoice", {
    validate: function (frm) {
        var commission_type
        var item_commission_rate

        //get field name as per commission type
        if (frm.doc.commission_type == "Initial Sales") {
            commission_type = "initial_sales_commission"
        } else if (frm.doc.commission_type == "Yearly Renewal") {
            commission_type = "yearly_renewal_commission"
        } else if (frm.doc.commission_type == "Referral Fees- Initial Sales") {
            commission_type = "referral_fees"
        }

        //loop through child table
        $.each(frm.doc.items || [], function (i, v) {
            frappe.run_serially([
                () => {
                    frappe.call({
                        method: 'frappe.client.get_value',
                        args: {
                            'doctype': 'Item',
                            'filters': {
                                'item_code': v.item_code
                            },
                            'fieldname': [
                                commission_type,
                            ]
                        },
                        callback: function (r) {
                            if (!r.exc) {
                                if (r.message) {
                                    rate = Object.values(r.message)[0]
                                    frappe.model.set_value(v.doctype, v.name, "commission_rate", rate)
setTimeout(function(){ alert("Hello"); }, 10000);
console.log('after 10')
                                }
                            }
                        }
                    })
                }
            ]);

        })
        frm.refresh_field('items');
;
    },
    commission_type: function (frm, cdt, cdn) {
        if (frm.doc.commission_type == "Initial Sales") {
            frm.add_fetch("item_code", "initial_sales_commission", "commission_rate");
        } else if (frm.doc.commission_type == "Yearly Renewal") {
            frm.add_fetch("item_code", "yearly_renewal_commission", "commission_rate");
        } else if (frm.doc.commission_type == "Referral Fees- Initial Sales") {
            frm.add_fetch("item_code", "referral_fees", "commission_rate");
        }
    }
});
