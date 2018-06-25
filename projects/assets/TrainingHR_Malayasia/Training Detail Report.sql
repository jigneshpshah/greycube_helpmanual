select
  employee AS "Employee:Link/Employee:80",
  employee_name AS "Employee Name: Text:150",
  SUM(TE.total_hours) AS "Training Hours:Int:100",	
  count(TE.name) AS "Training Count:Int:100",
  sum(TE.training_cost) /(SELECT COUNT(*) from `tabTraining Event Employee` TEE where TEE.parent= TE.name
  and TE.event_status != "Cancelled") as "Training Expense :Currency:130"
from
  `tabTraining Event Employee` as TEE
  INNER JOIN `tabTraining Event` AS TE ON TEE.parent = TE.name
and TE.docstatus = 1
group by
 TEE.employee
having
  count(TE.name) > 0
order by  TEE.employee_name;

