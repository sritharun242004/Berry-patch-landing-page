import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })

await page.goto('http://localhost:5173/strawberry', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1200))

// Screenshot the wave/stats transition zone (hero bottom → stats top)
await page.evaluate(() => window.scrollTo(0, 580))
await new Promise(r => setTimeout(r, 300))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/wave-close-390.png', clip: { x:0, y:0, width:390, height:300 } })

// Full scroll sections
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise(r => setTimeout(r, 300))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/hero-top-390.png', clip: { x:0, y:0, width:390, height:844 } })

// Hero bottom - stats top transition
await page.evaluate(() => window.scrollTo(0, 480))
await new Promise(r => setTimeout(r, 300))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/wave-transition-390.png', clip: { x:0, y:0, width:390, height:500 } })

// Strawberry page full
await page.screenshot({ path: 'D:/berry-patch/audit-shots/sb-full-390.png', fullPage: true })

// Home full
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1200))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/home-viewport-390.png' })
await page.evaluate(() => window.scrollTo(0, 900))
await new Promise(r => setTimeout(r, 600))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/home-products-390.png' })
await page.evaluate(() => window.scrollTo(0, 1800))
await new Promise(r => setTimeout(r, 300))
await page.screenshot({ path: 'D:/berry-patch/audit-shots/home-bottom-390.png' })

await browser.close()
console.log('done')
