'use client'

import { useState } from 'react'

function ContactMeForm() {
  const [status, setStatus] = useState<'success' | 'error' | 'idle' | 'submitting'>('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.target)
    const data = {
      ...Object.fromEntries(formData),
      accessKey: process.env.NEXT_PUBLIC_STATICFORMS_API_KEY,
    }

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

  if (status == 'success') {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <div className="mb-4 text-6xl text-green-500">✓</div>
        <h2 className="text-2xl font-bold">Thanks!</h2>
        <p className="mt-2">I'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="hover:text-primary-400 mt-6 text-sm">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <input type="text" name="honeypot" className="hidden" />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Name<span className={'text-red-400'}>*</span>
          </div>
          <label htmlFor="name-input">
            <span className="sr-only">Name</span>
            <input
              disabled={status === 'submitting'}
              className="focus:ring-primary-600 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
              id="name-input"
              placeholder="Enter your name"
              type="text"
              name="name"
              required={true}
            />
          </label>
        </div>
        <div className="w-full md:w-1/2">
          <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Email<span className={'text-red-400'}>*</span>
          </div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              disabled={status === 'submitting'}
              className="focus:ring-primary-600 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
              id="email-input"
              placeholder="Enter your email"
              type="email"
              name="email"
              required={true}
            />
          </label>
        </div>
      </div>
      <div>
        <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
          Message<span className={'text-red-400'}>*</span>
        </div>
        <label htmlFor="message-textarea">
          <span className="sr-only">Message</span>
          <textarea
            disabled={status === 'submitting'}
            className="focus:ring-primary-600 h-48 w-full rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
            id="message-textarea"
            placeholder="Enter your message"
            name="message"
            required={true}
          />
        </label>
      </div>
      <div className={'flex justify-end'}>
        <span className="text-sm">
          Powered by{' '}
          <a
            target="_blank"
            href={'https://www.staticforms.dev'}
            className={'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'}
          >
            staticforms
          </a>
        </span>
      </div>
      <button
        disabled={status === 'submitting'}
        className="bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 block w-1/2 rounded-md p-2 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none md:w-1/4 dark:ring-offset-black"
        type="submit"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-md text-red-500">Something went wrong. Try again.</p>
      )}
    </form>
  )
}

export { ContactMeForm }
