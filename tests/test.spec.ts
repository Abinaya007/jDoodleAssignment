import { test, expect, Page } from '@playwright/test'; 

let page: Page;

const inputData =
  require(`../testData/inputData.ts`).default

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
})

test('JDoodle site testing', async ({ browser }) => {

  await test.step('Verify JDoodle Title', async () => { 
    await page.goto('https://www.jdoodle.com/online-java-compiler'); 
    const title = await page.title(); 
    expect(title).toBe('Online Java Compiler - Online Java Editor - Java Code Online'); 
  }); 

  await test.step('Execute Java Code Successfully', async () => {
    await page.click('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]');
    await page.locator('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]').focus();
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Backspace");
    await page.locator('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]').type(inputData.correctCode);
     
    await page.click("//*[contains(text(),'Execute')]//parent::button");
    await page.waitForSelector('[id="splitOutputComp"]');
    await page.waitForTimeout(10000); 
    const outputText = await page.textContent('[id="splitOutputComp"]'); 
    await expect(outputText).toContain('Hello, JDoodle!'); 
    }); 
  

  await test.step('Login as valid user', async() => {
    await page.waitForTimeout(5000);
    await page.waitForSelector('//*[contains(text(),"Login")]//parent::button[@type="submit"]');
    await page.click('//*[contains(text(),"Login")]//parent::button[@type="submit"]');
    await page.waitForSelector('[id="Email Addressjoe@example.com"]');
    await page.fill('[id="Email Addressjoe@example.com"]','infortestings4@gmail.com');
    await page.fill('[id="login_pwd"]', 'Testing@123');
    await page.click('//*[contains(text(),"Login")]//parent::button[@type="submit"]');

  });

  await test.step('Toggle Dark Mode', async () => { 
    await page.click('//*[text()="Dark Theme"]//ancestor::div[@id="navbar-collapse-basic"]//button[@aria-label="Toggle Light or Dark Mode"]'); 
    const darkModeActive = await page.getAttribute('//*[text()="Dark Theme"]//ancestor::div[@id="navbar-collapse-basic"]//button[@aria-label="Toggle Light or Dark Mode"]', 'aria-pressed'); 
    expect(darkModeActive).toBe('true'); 
  });

  await test.step('Execute Java Error Code', async () => {
    await page.click('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]');
    await page.locator('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]').focus();
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Backspace");
    await page.locator('//*[@id="ideCodeEditor"]//div[contains(@class,"ace_content")]').type(inputData.incorrectCode);  
    await page.click("//*[contains(text(),'Execute')]//parent::button");
    await page.waitForSelector('[id="splitOutputComp"]');
    await page.waitForTimeout(10000); 
    const outputText = await page.textContent('[id="splitOutputComp"]'); 
    await expect(outputText).toContain('Main.java:1: error: cannot find symbol'); 
  });

});