import Link from 'next/link'
import Layout from '@components/Layout/'
import { formatNewsDate } from '@lib/date'

const thisYear = new Date().getFullYear()

export default function Home(props) {
  const { posts, hasNews } = props

  return (
    <Layout url="/">
      {hasNews ? (
        <div id="news">
          <ol>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href="/news/[id]" as={`/news/${post.id}`}>
                  <a>
                    <h2>{post.title}</h2>
                    <p>{formatNewsDate(post.publishedAt)}</p>
                    {post.tag.length ? (
                      <ul>
                        {post.tag.map((tag) => (
                          <li key={`${post.id}${tag.id}`}>{tag.name}</li>
                        ))}
                      </ul>
                    ) : (
                      ``
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ol>
          <div>
            <Link href="/news/archive/[page]" as={`/news/archive/${thisYear}/`}>
              <a>Newsをすべて見る</a>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const MAX_COUNT = 2
  const key = {
    headers: { 'X-API-KEY': process.env.CMC_API_KEY },
  }
  const res = await fetch(`${process.env.CMS_ROOT_ENDPOINT}news`, key)
  const data = await res.json()
  const hasNews = data.contents.length > MAX_COUNT

  return {
    props: {
      posts: data.contents.slice(0, MAX_COUNT),
      hasNews,
    },
  }
}
