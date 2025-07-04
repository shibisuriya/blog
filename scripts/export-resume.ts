import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import htmlDocx from 'html-docx-js'

const OUTPUT_DIR = './dist'
const RESUME_URL = 'http://localhost:3000/resume'

;(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  console.log(`⏳ Visiting ${RESUME_URL}...`)
  await page.goto(RESUME_URL, { waitUntil: 'networkidle0' })

  // 1. Save PDF
  const pdfPath = path.join(OUTPUT_DIR, 'shibi-resume.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1in',
      bottom: '1in',
      left: '1in',
      right: '1in',
    },
  })
  console.log(`✅ Saved PDF to ${pdfPath}`)

  const htmlContent = await page.content()
  const docxBlobOrBuffer = htmlDocx.asBlob(htmlContent)

  let buffer: Buffer

  if (docxBlobOrBuffer instanceof Blob) {
    const arrayBuffer = await docxBlobOrBuffer.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } else {
    // Already a Node.js Buffer, use as-is
    buffer = docxBlobOrBuffer as Buffer
  }

  const docxPath = path.join(OUTPUT_DIR, 'resume.docx')
  fs.writeFileSync(docxPath, buffer)

  await browser.close()
})()
