import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const OUTPUT_DIR = './dist'
const RESUME_URL = 'http://localhost:3000/resume'

async function exportResume() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  await page.goto(RESUME_URL, { waitUntil: 'networkidle0' })

  const pdfPath = path.join(OUTPUT_DIR, 'shibi-resume.pdf')

  await page.evaluate(() => {
    const resumeElem = document.querySelector('#resume')
    if (!resumeElem) {
      throw new Error('Resume element not found in DOM.')
    }
    resumeElem.classList.add('pl-10', 'pr-10', 'pt-10', 'pb-10')
    document.body.innerHTML = ''
    document.body.appendChild(resumeElem)
  })

  const updatedElement = await page.$('html')
  const boundingBox = await updatedElement!.boundingBox()

  await page.pdf({
    path: pdfPath,
    printBackground: true,
    margin: { left: '0cm', right: '0cm', top: '0cm', bottom: '0cm' },
    width: `${boundingBox!.width}px`,
    height: `${boundingBox!.height}px`,
  })

  await browser.close()
}

exportResume()
