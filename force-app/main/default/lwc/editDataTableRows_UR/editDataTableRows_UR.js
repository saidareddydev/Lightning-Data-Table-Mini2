import { LightningElement,wire,api } from 'lwc';
import getContactBasedOnAccount from "@salesforce/apex/ContactDetailsHandler.getContactBasedOnAccount";
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', editable : true,hideDefaultActions:true },
    { label: 'Last Name', fieldName: 'LastName', editable : true,hideDefaultActions:true },
    { label: 'Title', fieldName: 'Title', editable : true,hideDefaultActions:true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable : true,hideDefaultActions:true  },
    { label: 'Email', fieldName: 'Email', type: 'email' , editable : true,hideDefaultActions:true },
    
];
export default class EditDataTableRows_UR extends LightningElement {
    @api recordId;
    contactData = [];
    columns = columns;
    draftValues = [];
    contactRefrshProp;

    @wire(getContactBasedOnAccount,{
        accountId : "$recordId"
        
    })
    
    getContactOutput(result){
        this.contactRefrshProp = result;
        if(result.data){
            this.contactData =  result.data;
        } else if(result.error){
            console.log("Error While Loading Records....");
        }
    }
    async saveHandler(event){

        let records =  event.detail.draftValues; // Array of Modifyied Records

        let updateRecordsArray = records.map((currentItem)=>{
            let fieldInput = {...currentItem};
            return {
                fields : fieldInput
            };
           });
           this.draftValues = [];
           let updateRecordsArrayPromise = updateRecordsArray.map((currItem)=>updateRecord(currItem));
           await Promise.all(updateRecordsArrayPromise);

           const evt = new ShowToastEvent({
            title: 'Success',
            message:'Records Updated Successfully....',
            variant : 'success'
        });
        this.dispatchEvent(evt);
        await refreshApex(this.contactRefrshProp);
        }
}
