'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { slug } from 'github-slugger'

import seriesData from 'app/series-data.json'

export default function SeriesLayout({ children }: { children: React.ReactNode }) {
  const series = Object.keys(seriesData)
  const sortedSeriesData = series.sort((a, b) => seriesData[b] - seriesData[a])
  const pathname = usePathname()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Series
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A collection of related tutorials/blog posts.
        </p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex">
          <div className="hidden h-full max-h-screen max-w-[400px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              <ul>
                {sortedSeriesData.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${series[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/series/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${seriesData[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
