import Layout from "@components/Layout/"
import NewsNav from '@components/NewsNav/'
import { yearsArray } from '@lib/years'
import { formatNewsDate } from '@lib/date'

const years = yearsArray();

export default function News({post}) {
  return (
    <Layout title={post.title} description={post.description} url={`/news/${post.id}`}>
      <div>
        <span>{formatNewsDate(post.publishedAt)}</span>
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
  // `posts/[slug].js`
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
  const res = await fetch(`${process.env.CMS_ROOT_ENDPOINT}news`, key)
  const repos = await res.json()
  const paths = repos.contents.map(repo => `/news/${repo.id}`)

  return {
    paths,
    fallback: false
  }
};
