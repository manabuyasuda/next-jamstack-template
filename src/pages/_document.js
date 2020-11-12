import Document, { Html, Head, Main, NextScript } from 'next/document'
import site from 'site.config'
import { GOOGLE_ANALYTICS_ID } from '@lib/gtag'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={site.lang}>
        <Head>
          {/* gtag / Google Analytics */}
          {GOOGLE_ANALYTICS_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
