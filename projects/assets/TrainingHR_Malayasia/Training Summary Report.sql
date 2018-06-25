select 
event_name AS "Training Event :Text:200" , 
type as "Type:Text:100",
has_certificate AS "Has Certificate:Check:80",
level AS "Level:Text:100",
event_status AS "Status:Text:80", 
total_hours AS "Total Hours:Int:80", 
training_cost AS "Training Cost:Currency:100", 
(SELECT COUNT(*) from `tabTraining Event Employee` TEE where TEE.parent= TE.name) AS "Employees Count:Int:120",
(training_cost/(SELECT COUNT(*) from `tabTraining Event Employee` TEE where TEE.parent= TE.name)) AS "Average Cost:Currency:100",
trainer_name AS "Trainer:Text:100",
trainer_email AS "Email:Text:100",
contact_number AS "Contact:Text:80"
from `tabTraining Event` TE
where TE.docstatus= 1
order by TE.name desc;


