select
  employee AS "Employee:Link/Employee:200",
  count(TE.name) AS "Training Count:Int:100",
  sum(TE.training_cost) / count(TEE.name) as "Average Cost:Currency:150"
from
  `tabTraining Event Employee` as TEE
  INNER JOIN `tabTraining Event` AS TE ON TEE.parent = TE.name
group by
  TEE.employee
having
  count(TE.name) > 0;
