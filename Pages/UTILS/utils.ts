import { Page, expect, Locator } from '@playwright/test';
import ExcelJS, { Workbook } from 'exceljs';
import * as mammoth from 'mammoth';
import * as fs from 'fs/promises';
import path from 'path';

/**
 * Class representing all utility abd common fuctions.
 */
export class utils {
  private page: Page;
  public editPencil_Icon_locator : Locator;
  /**
   * Create an instance of INV.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.editPencil_Icon_locator = page.locator(`((//a[./*[@class and contains(@class, 'fa-pencil-alt')]] | //button[./*[@class and contains(@class, 'fa-pencil-alt')]])[1])`);   
    }

  
  /**
   * Upload a file.
   */
  async UploadFile() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.setInputFiles('input[type="file"]', './downloads/Export.xlsx');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
    console.log('\n File Uploaded...\n ');
  }

  /**
   * Read data from an Excel file.
   * @param {string} sheetname - The name of the sheet to read from.
   * @param {number} rowno - The row number to read.
   */
  async readExcelFile(sheetname: string, rowno: number) {
    const wb = new Workbook();
    await wb.xlsx.readFile('../downloads/Export.xlsx');
    let worksheet = wb.getWorksheet(sheetname);
    if (worksheet) {
      let row = worksheet.getRow(rowno);
      console.log(row.values);
      if (Array.isArray(row.values)) {
        console.log(row.values.sort());
      } else {
        console.error('Row values are not an array:', row.values);
      }
    } else {
      console.error(`Worksheet ${sheetname} not found.`);
    }
  }

  /**
   * Download an Excel file.
   */
  async downloadExcel() {
    await this.page.waitForLoadState('domcontentloaded');
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: '.xlsx : Excel 2007 - 2010' }).click();
    const download = await downloadPromise;
    await download.saveAs('./downloads/' + download.suggestedFilename());
    await this.page.waitForTimeout(2000);
    console.log('\n File Downloaded....\n FileName:', download.suggestedFilename());
  }


  /**
   * Get all computed style properties of a locator.
   * @param {Locator} locator - The locator of the element.
   * @returns {Promise<{ width: string, height: string }>} The computed style properties.
   */
  async getSizeof(locator: Locator): Promise<{ width: string, height: string }> {
    return await locator.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        width: styles.width.trim(),
        height: styles.height.trim(),
      };
    });
  }

  /**
   * Get all computed style properties of an element.
   * @param {Locator} locator - The locator of the element.
   * @returns {Promise<Record<string, string>>} The computed style properties.
   */
  async getAllComputedStyles(locator: Locator): Promise<Record<string, string>> {
    return await locator.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      const computedStyles: Record<string, string> = {};
      for (let i = 0; i < styles.length; i++) {
        const property = styles[i];
        computedStyles[property] = styles.getPropertyValue(property);
      }
      return computedStyles;
    });
  }

    /**
     * Get a specific CSS property value of an element.
     * @param {Locator} locator - The locator of the element.
     * @param {string} property - The CSS property to retrieve.
     * @returns {Promise<string>} The value of the specified CSS property.
     */
    async getSpecificStyle(locator: Locator, property: string): Promise<string> {
      return await locator.evaluate((element, prop) => {
        const styles = window.getComputedStyle(element);
        console.log('Property:', prop);
        return styles.getPropertyValue(prop);
      }, property);
    }
   /**
   * Download any file.
   * Simply pass the locator of the download button
   */
   async downloadFile(toDownload: Locator) {
    const downloadPromise = this.page.waitForEvent('download');
    await toDownload.click();
    const download = await downloadPromise;
    const suggestedFilename = download.suggestedFilename();
    const downloadsPath = path.resolve(__dirname, '../downloads');
    const filePath = path.join(downloadsPath, suggestedFilename);
    await download.saveAs(filePath);
    await this.page.waitForTimeout(2000);
    return filePath;
  }

  /**
   * Export the excel report of webpart
   */
  async webpart_export(type: string) {
    let toDownload: string = '';
    if (type == 'Excel' || type == 'excel') {
      toDownload = 'btnExportExcel';
    }

    else if (type == 'Word' || type == 'word') {
      toDownload = 'btnExportWord';
    }
    else {
      console.error(`Unsupported export type: ${type}`);
      throw new Error(`Unsupported export type: ${type}`);
      // Alternatively, you could just return null or an error indicator
      // return null;
    }
    await expect(this.page.getByRole('button', { name: toDownload })).toBeVisible();
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: toDownload }).click();
    const download = await downloadPromise;
    const suggestedFilename = download.suggestedFilename();
    const downloadsPath = path.resolve(__dirname, '../downloads');
    const filePath = path.join(downloadsPath, suggestedFilename);
    await download.saveAs(filePath);
    await this.page.waitForTimeout(2000);
    await this.page.locator('#body_x_webPartContainer_x_webpartGrid').click();
    return filePath;
  }

  /**

  /**
   * Modify data in an Excel file.
   * @param {string} sheetname - The name of the sheet to modify.
   * @param {string} cell - The cell to modify.
   * @param {string} Value - The value to set in the cell.
   */
  async modifyExcel(sheetname: string, cell: string, Value: string) {
    const wb = new Workbook();
    await wb.xlsx.readFile('./downloads/Export.xlsx');
    let worksheet = wb.getWorksheet(sheetname);
    if (worksheet) {
      console.log(worksheet.getCell(cell).value);
      worksheet.getCell(cell).value = Value;
      worksheet.commit();
    } else {
      console.error(`Worksheet ${sheetname} not found.`);
    }
    await wb.xlsx.writeFile("./downloads/Export.xlsx");
    console.log(`\n File modified...\n Details: \n Sheet:${sheetname}\n Cell:${cell}\n Content:`, Value);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  // /**
  //  * Read data from a specific cell in an Excel file.
  //  * @param {string} sheetname - The name of the sheet to read from.
  //  * @param {number} rowno - The row number to read.
  //  * @param {string} cell - The cell to read.
  //  */
  // async readExcelFileData(sheetname: string, rowno: number, cell: string) {
  //   const wb = new Workbook();
  //   await wb.xlsx.readFile('./downloads/Export.xlsx');
  //   let worksheet = wb.getWorksheet(sheetname);
  //   if (worksheet) {
  //     let row = worksheet.getRow(rowno).getCell(cell);
  //     console.log(`\n Sheet Name:${sheetname}\n Row No:${rowno}\n Cell Data:`, row.value);
  //     return row;
  //   } else {
  //     console.error(`Worksheet ${sheetname} not found.`);
  //     return null;
  //   }
  // }
  /**
   * Read data from a specific cell in an Excel file.
   * @param {string} sheetname - The name of the sheet to read from.
   * @param {number} rowno - The row number to read.
   * @param {string} cell - The cell to read.
   */
  async readExcelFileData(filePath: string, sheetname: string, rowno: number, cell: string) {
    const wb = new Workbook();
    await wb.xlsx.readFile(filePath);
    let worksheet = wb.getWorksheet(sheetname);
    if (worksheet) {
      let row = worksheet.getRow(rowno).getCell(cell);
      console.log(`\n Sheet Name:${sheetname}\n Row No:${rowno}\n Cell Data:`, row.value);
      return row.value;
    } else {
      console.error(`Worksheet ${sheetname} not found.`);
      return null;
    }
  }

  async download_and_validate_excel_file(
    expectedFileNamePart: string,
    expectedNumOfSheets: number,
    expectedSheet1Title: string,
    expectedText1: string,
    expectedText2: string,
    row1: number,
    cell1: string,
    row2: number,
    cell2: string) {


    // Download the Excel file
    const downloadedFilePath = await this.webpart_export('excel');

    // Validating Excel Filename
    expect(path.basename(downloadedFilePath)).toContain(expectedFileNamePart);

    // Validating Excel File Format
    expect(path.extname(downloadedFilePath)).toBe('.xlsx');

    // Read and verify the number of sheets
    const wb = new Workbook();
    await wb.xlsx.readFile(downloadedFilePath);

    expect(wb.worksheets.length).toBe(expectedNumOfSheets);

    // Read and verify Sheet 1 title
    expect(wb.worksheets[0].name).toBe(expectedSheet1Title);

    // Read and verify text1
    const actualText1 = await this.readExcelFileData(downloadedFilePath, expectedSheet1Title, row1, cell1);
    expect(actualText1).toBe(expectedText1);

    // Read and verify text2
    const actualText2 = await this.readExcelFileData(downloadedFilePath, expectedSheet1Title, row2, cell2);
    expect(actualText2).toBe(expectedText2);
  }

  async download_and_validate_word_file(expectedFileNamePart: string) {
    const downloadedFilePath = await this.webpart_export('word');
    expect(path.basename(downloadedFilePath)).toContain(expectedFileNamePart);
    expect(path.extname(downloadedFilePath)).toBe('.docx');

    try {
      const buffer = await fs.readFile(downloadedFilePath);
      const result = await mammoth.convertToHtml({ buffer: buffer });
      const html = result.value;
      expect(html).toContain('Invoice Amount');
      // You might need to adjust the assertion based on how 'mammoth' converts to Markdown
    } catch (error) {
      console.error("Error reading Word file:", error);
      throw error;
    }
  }


  /**
   * Generate a random string.
   * @param {number} length - The length of the random string.
   * @returns {string} The generated random string.
   */
  generateRandom(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }




  async readExcel(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Assuming the steps are in the first sheet
  
    const steps: string[] = [];
    if (worksheet) {
      worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
        if (rowNumber > 1) { // Skip the header row
          steps.push(row.getCell(1).value?.toString() || ''); // Assuming steps are in the first column
        }
      });
    } else {
      console.error('Worksheet not found.');
    }
  
    return steps;
    
  }


  /**
   * Uploading a file using a file chooser in a Playwright test- Import ETL.
   *
   * @param fileName - The name of the file to be uploaded. The file is expected to be located
   *                   in the `../../downloads` directory relative to the current file.
   * @throws {Error} If the specified file does not exist in the expected directory.
   * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded and validated.
   * @example
   * await utils.import_manage_uploadFile('example.txt');
   */

  async import_manage_uploadFile(fileName: string) {
    const filePath = path.resolve(__dirname, '../../downloads', fileName);
    const fs = require('fs');

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.locator('#body_x_tab_tpcchk_prxprxStepchk_x_txtUploadFiles').click()
    ]);

    await fileChooser.setFiles([filePath]);

    //Add files
    await this.page.getByRole('button', { name: 'Add' }).click();
    this.page.waitForLoadState('domcontentloaded');

    //Validate that the file is uploaded successfully
    
    await expect(this.page.locator('//table[@id="body_x_tab_tpcchk_prxprxStepchk_x_available_files_grd"]//tr//a')).toContainText(fileName);
  }

  /**
   * Click a button with additional handling for alerts, ensuring the page is fully loaded, and fallback to pressing Enter if the click fails.
   * @param {Locator} element - The locator for the button to click.
   */
  async custom_click2(element: Locator): Promise<void> {
    try {
      // Wait for the page to fully load before interacting with the element
      console.log('[custom_click] Waiting for the page to fully load...');
      await this.page.waitForLoadState('networkidle'); // Wait for all network requests to finish

      // Wait for the button to be visible and enabled
      console.log('[custom_click] Waiting for the button to be visible...');
      await element.waitFor({ state: 'visible', timeout: 5000 });

      // Attempt to click the button
      console.log('[custom_click] Attempting to click the button...');
      await element.click({ timeout: 5000 });
      console.log('[custom_click] Button clicked successfully using normal click.');
    } catch (clickError) {
      console.warn('[custom_click] Button click failed. Checking for alerts or fallback actions...', clickError);

      // Handle any alerts
      try {
        console.log('[custom_click] Checking for alerts...');
        const alert = await this.page.waitForEvent('dialog', { timeout: 3000 });
        console.log('[custom_click] Alert detected:', alert.message());
        await alert.accept();
        console.log('[custom_click] Alert accepted. Retrying button click...');
        await element.click({ timeout: 5000 });
        console.log('[custom_click] Button clicked successfully after handling alert.');
        return;
      } catch (alertError) {
        console.warn('[custom_click] No alert detected or alert handling failed.', alertError);
      }

      // Fallback: Press Enter if the button click fails
      try {
        console.log('[custom_click] Attempting to focus and press Enter on the button...');
        await element.focus();
        await this.page.keyboard.press('Enter');
        console.log('[custom_click] Button activated successfully using Enter key.');
      } catch (enterError) {
        console.error('[custom_click] Failed to activate the button using Enter key:', enterError);
      }
    }
  }


