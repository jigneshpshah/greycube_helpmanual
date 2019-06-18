select 
si.posting_date as "InvoiceDate",
si.name as "Invoice:Link/Sales Invoice:80",
si.customer as "Customer:Link/Customer:150",
concat_ws('', ta.address_line1, ta.address_line2) as "Address:Data:150",
coalesce(ta.City,'') as "City::",
coalesce(ta.State,'') as "State::",
if(coalesce(si.base_total_taxes_and_charges-coalesce(shipping.tax,0),0) > 0,'YES','NO') as "TaxCollected::",
coalesce(c.customers_license,'N/A') as "License:Data:80",
si.base_net_total as "GrossTotal:Float:80",
st.head "ST", 
st.tax "ST Tax:Float:80", 
tt.head "TT", 
tt.tax as "TT Tax:Float:80",
round(coalesce(item.total_weight,0),2) as "WeightinKG:Float:100",
round(coalesce(item.total_weight,0)*2.20462,2) as "WeightinLB:Float:100"
from `tabSales Invoice` si
left outer join (select sum(total_weight) total_weight,parent from `tabSales Invoice Item` where item_group <> 'ZOMO CHARCOAL' group by parent) item on item.parent=si.name
inner join tabCustomer c on c.name = si.customer
left outer join tabAddress ta on ta.name = si.customer_address
left outer join (
select parent, group_concat(account_head separator ',') head, sum(coalesce(base_tax_amount,0)) tax
from `tabSales Taxes and Charges` st
where account_head like 'Salex.Tax%%'
group by parent
) st on st.parent = si.name
left outer join (
select parent, group_concat(account_head separator ',') head, sum(coalesce(base_tax_amount,0)) tax
from `tabSales Taxes and Charges` st
where account_head like 'Tobacco.Tax%%'
group by parent
) tt on tt.parent = si.name
left outer join (
select parent, sum(coalesce(base_tax_amount,0)) tax
from `tabSales Taxes and Charges` st
where account_head like 'Shipping%%'
group by parent
) shipping on  shipping.parent = si.name
WHERE si.docstatus=1 
AND si.posting_date >= %(from_date)s and si.posting_date <= %(to_date)s
order by si.posting_date, si.name
