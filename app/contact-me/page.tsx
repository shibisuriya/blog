import { genPageMetadata } from 'app/seo'
import { ContactMeForm } from './ContactMeForm'

export const metadata = genPageMetadata({ title: 'Contact', description: 'Contact Shibi Suriya' })

export default function ContactPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Contact me
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Leave a message, I will reply as soon as possible.
        </p>
      </div>
      <div className="py-8">
        <div className="flex flex-wrap">
          <ContactMeForm />
        </div>
      </div>
    </div>
  )
}