/**
   * Generate a random date according to the given input
   */
generateDate(offsetMonths: number = 0, offsetDays: number = 0): string {
  // Get current date
  const today = new Date();

  // Adjust the date by months and days
  today.setMonth(today.getMonth() + offsetMonths);  // Add or subtract months
  today.setDate(today.getDate() + offsetDays);  // Add or subtract days

  // Format the date as mm/dd/yyyy
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
  const day = today.getDate().toString().padStart(2, '0');
  const year = today.getFullYear();

  return `${month}/${day}/${year}`;
}
  
/**
   * Click a button with additional handling for alerts, ensuring the page is fully loaded, and fallback to pressing Enter if the click fails.
   * @param {Locator} element - The locator for the button to click.
   */
 async custom_click(element: Locator): Promise<void> {
  try {
    // Wait for the page to fully load before interacting with the element
    console.log('Waiting for the page to fully load...');
    await this.page.waitForLoadState('networkidle'); // Wait for all network requests to finish

    // Wait for the button to be visible and enabled
    console.log('Waiting for the button to be visible...');
    await element.waitFor({ state: 'visible', timeout: 5000 });

    // Attempt to click the button
    const isClicked = await element.click({ timeout: 5000 }).then(() => true).catch(() => false);
    if (isClicked) {
      console.log('Button clicked successfully.');
    } else {
      console.warn('Button click failed.');
    }
    console.log('Button clicked successfully.');
    return; // Exit the function if the click is successful
  } catch (clickError) {
    console.warn('Button click failed. Checking for alerts or fallback actions...');

    // Handle any alerts that might appear
    try {
      const alert = await this.page.waitForEvent('dialog', { timeout: 3000 });
      console.log('Alert detected:', alert.message());
      await alert.accept();
      console.log('Alert accepted.');
    } catch (alertError) {
      console.warn('No alert detected or alert handling failed.');
    }

    // Fallback: Press Enter if the button click fails
    try {
      console.log('Attempting to focus and press Enter on the button...');
      await element.focus();
      await this.page.keyboard.press('Enter');
      console.log('Button activated using Enter key.');
    } catch (enterError) {
      console.error('Failed to activate the button using Enter key:', enterError);
    }
  }
}
/**
   * Uploading a file using a file chooser in a Playwright test- Import ETL.
   *
   * @param fileName - The name of the file to be uploaded. The file is expected to be located
   *                   in the ../../downloads directory relative to the current file.
   * @throws {Error} If the specified file does not exist in the expected directory.
   * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded and validated.
   * @example
   * await utils.import_manage_uploadFile('example.txt');
   */
  
