import { useEffect } from 'react'

export default function SeoHead({ title, description, image, url, type = 'website' }) {
  useEffect(() => {
    const prev = document.title
    if (title) document.title = title

    const setMeta = (selector, content) => {
      if (!content) return
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const attr = selector.match(/\[(\w+)="([^"]+)"\]/)
        if (attr) el.setAttribute(attr[1], attr[2])
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:image"]', image)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:type"]', type)
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', image)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    if (url) canonical.setAttribute('href', url)

    return () => {
      document.title = prev
    }
  }, [title, description, image, url, type])

  return null
}
