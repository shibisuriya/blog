import { Post } from './Post'

export function Posts(props) {
  const { posts: displayPosts, showTags = true, showPublishedOn = true } = props

  return (
    <ul>
      {displayPosts.map((post) => {
        const { path, date, title, summary, tags, draft, slug } = post
        return (
          <Post
            key={path}
            path={path}
            date={date}
            title={title}
            summary={summary}
            tags={tags}
            draft={draft}
            showTags={showTags}
            showPublishedOn={showPublishedOn}
          />
        )
      })}
    </ul>
  )
}
