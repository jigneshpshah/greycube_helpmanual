select 
event_name AS "Training Event :Text:200" , 
type as "Type:Text:120",
has_certificate AS "Has Certificate:Check:80",
level AS "Level:Text:100",
training_cost AS "Training Cost:Currency:120", 
total_hours AS "Total Hours:Int:80", 
event_status AS "Status:Text:100", 
count(TEE.name) AS "Employees Count:Int:100",
trainer_name AS "Trainer:Text:100",
trainer_email AS "Email:Text:100",
contact_number AS "Contact:Text:80"
from `tabTraining Event` TE 
inner join `tabTraining Event Employee` TEE 
ON TE.name = TEE.parent;
