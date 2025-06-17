import { Locator, Page, expect } from '@playwright/test';
import path from 'path';
import * as dotenv from 'dotenv';
import utils from '../../Pages/UTILS/utils';
import axios from 'axios';
dotenv.config();

export class sign_manage
{
    private page:Page;
    public create_signature_transaction_btn:Locator;
    public add_documents:Locator;
    public add_signator:Locator;
    public contact_selector_btn:Locator;
    
    
    constructor(page:Page)
    {
        this.page=page;
        this.create_signature_transaction_btn=page.getByRole('link', { name: 'Create Signature Transaction' });
        this.add_documents=page.getByRole('button', { name: 'Add documents' });
        this.add_signator=page.getByRole('button', { name: 'Add signatory' });
        this.contact_selector_btn=page.getByRole('combobox', { name: 'Contact' });
    }
         async  createTempEmail()
        {
            const TEMP_MAIL_API = 'https://api.tempmail.dev/request';
            const response = await axios.get(`${TEMP_MAIL_API}/email`);
        
            const email = response.data.email;
        
            console.log('Created Temporary Email:', email);
        
            return email;
        }

        // Function to check for received emails
        async  getEmails(email: string)
         {
            const TEMP_MAIL_API = 'https://api.tempmail.dev/request';
            const response = await axios.get(`${TEMP_MAIL_API}/email/inbox`, {
                params: { email },
            });
            return response.data.messages;
        }
/*
                // Function to extract subject from the received email
        async  getSubjectFromEmail(email: string): Promise<string | null> {
            const emails = await getEmails(email);
            if (emails.length > 0) {
                return emails[0].subject;
            }
            return null;
        }

        // Function to extract body from the received email
        async  getBodyFromEmail(email: string): Promise<string | null> {
            const emails = await getEmails(email);
            if (emails.length > 0) {
                return emails[0].body;
            }
            return null;
        }

        */

        // Function to extract links from email body
        async extractLinksFromEmailBody(body: string): Promise<string[]> {
            const links = body.match(/https?:\/\/[^\s]+/g);
            return links || [];
        }

        async import_document(fileName: string)
        {
            let util = new utils(this.page);
            const filePath = path.resolve(__dirname, '../../downloads', fileName);
            const fs = require('fs');
        
            if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
            }
            const topMostModal1 = await util.getModalId();   
   
            if (topMostModal1) {
                // If the frame is valid (not null), proceed with the actions
               
         //  await topMostModal1.getByRole('button', { name: 'Click or Drag to add files' }).click();
           const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await topMostModal1.getByRole('button', { name: 'Click or Drag to add files' }).click()]);
        
            await fileChooser.setFiles([filePath]);
        
           
        
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('load');
        
            await this.page.waitForTimeout(30000);

            await topMostModal1.getByRole('button', { name: 'Save & Close' }).click();
               
                } else {
                console.log("No modal found or frame is null.");
            }
           
            
        }
}