async import_uploadFilexxxxxxxxxxx(fileName: string) {
  const filePath = path.resolve(__dirname, '../../downloads', fileName);
  const fs = require('fs');
  
  await this.page.waitForLoadState('networkidle');
  this.custom_click(this.page.locator('//*[@id="body_x_tabc_tabDocumentManage_prxAuthoringNew_x_fileImport_x_UploadButtonControl"][1]'));

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found: ${filePath}');
  }

  const [fileChooser] = await Promise.all([
   await this.page.waitForEvent('filechooser'),
   //await this.custom_click(this.page.locator('//*[@id="body_x_tabc_tabDocumentManage_prxAuthoringNew_x_fileImport_x_UploadButtonControl"][1]'))
  ]);

  await fileChooser.setFiles([filePath]);
  await this.page.keyboard.press('Escape');
  await this.page.waitForLoadState('domcontentloaded');

  //Validate that the file is uploaded successfully
  
//  await expect(this.page.locator('//table[@id="body_x_tab_tpcchk_prxprxStepchk_x_available_files_grd"]//tr//a')).toContainText(fileName);
}

  /**
   * A robust click method that tries multiple approaches to click an element
   * and handles various scenarios that might prevent a successful click.
   * 
   * @param locator - The Playwright Locator to click
   * @param options - Additional options for advanced click handling
   * @returns Promise that resolves when click is successful
   * 
   * // Basic usage
  // await robustClick(button);

  // With options
  // await robustClick(button, {timeout: 15000, retryCount: 5,force: true});
   */
  async robustClick(
    locator: Locator,
    options: {
      timeout?: number;          // Max time to try different click methods (default: 30000ms)
      force?: boolean;           // Whether to try force click (default: true)
      retryCount?: number;       // Number of retry attempts (default: 1)
      retryDelay?: number;       // Delay between retries in ms (default: 500ms)
      scrollIntoViewFirst?: boolean; // Scroll element into view before clicking (default: true)
      waitForStable?: boolean;   // Wait for element to be stable (default: true)
      waitForEnabled?: boolean;  // Wait for element to be enabled (default: true)
      waitForVisible?: boolean;  // Wait for element to be visible (default: true)
    } = {}
  ): Promise<void> {
    const {
      timeout = 30000,
      force = true,
      retryCount = 1,
      retryDelay = 500,
      scrollIntoViewFirst = true,
      waitForStable = true,
      waitForEnabled = true,
      waitForVisible = true
    } = options;

    const startTime = Date.now();
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const isTimedOut = () => Date.now() - startTime > timeout;
    const page = locator.page();

    const log = (message: string) => console.log(`[robustClick] ${message}`);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');

    const clickStrategies = [
      async () => {
        log('Trying standard click...');
        try {
          if (scrollIntoViewFirst) {
            await locator.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
            await wait(300);
          }
          if (waitForVisible) await locator.waitFor({ state: 'visible', timeout: 5000 });
          if (waitForEnabled) {
            const isDisabled = await locator.evaluate(el => el.hasAttribute('disabled'));
            if (isDisabled) throw new Error('Disabled');
          }
          await locator.click({ timeout: 5000 });
          await this.page.waitForLoadState('domcontentloaded');
          await this.page.waitForLoadState('networkidle');
          log('Standard click succeeded.');
          return true;
        } catch (e) {
          log('Standard click failed.');
          return false;
        }
      },
      async () => {
        log('Trying Enter key...');
        try {
          await locator.focus();
          await page.keyboard.press('Enter');
          log('Enter key succeeded.');
          await this.page.waitForLoadState('domcontentloaded');
          await this.page.waitForLoadState('networkidle');
          return true;
        } catch (e) {
          log('Enter key failed.');
          return false;
        }
      },
      async () => {
        if (force) {
          log('Trying force click...');
          try {
            await locator.click({ force: true, timeout: 5000 });
            log('Force click succeeded.');
            return true;
          } catch (e) {
            log('Force click failed.');
            return false;
          }
        }
        return false;
      },
      async () => {
        log('Trying JavaScript click...');
        try {
          await locator.evaluate(el => (el as HTMLElement).click());
          log('JavaScript click succeeded.');
          return true;
        } catch (e) {
          log('JavaScript click failed.');
          return false;
        }
      },
      async () => {
        log('Trying click by coordinates...');
        try {
          const boundingBox = await locator.boundingBox();
          if (boundingBox) {
            const x = boundingBox.x + boundingBox.width / 2;
            const y = boundingBox.y + boundingBox.height / 2;
            await page.mouse.click(x, y);
            log('Click by coordinates succeeded.');
            return true;
          }
          log('Bounding box not found.');
          return false;
        } catch (e) {
          log('Click by coordinates failed.');
          return false;
        }
      },
      async () => {
        log('Trying to remove overlays...');
        try {
          await page.evaluate(() => {
            document.querySelectorAll('[class*="overlay"], [class*="modal"], [class*="dialog"], [class*="popup"]').forEach(el => {
              if (el instanceof HTMLElement) el.style.display = 'none';
            });
          });
          await wait(300);
          await locator.click({ timeout: 5000 });
          log('Click after removing overlays succeeded.');
          return true;
        } catch (e) {
          log('Click after removing overlays failed.');
          return false;
        }
      }
    ];

    let lastError: Error | undefined;

    for (let attempt = 0; attempt < retryCount; attempt++) {
      if (isTimedOut()) throw new Error(`Timeout after ${timeout}ms: ${lastError?.message}`);

      if (attempt > 0) {
        log(`Retry ${attempt}/${retryCount}`);
        await wait(retryDelay);
      }

      // Ensure the page is fully loaded before attempting any strategy
      log('Waiting for the page to fully load...');
      await page.waitForLoadState('networkidle');

      const isPresent = await locator.count().then(count => count > 0);
      if (!isPresent) {
        log('Element not found, waiting...');
        try {
          await locator.waitFor({ state: 'attached', timeout: 5000 });
        } catch (e) {
          lastError = e as Error;
          continue;
        }
      }

      if (waitForStable) {
        try {
          await this.waitForElementStability(locator);
        } catch (e) {
          log('Element not stable.');
        }
      }

      for (const [index, strategy] of clickStrategies.entries()) {
        try {
          log(`Strategy ${index + 1}...`);
          if (await strategy()) return;
        } catch (e) {
          lastError = e as Error;
          log(`Strategy ${index + 1} failed.`);
        }
      }
    }

    throw new Error(`All attempts failed. Last error: ${lastError?.message}`);
  }
