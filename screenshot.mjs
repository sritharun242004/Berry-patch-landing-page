import puppeteer from 'puppeteer'
import path from 'path'

const OUT = 'D:/berry-patch/audit-shots'

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
]

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

for (const vp of viewports) {
  const page = await browser.newPage()
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 })

  // Home page — full
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 1500))
  await page.screenshot({ path: `${OUT}/home-full-${vp.name}.png`, fullPage: true })

  // Strawberry page — full
  await page.goto('http://localhost:5173/strawberry', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 1500))
  await page.screenshot({ path: `${OUT}/strawberry-full-${vp.name}.png`, fullPage: true })

  // Strawberry — wave area specifically (scroll to it)
  await page.evaluate(() => window.scrollTo(0, 600))
  await new Promise(r => setTimeout(r, 400))
  await page.screenshot({ path: `${OUT}/strawberry-wave-${vp.name}.png` })

  await page.close()
}

await browser.close()
console.log('Screenshots saved to', OUT)
