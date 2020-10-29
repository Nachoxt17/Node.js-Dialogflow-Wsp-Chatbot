const puppeteer = require("puppeteer");

(async function main() {
  try {
    // Configures Puppeteer
    const browser = puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)"
    );

    // Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector("._1MXsz");
    await delay(5000);

    // Change to contact you want to send messages to
    const contactName = "Jhon";
    await page.click(`span[title=${contactName}]`);
    await page.waitForSelector("._3uMse");

    // Find the message bar and focuses on it
    const editor = await page.s("div[data-tab='1']");
    await editor.focus();

    // Amount of messages you want to send
    const amountOfMessages = 500;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Hi! How are you doing?";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(500);
    }
  } catch (error) {
    xonsole.log(error);
  }
})();

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