/**
/**
 * Waits for an element to become stable (not moving or changing)
 * 
 * @param locator The element to check for stability
 * @param options Options for stability detection
 */
async waitForElementStability(
  locator: Locator,
  options: {
    stabilityTime?: number;  // How long element must be stable for (ms)
    checkInterval?: number;  // Interval between position checks (ms)
    maxWaitTime?: number;    // Maximum time to wait for stability (ms)
  } = {}
): Promise<void> {
  const {
    stabilityTime = 200,
    checkInterval = 50,
    maxWaitTime = 5000
  } = options;

  const startTime = Date.now();
  let lastRect: { x: number; y: number; width: number; height: number } | null = null;
  let stableStartTime: number | null = null;

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const currentRect = await locator.boundingBox();
      
      if (!currentRect) {
        throw new Error('Element not found or not visible');
      }

      // Check if position changed
      if (lastRect && 
          Math.abs(lastRect.x - currentRect.x) < 2 &&
          Math.abs(lastRect.y - currentRect.y) < 2 &&
          Math.abs(lastRect.width - currentRect.width) < 2 &&
          Math.abs(lastRect.height - currentRect.height) < 2) {
        
        // Position is the same, check if it's been stable long enough
        if (!stableStartTime) {
          stableStartTime = Date.now();
        } else if (Date.now() - stableStartTime >= stabilityTime) {
          // Element has been stable for long enough
          return;
        }
      } else {
        // Position changed, reset stable timer
        stableStartTime = null;
      }

      lastRect = currentRect;
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    } catch (e) {
      // Element might be temporarily not available
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
  }

  throw new Error(`Element did not stabilize within ${maxWaitTime}ms`);
}
async getModalId() 
  {

    
    // Create a locator for the last <div> with class 'iv-modal-content'
    const modalContentLocator = this.page.locator("(//div[contains(@class, 'iv-modal-content')])[last()]");

    // Check if the modal content exists
    const modalExists = await modalContentLocator.count();
    if (modalExists === 0) {
      console.log("No modal content found.");
      return null;  // Or handle as needed (e.g., return a default value or throw an error)
    }

    // Find the iframe inside the div and get its id
    const iframeLocator = modalContentLocator.locator('iframe');
    
    // Check if the iframe exists
    const iframeExists = await iframeLocator.count(); // Await the count() result
    if (iframeExists === 0) {
      console.log("No iframe found inside the modal.");
      return null;  // Or handle as needed
    }

    const iframeId = await iframeLocator.getAttribute('id');
    
    if (!iframeId) {
      console.log("Iframe does not have an id attribute.");
      return null;  // Or handle as needed
    }

    console.log("Top Most Iframe_ID", iframeId);

    // Return the content frame of the iframe using its 'name' attribute
    return await this.page.locator(`iframe[name=${iframeId}]`).contentFrame();
  }

  async clearSessionData()
  {
    // Clear cookies
    await this.page.context().clearCookies();

  // Clear localStorage
  await this.page.context().clearCookies();
  await this.page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  console.log('CSRF data (cookies, localStorage, sessionStorage) cleared.');
  }

  async searchKeyword(keyword_To_be_Searched : string){
    await this.page.waitForLoadState('domcontentloaded');
    let searchKeyword_Locator = this.page.getByRole('textbox', { name: 'Keywords' });
    await searchKeyword_Locator.click();
    await searchKeyword_Locator.fill(keyword_To_be_Searched);
    await this.page.locator('//*[@id="body_x_prxFilterBar_x_cmdSearchBtn"]').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
// /**
//    * Uploading a file using a file chooser in a Playwright test- Import ETL.
//    *
//    * @param fileName - The name of the file to be uploaded. The file is expected to be located
//    *                   in the ../../downloads directory relative to the current file.
//    * @throws {Error} If the specified file does not exist in the expected directory.
//    * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded and validated.
//    * @example
//    * await utils.import_manage_uploadFile('example.txt');
//    */

// async import_document({fileName,locator_whereTo_Upload}:{fileName: string, locator_whereTo_Upload : Locator }) {
//   const filePath = path.resolve(__dirname, '../../downloads', fileName);
//   const fs = require('fs');

//   if (!fs.existsSync(filePath)) {
//     throw new Error(`File not found: ${filePath}`);
//   }
//   await locator_whereTo_Upload.click();

//   const [fileChooser] = await Promise.all([
//     this.page.waitForEvent('filechooser'),
//     await locator_whereTo_Upload.click()]);

//   await fileChooser.setFiles([filePath]);

//   await this.page.keyboard.press('Escape');

// await this.page.waitForLoadState('domcontentloaded');
// await this.page.waitForLoadState('load');

// await this.page.waitForTimeout(30000);
  
// }

  /**
   * Uploading a file using a file chooser in a Playwright test- Import ETL.
   *
   * @param fileName - The name of the file to be uploaded. The file is expected to be located
   *                   in the ../../downloads directory relative to the current file.
   * @throws {Error} If the specified file does not exist in the expected directory.
   * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded and validated.
   * @example
   * await utils.import_manage_uploadFile('example.txt');
   */

  async import_document(fileName: string, locator123: string) {
    const filePath = path.resolve(__dirname, '../../downloads', fileName);
    const fs = require('fs');
    
    await this.page.waitForLoadState('networkidle');
    this.custom_click(this.page.locator(locator123));
  
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found: ${filePath}');
    }
  
    const [fileChooser] = await Promise.all([
     await this.page.waitForEvent('filechooser'),
     //await this.custom_click(this.page.locator(locator123))
    ]);
  
    await fileChooser.setFiles([filePath]);
    await this.page.keyboard.press('Escape');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(30000);
    //Validate that the file is uploaded successfully
    
   //await expect(this.page.locator('//*[@id="proxyActionBar_x__cmdVal"]')).toBeVisible();
  }
  


