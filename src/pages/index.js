import Link from 'next/link'
import Layout from '@components/Layout/'
import { formatNewsDate } from '@lib/date'

const thisYear = new Date().getFullYear()

export default function Home(props) {
  const { newsList, hasNews } = props

  return (
    <Layout url="/">
      {hasNews ? (
        <div id="news">
          <ol>
            {newsList.map((news) => (
              <li key={news.id}>
                <Link href="/news/[year]/[id]" as={`/news/${news.publishedYear}/${news.id}`}>
                  <a>
                    <h2>{news.title}</h2>
                    <p>{formatNewsDate(news.publishedAt)}</p>
                    <p>{`/news/${news.publishedYear}/${news.id}`}</p>
                    {news.tag.length ? (
                      <ul>
                        {news.tag.map((tag) => (
                          <li key={`${news.id}${tag.id}`}>{tag.name}</li>
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
  const newsData = await fetch(`${process.env.CMS_ROOT_ENDPOINT}news`, key)
  const newsJson = await newsData.json()
  const hasNews = newsJson.contents.length > MAX_COUNT

  return {
    props: {
      newsList: newsJson.contents.slice(0, MAX_COUNT),
      hasNews,
    },
  }
}
