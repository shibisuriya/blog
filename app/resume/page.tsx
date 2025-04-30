import { genPageMetadata } from 'app/seo'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { Resume, allResumes } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'Resume', description: "Shibi Suriya's resume" })

export default function ResumePage() {
  const resume: Resume = allResumes[0]
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Resume
          </h1>
        </div>
        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
          <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
            <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
              <MDXLayoutRenderer code={resume.body.code} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
