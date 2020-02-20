SELECT
    tlc.permit_number as 'topmostSubform[0].Page1[0].TTBpermit[0]',
    tlc.phone as 'topmostSubform[0].Page1[0].Phone[0]',
    tlc.employer_identification_number as 'topmostSubform[0].Page1[0].empID[0]',
    tlc.email as 'topmostSubform[0].Page1[0].emailaddress[0]',
    tlc.month as 'topmostSubform[0].Page1[0].month[0]',
    tlc.year as 'topmostSubform[0].Page1[0].activityyear[0]',
    CONCAT_WS(
        '\n',
        tlc.address_line1,
        tlc.address_line2,
        tlc.zipcode,
        tlc.us_state
    ) as 'topmostSubform[0].Page1[0].compname[0]',
    tlc.legal_head as 'topmostSubform[0].Page1[0].contactname[0]',
    MTIW.mti_w + PRW.p_weight  as 'topmostSubform[0].Page2[0].voimport12[0]',
    PRTAX.ptax+ MTTAX.TAX_7501 as 'topmostSubform[0].Page2[0].volimport12[0]',
    'OWNER' as 'topmostSubform[0].Page2[0].title[0]',
    DATE_FORMAT(CURDATE(), '%m/%d/%Y') as 'topmostSubform[0].Page2[0].dateprepared[0]'
	FROM
    `tabTobacco Legal Compliance` tlc,
        -- Material TrasnsferTax
    (SELECT 
  	SUM(coalesce(LCT.amount, 0))
    as TAX_7501
    from `tabLanded Cost Taxes and Charges` AS LCT 
    where LCT.expense_account IN (SELECT distinct name from tabAccount as AC1 where AC1.account_type = 'Tax')
    AND LCT.PARENT IN (select distinct parent from `tabStock Entry Detail` SED 
    where SED.s_warehouse like '%bond%' and SED.t_warehouse  = 'ZOMO-NJ - Zomo' -- replace with tlc.warehouse paramater
    AND SED.item_group in (
        select
            distinct name
        from
            `tabItem Group`
        where
            parent_item_group = 'TOBACCO'
    )
    and SED.parent in (select distinct name from `tabStock Entry` as SE 
    WHERE SE.purpose = 'Material Transfer'
    and SE.docstatus = 1
    and MONTHNAME(SE.posting_date) = 'January' -- REPLACE TLC MONTH
    and year(SE.posting_date) = 2020 ))) as MTTAX,
   -- Purchase Tax
    (SELECT 
    SUM(coalesce(PTC.base_tax_amount, 0)) as ptax
 	from
 	`tabPurchase Taxes and Charges` AS PTC 
 	INNER JOIN `tabPurchase Receipt` PR 
 	ON PR.name = PTC.parent 
    AND PR.docstatus = 1
    and PR.set_warehouse = 'ZOMO-NJ - Zomo'
    and MONTHNAME(PR.posting_date) =  'January' -- replace
    and year(PR.posting_date) = 2020 -- replace 
    INNER JOIN tabAccount as AC 
    on PTC.account_head = AC.name
     and AC.account_type = 'Tax'
    AND PR.name in (select distinct parent from  `tabPurchase Receipt Item` PRI 
    where PRI.item_group in (
        select
            distinct name
        from
            `tabItem Group`
        where
            parent_item_group = 'TOBACCO'
    ))) AS PRTAX,
     -- Material Transfer Item Weigth
    (select  coalesce(round(SUM(coalesce(coalesce(I.weight_per_unit,0) * coalesce(SED.qty,0), 0)) * 2.20462,2),0)  as mti_w
    from `tabStock Entry Detail` SED 
    INNER JOIN tabItem  as I 
    ON I.item_code= SED.item_code
    where SED.s_warehouse 
    like '%bond%' and SED.t_warehouse  = 'ZOMO-NJ - Zomo' -- replace with tlc.warehouse paramater
    AND SED.item_group in (
        select
            distinct name
        from
            `tabItem Group`
        where
            parent_item_group = 'TOBACCO'
    )
    and SED.parent in (select distinct name from `tabStock Entry` as SE 
    WHERE SE.purpose = 'Material Transfer'
    and SE.docstatus = 1
    and MONTHNAME(SE.posting_date) = 'January' -- REPLACE TLC MONTH
    and year(SE.posting_date) = 2020 -- REPLACE TLC YEAR)
    )) as MTIW, -- PURCHASE Weigth    
    (select 
    round(SUM(coalesce(PR.total_net_weight, 0)) * 2.20462,2) AS p_weight
 	from `tabPurchase Receipt` PR 
 	where PR.docstatus = 1
    and PR.set_warehouse = 'ZOMO-NJ - Zomo' -- replace
    and MONTHNAME(PR.posting_date) = 'January' -- replace
    and year(PR.posting_date) = 2020
    AND PR.name in (select distinct parent  from `tabPurchase Receipt Item` PRI
    where  PRI.item_group in (
        select
            distinct name
        from
            `tabItem Group`
        where
            parent_item_group = 'TOBACCO'
    ) )) as PRW
    WHERE tlc.name = 'FDA-3852-January-2020-Zomo America'
    
    
