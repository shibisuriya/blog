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

  // 2. Save DOCX
  const htmlContent = await page.content()
  const blob = htmlDocx.asBlob(htmlContent)
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const docxPath = path.join(OUTPUT_DIR, 'shibi-resume.docx')
  fs.writeFileSync(docxPath, buffer)
  console.log(`✅ Saved DOCX to ${docxPath}`)

  await browser.close()
})()
