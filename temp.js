/**
 * Created by hermanvanderveer on 18/07/2017.
 */
if(exact(StepObjectType(),'Debiteur'),'ZPLU',
    if(exact(StepObjectType(),'Partner'),'ZPLU',
        if(exact(StepObjectType(),'Relatie'),'ZPLU',
            if(exact(StepObjectType(),'Winkel'),'0120','')
            )
    )
)