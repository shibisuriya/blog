import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { BlogStatus } from '@/components/BlogStatus'

export function Posts(props) {
  const { posts: displayPosts } = props

  return (
    <ul>
      {displayPosts.map((post) => {
        const { path, date, title, summary, tags, draft } = post
        return (
          <li key={path} className="py-5">
            <article className="flex flex-col space-y-2 xl:space-y-0">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                  <time dateTime={date} suppressHydrationWarning>
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                </dd>
              </dl>
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl leading-8 font-bold tracking-tight">
                    <Link href={`/${path}`} className="flex text-gray-900 dark:text-gray-100">
                      <div>
                        <BlogStatus isPublished={!draft} /> {title}
                      </div>
                    </Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                  </div>
                </div>
                <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