async custom_dropdown(
  page: Page,
  dropdownTrigger: string | Locator,
  optionText: string,
  optionsLocator: string | Locator,
  timeout = 10000
): Promise<void> {
  try {
    if (!page || page.isClosed()) {
      throw new Error('❌ Cannot select dropdown: Page is closed or unavailable.');
    }

    const trigger = typeof dropdownTrigger === 'string' ? page.locator(dropdownTrigger) : dropdownTrigger;
    const options = typeof optionsLocator === 'string' ? page.locator(optionsLocator) : optionsLocator;

  
    await trigger.waitFor({ state: 'visible', timeout });

    await trigger.click();

    await options.waitFor({ state: 'visible', timeout });

    const matchingOption = options.filter({ hasText: optionText });

    if ((await matchingOption.count()) === 0) {
      throw new Error(`❌ Option "${optionText}" not found in the dropdown.`);
    }

    await matchingOption.first().click();
    console.log(`Successfully selected option: ${optionText}`);
  } catch (error: any) {
    console.error('Dropdown selection failed:', error.message);
    throw error; // optional: rethrow if you want to fail the test
  }
}



/**
* Waits for a loader element to disappear from the DOM.
* @param selector CSS or Locator for the loader.
* @param timeout Optional timeout in milliseconds.
*/
async waitForLoaderToDisappear(selector: string | Locator, timeout = 15000) {
  const loader = typeof selector === 'string' ? this.page.locator(selector) : selector;
  if (await loader.count()) {
  await loader.waitFor({ state: 'hidden', timeout });
  }
  }

