import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })

// Helper
const shot = async (name, scrollY = 0) => {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY)
  await new Promise(r => setTimeout(r, 350))
  await page.screenshot({ path: `D:/berry-patch/audit-shots/${name}.png` })
}

// ── Home page ──
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1200))
await shot('home-hero', 0)
await shot('home-products', 900)
await shot('home-mission', 1900)
await shot('home-footer', 2600)

// ── Strawberry page ──
await page.goto('http://localhost:5173/strawberry', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1200))
await shot('sb-hero', 0)
await shot('sb-stats', 620)
await shot('sb-story', 1100)
await shot('sb-lab', 1900)
await shot('sb-gallery', 2700)

await browser.close()
console.log('done')
