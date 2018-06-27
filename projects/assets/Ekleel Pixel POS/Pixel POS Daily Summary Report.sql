SELECT "Income Breakup" As "Description:Text:250" , null as "Amount:Currency:150"
union all
select JEA.account  , TRUNCATE(JEA.credit,3)  from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Food Income - ER","Beverage Income - ER")

union all
select "Total Income" as `Description`,  TRUNCATE(sum(JEA.credit),3) as `Amount` from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Food Income - ER","Beverage Income - ER")

union all
SELECT "Payment Modewise Breakup" , null
union all
select JEA.PARTY as `Description`,  TRUNCATE(JEA.debit,3) as `Amount` from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Debtors - ER")
group by JEA.PARTY

union all
SELECT "Cost of Goods Sold" , null

union all
select JEA.account as `Description`,  TRUNCATE(JEA.debit,3) as `Amount` from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Cost of Food - ER","Cost of Beverage - ER")

union all
SELECT "Supplier-wise Purchase" , null

union all
select JEA.PARTY as `Description`, ROUND(JEA.credit,3) as `Amount` from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Creditors - ER")
group by JEA.PARTY

union all
select "Total Purchase" as `Description`,  TRUNCATE(sum(JEA.credit),3) as `Amount` from `tabJournal Entry` JE INNER JOIN
`tabJournal Entry Account` JEA on JE.name = JEA.parent
where 
JE.posting_date =  ADDDATE(CURDATE(), INTERVAL -1 DAY)and 
JE.company = "Ekleel Restaurant" and JE.docstatus=1 and
JEA.account in ("Creditors - ER");
