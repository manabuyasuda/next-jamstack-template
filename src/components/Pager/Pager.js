import Link from "next/link"

const Pager = (props) => {
  const { total, page, perPage, href, asCallback } = props
  const prevPage = page > 1 ? page - 1 : null
  let nextPage = null

  if (page < Math.ceil(total / perPage)) {
    nextPage = page + 1
  }

  return (
    <div>
      <span>
        {prevPage ? (
          <Link href={href} as={asCallback(prevPage)}>
            <a>{prevPage}</a>
          </Link>
        ) : ``}
      </span>
      <span>{page}</span>
      <span>
        {nextPage ? (
          <Link href={href} as={asCallback(nextPage)}>
            <a>{nextPage}</a>
          </Link>
        ) : ``}
      </span>
    </div>
  )
}

export default Pager