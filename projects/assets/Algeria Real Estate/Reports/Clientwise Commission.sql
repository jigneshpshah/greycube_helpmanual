select PT.customer AS "Client:Text:150",
SUM(
CASE WHEN PT.is_paid_by_client = 0
THEN PT.commission_from_client
ELSE 0
END) AS "Client Unpaid:Currency:150",
SUM(
CASE WHEN PT.is_paid_by_client = 1
THEN PT.commission_from_client
ELSE 0
END) AS "Client Paid:Currency:150"
from `tabProperty Transaction` PT 
group by PT.customer;
