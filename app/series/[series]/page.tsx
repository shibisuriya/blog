import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Posts } from '@/components/Posts'
import { slug } from 'github-slugger'
import { Pagination } from '@/components/Pagination'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Series' })

export default async function Page(props: { params: Promise<{ series: string }> }) {
  const params = await props.params
  const series = decodeURI(params.series)
  // const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.series && slug(post.series) === series))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <div>
      <Posts posts={filteredPosts} showTags={false} showPublishedOn={false} />
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
