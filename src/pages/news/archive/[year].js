import Link from "next/link"
import Layout from "@components/Layout/"
import NewsNav from '@components/NewsNav/'
import { yearsArray } from '@lib/years'
import { formatNewsArchiveDate } from '@lib/date'

const years = yearsArray();

export default function NewsArchive(props) {
  const { posts, title, description, url } = props

  return (
    <Layout title={title} description={description} url={url}>
      {posts.map((post) => <div
        key={post.id}
      >
        <h2><Link href="/news/[id]" as={`/news/${post.id}`}><a>{post.title}</a></Link></h2>
        <div>{formatNewsArchiveDate(post)}</div>
        <div dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>)}

      <NewsNav years={years} />

    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const year = params.year
  const key = {
    headers: {'X-API-KEY': process.env.CMC_API_KEY},
  }
  const res = await fetch(
    `${process.env.CMS_ROOT_ENDPOINT}news`,
    key,
  )
  const posts = await res.json()

  const contents = posts.contents.filter(post => {
    return post.year === year
  });

  return {
    props: {
      posts: contents,
      title: `${year}年`,
      description: `${year}年のディスクリプション`,
      url: `/news/archive/${year}`,
    }
  }
}

/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
  const paths = years.map((year) => ({
    params: { year: `${year}` }
  }))

  return {
    paths: paths,
    fallback: false,
  }
}
