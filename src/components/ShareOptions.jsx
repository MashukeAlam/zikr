import { useMemo } from 'react'
import { BiLogoLinkedin } from "react-icons/bi";
import { RiFacebookFill, RiTwitterFill } from "react-icons/ri";


export default function ShareOptions({ arabic, transliteration, meaning, url }) {
  const { shareUrl, text } = useMemo(() => {
    const shareUrl = url || window.location.href
    const text = [arabic, transliteration, meaning].filter(Boolean).join('\n')
    return { shareUrl, text }
  }, [arabic, transliteration, meaning, url])

  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    shareUrl
  )}`

  return (
    <div
      className="zikrShare"
      aria-label=""
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="zikrShare__links" aria-label="Share options">
        <a className="zikrShare__link" href={facebookHref} target="_blank" rel="noreferrer">
          <RiFacebookFill size={18} style={{ verticalAlign: 'middle' }} />
        </a>
        
        <a className="zikrShare__link" href={twitterHref} target="_blank" rel="noreferrer">
          <RiTwitterFill size={18} style={{ verticalAlign: 'middle' }} />
        </a>
        
        <a className="zikrShare__link" href={linkedinHref} target="_blank" rel="noreferrer">
            <BiLogoLinkedin size={18} style={{ verticalAlign: 'middle' }} /> 
        </a>
      </div>
    </div>
  )
}