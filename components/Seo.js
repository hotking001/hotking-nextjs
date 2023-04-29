import Head from "next/head"
import { useRouter } from 'next/router'

function Seo({ seo }) {
    const router = useRouter()
  return (
    <Head>
      {seo.metaTitle && (
        <>
          <title>{seo.metaTitle}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={seo.metaTitle} />
          <meta name="twitter:title" content={seo.metaTitle} />
          <link rel="canonical" href={`https://kinghot.vercel.app${router.pathname}`} data-react-helmet="true" />
        </>
      )}
      {seo.metaDescription && (
        <>
          <meta name="description" content={seo.metaDescription} />
          <meta property="og:description" content={seo.metaDescription} />
          <meta name="twitter:description" content={seo.metaDescription} />
        </>
      )}
      {seo.shareImage && (
        <>
          <meta property="og:image" content={seo.shareImage} />
          <meta name="twitter:image" content={seo.shareImage} />
          <meta name="image" content={seo.shareImage} />
        </>
      )}
      {seo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo;