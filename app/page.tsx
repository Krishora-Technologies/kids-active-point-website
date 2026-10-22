'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, BookOpen, Check, Heart, MapPin, Menu, MessageCircle, Phone, Sparkles, X } from 'lucide-react'

const programs = [
  { name: 'Play Group', short: 'Play, explore & make friends', desc: 'A welcoming introduction to group activities, play, interaction, and early learning.', color: 'yellow', icon: '✦' },
  { name: 'Nursery', short: 'Curiosity starts here', desc: 'Activities that encourage language development, creativity, social skills, and early concepts.', color: 'mint', icon: '●' },
  { name: 'Junior KG', short: 'Learn through discovery', desc: 'Foundational learning through age-appropriate activities, early literacy, numeracy, and creative exploration.', color: 'blue', icon: '◆' },
  { name: 'Senior KG', short: 'Ready for big steps', desc: 'Activities designed to strengthen foundational knowledge, communication, confidence, and school readiness.', color: 'orange', icon: '★' },
]

const galleryItems = [
  { title: 'Interactive Learning & Play', category: 'Classroom', image: '/images/classroom-activity.jpg' },
  { title: 'Abacus & Focus Skills', category: 'Activities', image: '/images/abacus-learning.jpg' },
  { title: 'Festivals & Celebrations', category: 'Celebrations', image: '/images/school-celebration.jpg' },
  { title: 'Kids Active Point Campus', category: 'Campus', image: '/images/school-entrance.jpg' },
  { title: 'Creative Hands-on Activity', category: 'Play', image: '/images/play-learning.jpg' },
  { title: 'Classroom Moments', category: 'Daily Joy', image: '/images/hero-classroom.jpg' },
]
const phone = '09082166938'
const whatsapp = '919082166938'
const address = 'Shop No. 19, Mahajan Chawl, Patharli Road, Dombivli, Gograswadi, Dombivli East, Kalyan, Maharashtra 421201'
const directions = 'https://maps.google.com/?q=Kids+Active+point+play+group+and+nursery,+Jr.+Kg+%26+Sr.+Kg.+Dombivali'


function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Kids Active Point home">
      <Image
        src="/images/logo.png"
        alt="Kids Active Point Logo"
        width={42}
        height={42}
        className="logo-img"
        priority
      />
      <span>Kids Active <b>Point</b></span>
    </a>
  )
}

