select 
P.property_name AS "Property:Text:150", 
P.property_type AS "Property Type:Text:120",
P.property_status AS "Property Status:Text:150",
PT.transaction_status AS "Transaction Status:Text:150",
PT.rent_price AS "Rent Price:Currency:120",
PT.customer AS "Client:Text:100",
PT.telephone AS "Telephone:Text:100",
PT.customer_email AS "Email:Text:120",
PT.commission_from_client AS "Commission From Client:Currency:170",
IF(PT.is_paid_by_client , 'Yes', 'No')AS " Paid by Client:Text:100",
P.customer AS "Property Owner:Text:120",
P.telephone AS "Owner Contact:Text:120",
P.email  AS "Owner Email:Text:100",
PT.commission_from_owner AS "Commission From Owner:Currency:170",
IF(PT.is_paid_by_owner , 'Yes', 'No')AS "Paid by Owner:Text:120"
from `tabProperty`AS P INNER JOIN
`tabProperty Transaction` AS PT 
ON PT.property = P.name 
and PT.docstatus = 1;
