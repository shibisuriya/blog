interface Props {
  isPublished?: boolean
}

function BlogStatus(props: Props) {
  const { isPublished } = props

  return isPublished ? (
    <span className="m-1 inline-block rounded-lg bg-green-500 p-2 text-xs text-white">
      PUBLISHED
    </span>
  ) : (
    <span className="m-1 inline-block rounded-lg bg-red-500 p-2 text-xs text-white">DRAFT</span>
  )
}

export { BlogStatus }