function EnquiryForm({ selected = '' }: { selected?: string }) {
  const [program, setProgram] = useState(selected)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const phoneValue = String(data.get('phone') || '').trim()
    const interest = String(data.get('program') || '')
    const nextErrors: Record<string, string> = {}
    if (!name) nextErrors.name = 'Please share your name.'
    if (!/^([6-9]\d{9})$/.test(phoneValue.replace(/\D/g, ''))) nextErrors.phone = 'Enter a valid 10-digit mobile number.'
    if (!interest) nextErrors.program = 'Please select a program.'
    if (!data.get('consent')) nextErrors.consent = 'Please agree to be contacted.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    const message = `Hello Kids Active Point, I would like to enquire about admissions.\n\nParent Name: ${name}\nChild Name: ${data.get('child') || 'Not shared'}\nProgram: ${interest}\nPhone: ${phoneValue}\nMessage: ${data.get('message') || 'Not shared'}`
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }
  if (submitted) return <div className="success-box"><span className="success-icon"><Check /></span><h3>Your enquiry is ready</h3><p>WhatsApp has opened with your details filled in. Review the message and send it to connect with us.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={16} /></button></div>
  return <form className="enquiry-form" onSubmit={submit} noValidate>
    <div className="form-grid"><label>Parent / Guardian name <input name="name" placeholder="Your full name" aria-invalid={!!errors.name} />{errors.name && <small>{errors.name}</small>}</label><label>Phone number <input name="phone" inputMode="numeric" placeholder="10-digit mobile number" aria-invalid={!!errors.phone} />{errors.phone && <small>{errors.phone}</small>}</label></div>
    <div className="form-grid"><label>Child&apos;s name <input name="child" placeholder="Optional" /></label><label>Program of interest <select name="program" value={program} onChange={e => setProgram(e.target.value)} aria-invalid={!!errors.program}><option value="">Select a program</option>{programs.map(p => <option key={p.name}>{p.name}</option>)}<option>Not Sure Yet</option></select>{errors.program && <small>{errors.program}</small>}</label></div>
    <label>Message <textarea name="message" placeholder="Tell us anything you would like to know" rows={3} /></label>
    <label className="check-row"><input type="checkbox" name="consent" /> <span>I agree to be contacted about my admission enquiry.</span></label>{errors.consent && <small>{errors.consent}</small>}
    <button className="button button-primary submit-button" type="submit">Continue on WhatsApp <MessageCircle size={18} /></button>
    <p className="form-note">You&apos;ll review your message before sending it.</p>
  </form>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    if (lightbox) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox])
  return <main id="top">
    <header className="site-header"><div className="container header-inner"><Logo /><nav className="desktop-nav"><a href="#about">About us</a><a href="#programs">Programs</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></nav><a className="button button-small button-primary desktop-cta" href="#enquire">Enquire now <ArrowRight size={15} /></a><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button></div></header>
    {menuOpen && <div className="mobile-menu"><div className="mobile-menu-top"><Logo /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div><nav><a href="#about" onClick={() => setMenuOpen(false)}>About us</a><a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav><a className="button button-primary" href="#enquire" onClick={() => setMenuOpen(false)}>Enquire now <ArrowRight size={16} /></a></div>}

    <section className="hero"><div className="hero-dots" /><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><Sparkles size={15} /> Happy beginnings, bright futures</div><h1>Big dreams begin with <em>little steps.</em></h1><p className="hero-lead">A happy place for little learners to explore, play, discover, and grow.</p><div className="hero-actions"><a className="button button-primary" href="#enquire">Enquire for admission <ArrowRight size={17} /></a><a className="button button-ghost" href={`tel:+91${whatsapp}`}><Phone size={17} /> Call us now</a></div><div className="program-pills">{programs.map(p => <span key={p.name}><span className="pill-dot" />{p.name}</span>)}</div></div><div className="hero-art"><div className="art-blob" /><Image src="/images/hero-classroom.jpg" alt="Children learning and playing together in Kids Active Point preschool classroom" width={720} height={540} priority loading="eager" /><span className="floating-note note-one">Learn <b>through play</b></span><span className="floating-note note-two">★</span><span className="floating-note note-three">hello!</span></div></div></section>

    <section className="trust-strip"><div className="container trust-inner"><span><Heart size={18} fill="currentColor" /> A warm start to learning</span><i /> <span><BookOpen size={18} /> Play Group · Nursery · Jr. KG · Sr. KG</span><i /> <span><Sparkles size={18} /> Dombivli&apos;s little learners</span></div></section>

    <section className="section intro" id="about"><div className="container intro-grid"><div><div className="eyebrow blue-eyebrow">A place to belong</div><h2>Welcome to <span>Kids Active Point</span></h2></div><div className="intro-copy"><p className="large-copy">Every child has a spark. We create a welcoming space where that spark can grow through play, creativity, communication, and everyday discovery.</p><p>Our early learning programs help children build foundational skills, confidence, and social connections in ways that feel joyful and age-appropriate.</p><a className="text-link" href="#enquire">Come say hello <ArrowRight size={16} /></a></div></div></section>

    <section className="section programs-section" id="programs"><div className="container"><div className="section-heading"><div><div className="eyebrow orange-eyebrow">Find their first favourite class</div><h2>Little learners, <span>big adventures.</span></h2></div><p>Each program is a gentle next step, designed around how young children naturally learn: with curiosity, movement, and plenty of encouragement.</p></div><div className="program-grid">{programs.map(p => <article className={`program-card ${p.color}`} key={p.name}><div className="program-icon">{p.icon}</div><div><h3>{p.name}</h3><p className="program-short">{p.short}</p><p>{p.desc}</p><a href="#enquire" className="card-link">Enquire about this class <ArrowRight size={15} /></a></div></article>)}</div></div></section>

    <section className="section gallery-section" id="gallery"><div className="container"><div className="section-heading"><div><div className="eyebrow blue-eyebrow">A peek inside</div><h2>Little moments, <span>big memories.</span></h2></div><p>Real classroom moments, active learning, creative play, and celebrations at Kids Active Point.</p></div><div className="gallery-grid">{galleryItems.map((item) => <button className="gallery-item" key={item.title} onClick={() => setLightbox(item)}><Image src={item.image} alt={item.title} width={480} height={340} loading="lazy" /><span>{item.title} <ArrowRight size={15} /></span></button>)}</div></div></section>

    <section className="enquire-section" id="enquire"><div className="container enquire-grid"><div className="enquire-copy"><div className="eyebrow yellow-eyebrow">Let&apos;s take the next step</div><h2>Give your child a <span>happy start.</span></h2><p>Looking for a preschool for your little one? Share a few details and we&apos;ll help you learn more about our programs.</p><div className="contact-mini"><a href={`tel:+91${whatsapp}`}><Phone size={17} /> {phone}</a><a href={`https://wa.me/${whatsapp}`}><MessageCircle size={17} /> WhatsApp us</a></div></div><div className="form-card"><div className="form-card-header"><span>Admissions enquiry</span><span className="form-step">1 min form</span></div><EnquiryForm /></div></div></section>

    <section className="section contact-section" id="contact"><div className="container contact-grid"><div><div className="eyebrow orange-eyebrow">Come find us</div><h2>We&apos;d love to <span>meet you.</span></h2><p>Have a question or want to visit? Reach out to the team at Kids Active Point in Dombivli East.</p><div className="contact-details"><a href={`tel:+91${whatsapp}`}><span><Phone /></span><div><small>Call us</small><b>{phone}</b></div></a><div><span><MapPin /></span><div><small>Our address</small><b>{address}</b></div></div></div><a className="button button-primary" href={directions} target="_blank" rel="noreferrer">Get directions <MapPin size={17} /></a></div><div className="map-card"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.61109682058!2d73.0978058!3d19.2121813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7959f12f186e3%3A0xed711ad63ebd8fc2!2sKids%20Active%20point%20play%20group%20and%20nursery%2C%20Jr.%20Kg%20%26%20Sr.%20Kg.%20Dombivali!5e0!3m2!1sen!2sin!4v1792672276572!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Kids Active Point Google Maps location" /><a href={directions} target="_blank" rel="noreferrer" className="map-card-link"><span>Kids Active Point · Dombivli East</span><b>Open in Google Maps <ArrowRight size={14} /></b></a></div></div></section>

    <footer className="footer"><div className="container footer-grid"><div><Logo /><p>A happy place for little learners to explore, play, discover, and grow.</p></div><div><h4>Explore</h4><a href="#about">About us</a><a href="#programs">Programs</a><a href="#gallery">Gallery</a></div><div><h4>Connect</h4><a href={`tel:+91${whatsapp}`}>{phone}</a><a href={`https://wa.me/${whatsapp}`}>WhatsApp us</a><a href={directions}>Get directions</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Kids Active Point Play Group and Nursery. All rights reserved.</span><span>Made for little beginnings <Heart size={14} fill="currentColor" /></span></div></footer>

    <div className="mobile-actions"><a href={`tel:+91${whatsapp}`}><Phone size={18} /><span>Call</span></a><a href={`https://wa.me/${whatsapp}`}><MessageCircle size={18} /><span>WhatsApp</span></a><a href={directions}><MapPin size={18} /><span>Directions</span></a></div>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title} onClick={() => setLightbox(null)}><button className="lightbox-close" aria-label="Close image" onClick={() => setLightbox(null)}><X size={20} /></button><div onClick={e => e.stopPropagation()}><Image src={lightbox.image} alt={lightbox.title} width={960} height={680} style={{ maxHeight: '75vh', width: 'auto', margin: '0 auto', display: 'block', objectFit: 'contain', borderRadius: '14px' }} /><p style={{ textAlign: 'center', marginTop: '12px', fontSize: '15px' }}><b>{lightbox.category}</b> — {lightbox.title}</p></div></div>}
  </main>
}
