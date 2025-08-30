import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { Posts } from '@/components/Posts'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import seriesData from 'app/series-data.json'

export default async function Page(props: { params: Promise<{ series: string }> }) {
  const params = await props.params
  const series = decodeURI(params.series)
  // const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.series && slug(post.series) === series)).sort(
      (a, b) => a.part! - b.part!
    )
  )
  const sortedSeriesData = Object.keys(seriesData).sort((a, b) => seriesData[b] - seriesData[a])

  return (
    <>
      <div>
        <div className="pt-6 pb-6"></div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              <ul>
                {sortedSeriesData.map((s) => {
                  return (
                    <li key={s} className="my-3">
                      {series === slug(s) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${s} (${seriesData[s]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/series/${slug(s)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${s}`}
                        >
                          {`${s} (${seriesData[s]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <Posts posts={filteredPosts} showTags={false} showPublishedOn={false} />
          </div>
        </div>
      </div>
    </>
  )
}
