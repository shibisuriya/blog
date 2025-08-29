import Link from '@/components/Link'
import { slug } from 'github-slugger'

import seriesData from 'app/series-data.json'

export default function SeriesLayout(props) {
  const { children }: { children: React.ReactNode } = props
  const series = Object.keys(seriesData)
  const sortedSeriesData = series.sort((a, b) => seriesData[b] - seriesData[a])

  return (
    <>
      <div>
        <div className="pt-6 pb-6"></div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              <ul>
                {sortedSeriesData.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${series[t]})`}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
