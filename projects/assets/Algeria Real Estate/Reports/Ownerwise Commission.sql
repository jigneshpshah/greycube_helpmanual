select P.customer AS "Owner:Text:150",
SUM(
CASE WHEN PT.is_paid_by_owner = 0
THEN PT.commission_from_owner
ELSE 0
END) AS "Owner Unpaid:Currency:150",
SUM(
CASE WHEN PT.is_paid_by_owner = 1
THEN PT.commission_from_owner
ELSE 0
END) AS "Owner Paid:Currency:150"
from `tabProperty Transaction` PT 
INNER JOIN `tabProperty` P
ON P.name = PT.property
group by P.customer;