/**
 * Types text into an input field with retries and validation.
 * @param selector Input locator or selector.
 * @param text The text to type.
 * @param timeout Optional timeout per attempt.
 * @param maxRetries Number of retries before throwing an error.
 */
async safeType(selector: string | Locator, text: string, timeout = 10000, maxRetries = 3) {
  const input = typeof selector === 'string' ? this.page.locator(selector) : selector;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
          await input.waitFor({ state: 'visible', timeout });
          const elementHandle = await input.elementHandle();
          if (!elementHandle) {
              throw new Error(`Element not found for selector: ${selector}`);
          }
          await this.page.waitForFunction(
              el => !el.hasAttribute('disabled'),
              elementHandle,
              { timeout }
          );
          await input.fill('');
          await input.type(text, { delay: 30 });
          const value = await input.inputValue();
          if (value === text) return;
          throw new Error(`Typed "${value}" does not match "${text}"`);
      } catch (err) {
          if (attempt === maxRetries) throw err;
          await this.page.waitForTimeout(500);
      }
  }
}


  /**
  * Waits for an element to be hidden or removed from the DOM.
  * @param selector Locator or string selector.
  * @param timeout Optional timeout in milliseconds.
  */
  async waitForElementToDisappear(selector: string | Locator, timeout = 10000) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await el.waitFor({ state: 'hidden', timeout });
  }
  /**
  * Scrolls the element into view.
  * @param selector The element to scroll into view.
  */
  async scrollToElement(selector: string | Locator) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await el.scrollIntoViewIfNeeded();
  if (!(await el.isVisible())) throw new Error('Element not visible after scroll.');
  }
  /**
  * Waits for the page to reach a network idle state.
  * @param timeout Optional timeout in milliseconds.
  */
  async waitForNetworkIdle(timeout = 10000) {
  await this.page.waitForLoadState('networkidle', { timeout });
  }
  /**
  * Waits for an element to contain specific text.
  * @param selector The element locator or selector.
  * @param expectedText The text to wait for.
  * @param timeout Optional timeout in milliseconds.
  */
  async waitForText(selector: string | Locator, expectedText: string, timeout = 10000) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toContainText(expectedText, { timeout });
  }
  /**
  * Checks if an element exists in the DOM.
  * @param selector Locator or selector string.
  * @returns True if element exists, else false.
  */
  async elementExists(selector: string | Locator): Promise<boolean> {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  return await el.count() > 0;
  }
  /**
  * Takes a full-page screenshot with a timestamped name.
  * @param namePrefix Prefix for the screenshot filename.
  */
  async takeScreenshot(namePrefix = 'screenshot') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await this.page.screenshot({ path: `screenshots/${namePrefix}-${timestamp}.png`, fullPage: true });
  }
  /**
  * Waits for a toast message to appear and disappear.
  * @param selector Locator or string for the toast element.
  * @param timeout Optional timeout.
  */
  async waitForToastMessage(selector: string | Locator, timeout = 8000) {
  const toast = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await toast.waitFor({ state: 'visible', timeout });
  await toast.waitFor({ state: 'hidden', timeout });
  }



  // -------------------- Reusable Assertions --------------------
  
  /**
  * Asserts that an element is visible.
  * @param selector Locator or string selector.
  * @param timeout Optional timeout.
  */
  async assertVisible(selector: string | Locator, timeout = 5000) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toBeVisible({ timeout });
  }
  /**
  * Asserts that the element’s text exactly equals the expected text.
  * @param selector Locator or string selector.
  * @param expectedText Exact text to compare.
  * @param timeout Optional timeout.
  */
  async assertTextEquals(selector: string | Locator, expectedText: string, timeout = 5000) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toHaveText(expectedText, { timeout });
  }
  /**
  * Asserts that the element contains partial text.
  * @param selector Locator or string selector.
  * @param partialText Partial text to search.
  * @param timeout Optional timeout.
  */
  async assertTextContains(selector: string | Locator, partialText: string, timeout = 5000) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toContainText(partialText, { timeout });
  }
  /**
  * Asserts that the element is enabled.
  * @param selector Locator or string selector.
  */
  async assertEnabled(selector: string | Locator) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toBeEnabled();
  }
  /**
  * Asserts that the element is disabled.
  * @param selector Locator or string selector.
  */
  async assertDisabled(selector: string | Locator) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toBeDisabled();
  }
  /**
  * Asserts that the current URL contains the expected value.
  * @param expectedPartialUrl Partial URL string to check.
  */
  async assertUrlContains(expectedPartialUrl: string) {
  await expect(this.page).toHaveURL(new RegExp(expectedPartialUrl));
  }
  /**
  * Asserts that the number of elements matching the selector equals the expected count.
  * @param selector Locator or string selector.
  * @param expectedCount Expected number of elements.
  */
  async assertElementCount(selector: string | Locator, expectedCount: number) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toHaveCount(expectedCount);
  }
  /**
  * Asserts that an element has a specific attribute and value.
  * @param selector Locator or string selector.
  
  * @param attribute Attribute name to check.
  * @param expectedValue Expected value of the attribute.
  */
  async assertAttribute(selector: string | Locator, attribute: string, expectedValue: string) {
  const el = typeof selector === 'string' ? this.page.locator(selector) : selector;
  await expect(el).toHaveAttribute(attribute, expectedValue);
  }


 /**
   * Search on Main Page
   */
 async Search_On_Main_Page(keyword: string) {
  await this.page.getByRole('textbox', { name: 'Keywords' }).clear();
  await this.page.getByRole('textbox', { name: 'Keywords' }).fill(keyword);
  await this.page.getByRole('button', { name: 'Search' }).click();
  await this.page.waitForLoadState();
}

/*
Click on Save Button
*/
async click_on_Save_Button() {
  await this.page.locator('#proxyActionBar_x__cmdSave').click();
  await this.page.waitForLoadState('domcontentloaded');
  await expect(this.page.getByRole('status')).toContainText('Data has been saved');
}





}

export default utils;