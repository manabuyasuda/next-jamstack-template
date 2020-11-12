import Head from "next/head"
import Link from "next/link"
import site from 'site.config.js'

const Layout = (props) => {
  const { title, description, url, children } = props
  const siteName = site.name
  const pageDescription = description || site.description
  const isHomePage = url === '/' ? true: false;

  return (
    <div>
      <Head>
        <title>{title ? `${title} | ${siteName}` : siteName}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={site.host + url} />
        <meta property="og:type" content={isHomePage ? 'website' : 'article'} />
        <meta property="og:image" content={site.ogpImg} />
        <meta property="og:url" content={site.host + url} />
        <meta property="og:description" content={pageDescription} / >
        <meta property="og:site_name" content={siteName} / >
        <meta property="og:locale" content={site.lang} />
        <meta name="twitter:card" content={site.twitterCard} />
        <meta name="twitter:site" content={site.twitterSite} />
      </Head>

      <header>
        <h1>
          <Link href="/">
            <a>{title ? `${title} | ${siteName}` : siteName}</a>
          </Link>
        </h1>
      </header>

      <main>
        {children}
      </main>

      <footer>
        &copy; {siteName}
      </footer>
    </div>
  )
}

export default Layout