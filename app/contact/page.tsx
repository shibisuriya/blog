'use client'

import { genPageMetadata } from 'app/seo'
import { useState } from 'react'

// export const metadata = genPageMetadata({ title: 'Contact', description: 'Contact Shibi Suriya' })

export default function ContactPage() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="container py-12">
        {status == 'success' ? (
          <div className="mx-auto max-w-md p-10 text-center">
            <div className="mb-4 text-6xl text-green-500">✓</div>
            <h2 className="text-2xl font-bold">Thanks!</h2>
            <p className="mt-2">I'll get back to you shortly.</p>
            <button
              onClick={() => setStatus('idle')}
              className="hover:text-primary-400 mt-6 text-sm"
            >
              Send another message
            </button>
          </div>
        ) : (
          <section className="mx-auto max-w-md rounded-md border-2 border-gray-200/60 p-6 shadow-md dark:border-gray-700/60">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="accessKey" value={process.env.STATICFORMS_API_KEY} />
              <input type="text" name="honeypot" className="hidden" />
              <div>
                <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Name<span className={'text-red-400'}>*</span>
                </div>
                <label htmlFor="name-input">
                  <span className="sr-only">Name</span>
                  <input
                    className="focus:ring-primary-600 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
                    id="name-input"
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                  />
                </label>
              </div>

              <div>
                <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Email<span className={'text-red-400'}>*</span>
                </div>
                <label htmlFor="email-input">
                  <span className="sr-only">Email address</span>
                  <input
                    className="focus:ring-primary-600 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
                    id="email-input"
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                  />
                </label>
              </div>

              <div>
                <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Message<span className={'text-red-400'}>*</span>
                </div>
                <label htmlFor="message-textarea">
                  <span className="sr-only">Message</span>
                  <textarea
                    className="focus:ring-primary-600 h-48 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
                    id="message-textarea"
                    placeholder="Enter your message"
                    name="message"
                  />
                </label>
              </div>
              <button
                disabled={status === 'loading'}
                className="bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 w-full rounded-md p-2 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none dark:ring-offset-black"
                type="submit"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="mt-2 text-center text-sm text-red-500">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </section>
        )}
      </div>
    </div>
  )
}
