
const puppeteer = require('puppeteer');
require('dotenv').config()

let browser = null;
let page = null;

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async () => {
    browser = await puppeteer.launch({ headless: false ,executablePath: '/usr/bin/chromium-browser'});
        
    page = await browser.newPage();
    page.setViewport({
      defaultViewport: null,
      height: 600,
      width: 800,
      isMobile: false
    });

    await page.goto('https://twitter.com/login');

    const element = await page.waitForSelector('div > .r-30o5oe')
    await element.click()
    await element.type(process.env.EMAIL)
    const button = await page.waitForSelector('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]')
    await button.click()

    const verificationPhone = await page.waitForSelector('span[class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]')
    const text = await page.$eval('span[class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"]', el => el.textContent)
    if(text.includes('phone') || text.includes('Next'))
    {
      const element = await page.waitForSelector('div > .r-30o5oe')
      await element.click()
      await element.type(process.env.PHONE)
      const button = await page.waitForSelector('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]')
      await button.click()
    }

    const pwd = await page.waitForSelector('div > input[name="password"]')
    await pwd.click()
    await pwd.type(process.env.PASSWORD)
    login = await page.waitForSelector('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]')
    await login.click()
      
    
})();
