import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const OUTPUT_DIR = './dist'
const RESUME_URL = 'http://localhost:3000/resume'

async function exportResume() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  console.log(`⏳ Visiting ${RESUME_URL}...`)
  await page.goto(RESUME_URL, { waitUntil: 'networkidle0' })

  const pdfPath = path.join(OUTPUT_DIR, 'shibi-resume.pdf')

  // await browser.close()
}

exportResume()
