import Layout from "@components/Layout/"
import NewsNav from '@components/NewsNav/'
import { getYear } from 'date-fns'
import { yearsArray } from '@lib/years'
import { formatNewsDate } from '@lib/date'

const years = yearsArray();

export default function News({post}) {
  return (
    <Layout title={post.title} description={post.description} url={`/news/${post.publishedYear}/${post.id}`}>
      <div>
        <span>{formatNewsDate(post.publishedAt)}</span>
      </div>
      <div>
        <span>{`/news/${post.publishedYear}/${post.id}`}</span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      <NewsNav years={years} />
    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export const getStaticProps = async context => {
  const slug = context.params.slug
  const key = {
    headers: {'X-API-KEY': process.env.CMC_API_KEY},
  }
  const res = await fetch(
    `${process.env.CMS_ROOT_ENDPOINT}news/${slug}`,
    key,
  )
  const post = await res.json()

  return {
    props : {
      post: post,
    }
  }
};

/**
 * 有効な URL パラメータを全件返す
 */
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.CMC_API_KEY},
  }
  const newsData = await fetch(`${process.env.CMS_ROOT_ENDPOINT}news`, key)
  const newsJson = await newsData.json()
  const paths = newsJson.contents.map(news => {
    const publishedYear = getYear(new Date(news.publishedYear))
    return `/news/${publishedYear}/${news.id}`
  })

  return {
    paths,
    fallback: false
  }
};
