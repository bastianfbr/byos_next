import puppeteer from "puppeteer-core";

async function main() {
  console.log("Launching local Google Chrome...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });
  
  console.log("Navigating to http://localhost:3000/recipes to trigger database sync...");
  await page.goto("http://localhost:3000/recipes", { waitUntil: "networkidle2" });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Navigating to http://localhost:3000/recipes/birthday-menu-apero-columns...");
  await page.goto("http://localhost:3000/recipes/birthday-menu-apero-columns", { waitUntil: "networkidle2" });
  
  console.log("Waiting for components to render...");
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  const destPath = "/Users/basti/.gemini/antigravity/brain/af3f94b2-041b-40c7-aa5f-fcb997857bf4/birthday-menu-columns-preview.png";
  console.log("Capturing page screenshot...");
  await page.screenshot({ path: destPath });
  console.log("Screenshot successfully saved to: " + destPath);
  
  await browser.close();
}

main().catch((err) => {
  console.error("Error capturing screenshot:", err);
  process.exit(1);
});
