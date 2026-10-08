import { useEffect, useState } from 'react'
import './App.css'
import logoImage from '../görsel/logo.png'
import afterImage from '../görsel/sonrası.jpg'
import beforeImage from '../görsel/öncesi.png'
import secondLifeImage from '../görsel/halinizin ikinci hayati.jpg'
import { SectionHeader } from './components/SectionHeader'
import {
  company,
  navItems,
  processSteps,
  serviceItems,
  testimonials,
} from './data/siteConfig'
import { calculateEstimate, servicePricing } from './utils/pricing'

const bookingOptions = ['Halı', 'Koltuk', 'Yorgan', 'Perde', 'Yatak', 'Battaniye']
const bookingSteps = [
  { label: 'Ne yıkatmak istiyorsunuz?', field: 'service' },
  { label: 'Ne kadar?', field: 'quantity' },
  { label: 'Adresiniz', field: 'address' },
  { label: 'Telefon numaranız', field: 'phone' },
  { label: 'Randevu tarihi', field: 'date' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('halı')
  const [quantity, setQuantity] = useState(2)
  const [currentStep, setCurrentStep] = useState(0)
  const [booking, setBooking] = useState({
    service: 'Halı',
    quantity: '2',
    address: '',
    phone: '',
    date: '',
  })
  const [bookingError, setBookingError] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalPrice = calculateEstimate(selectedCategory, Number(quantity) || 0)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const currentStepLabel = bookingSteps[currentStep]?.label

  const nextStep = () => {
    const stepField = bookingSteps[currentStep]?.field
    const value = booking[stepField]

    if (
      !value ||
      (stepField === 'quantity' && (!Number.isFinite(Number(value)) || Number(value) <= 0))
    ) {
      setBookingError('Lütfen bu alanı doldurun.')
      return
    }

    setBookingError('')
    setCurrentStep((previous) => Math.min(previous + 1, bookingSteps.length - 1))
  }

  const prevStep = () => {
    setBookingError('')
    setCurrentStep((previous) => Math.max(previous - 1, 0))
  }

  const submitBooking = (event) => {
    event.preventDefault()

    const isValid =
      Object.values(booking).every((value) => String(value).trim()) &&
      Number.isFinite(Number(booking.quantity)) &&
      Number(booking.quantity) > 0
    if (!isValid) {
      setBookingError('Lütfen tüm alanları doldurun.')
      setBookingSuccess('')
      return
    }

    const message = [
      '🔔 YENİ RANDEVU TALEBİ',
      '',
      `Telefon: ${booking.phone}`,
      `Hizmet: ${booking.service}`,
      `Adet: ${booking.quantity}`,
      `Randevu Tarihi: ${booking.date}`,
      `Adres: ${booking.address}`,
    ].join('\n')
    const phoneDigits = company.phone.replace(/\D/g, '')
    const nationalNumber = phoneDigits.replace(/^(?:0090|90|0)/, '')
    const whatsappNumber = `90${nationalNumber}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setBookingSuccess('Randevu bilgileriniz WhatsApp üzerinden gönderilmeye hazır.')
    setBookingError('')
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.district,
      addressCountry: 'TR',
    },
    openingHours: 'Mo-Sa 09:00-19:00',
    url: company.website,
    sameAs: [`https://www.instagram.com/${company.instagram.replace('@', '')}`],
  }

  const handleBookingChange = (field, value) => {
    setBooking((previous) => ({ ...previous, [field]: value }))
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="page-shell">
        <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
          <nav className="nav container" aria-label="Ana menü">
            <div className="brand-lockup">
              <img src={logoImage} alt="Umay Halı Yıkama logo" className="brand-logo-mark" />
              <a href="#top" className="brand" aria-label="Umay Halı Yıkama ana sayfa">
                <span className="brand-wordmark">Umay Halı Yıkama</span>
              </a>
            </div>

            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <a href="#booking" className="nav-cta">
              RANDEVU AL
            </a>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Mobil menü"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </nav>

          {mobileMenuOpen ? (
            <div className="mobile-menu">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#booking" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                Randevu Al
              </a>
            </div>
          ) : null}
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-overlay" />
            <div className="hero-inner container">
              <div className="hero-copy reveal">
                <span className="eyebrow">KAYSERİ • PREMIUM HALI BAKIMI</span>
                <h1>
                  Temizliğin ötesinde,
                  <span>Umay dokunuşu.</span>
                </h1>
                <p>
                  Halıdan koltuğa, perdeden yorgana kadar yaşam alanlarınızdaki tekstiller için özenli ve profesyonel temizlik hizmeti.
                </p>
                <div className="hero-actions">
                  <a href="#services" className="button primary">
                    HİZMETLERİ KEŞFEDİN
                  </a>
                  <a href={`https://wa.me/${company.whatsapp}?text=Merhaba%2C%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum.`} className="button secondary" target="_blank" rel="noreferrer">
                    WHATSAPP'TAN İLETİŞİME GEÇİN
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="story-block container" id="about">
            <div className="story-column copy reveal">
              <span className="eyebrow">HALINIZIN İKİNCİ HAYATI</span>
              <h2>
                HALINIZIN
                <span>İKİNCİ HAYATI.</span>
              </h2>
              <p>
                Bir halı yalnızca zemini tamamlamaz. Bir evin karakterini taşır. Bu yüzden her ürüne aynı yöntemle değil, kendi yapısına uygun şekilde yaklaşırız.
              </p>
              <a href="#process" className="inline-link">
                NASIL ÇALIŞTIĞIMIZI GÖR <span>→</span>
              </a>
            </div>

            <div className="story-column media reveal">
              <img
                src={secondLifeImage}
                alt="Özenle temizlenmiş modern salon halısı"
              />
            </div>
          </section>

          <section className="services container" id="services">
            <SectionHeader
              eyebrow="SERVİS"
              title="Temizlik, her detayın içinde anlam bulur."
              intro="Her ürün, farklı bir dokuyu ve farklı bir hikâyeyi barındırır."
            />

            <div className="services-grid reveal">
              {serviceItems.map((service) => (
                <article key={service.id} className="service-card">
                  <div className="service-card-image">
                    <img src={service.image} alt={`${service.title} hizmeti`} loading="lazy" />
                    <span className="service-number">{service.number}</span>
                  </div>
                  <div className="service-card-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href="#booking" className="inline-link">İNCELE <span>↗</span></a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="compare-section container">
            <div className="compare-header reveal">
              <span className="eyebrow">BEFORE / AFTER</span>
              <h2>DETAYLAR FARK YARATIR.</h2>
            </div>

            <div className="compare-static reveal">
              <div className="compare-grid" aria-label="Önce ve sonra halı karşılaştırması">
                <div className="compare-panel compare-before-panel">
                  <img src={beforeImage} alt="Önce halı" />
                  <span className="compare-badge compare-before-badge">ÖNCESİ</span>
                </div>
                <div className="compare-panel compare-after-panel">
                  <img src={afterImage} alt="Sonra halı" />
                  <span className="compare-badge compare-after-badge">SONRASI</span>
                </div>
              </div>
            </div>
          </section>

          <section className="process-section" id="process">
            <div className="container">
              <SectionHeader
                eyebrow="SÜREÇ"
                title="Halı temizliği, sade ve profesyonel şekilde ilerler."
                intro="Her adım, halınızın dokusuna ve ihtiyaçlarına göre planlanır."
              />
            </div>

            <div className="process-story reveal">
              {processSteps.map((step, index) => (
                <div key={step.number} className="process-step">
                  <div className="process-copy">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="process-visual">
                    <img src={step.image} alt={step.title} />
                  </div>
                  {index < processSteps.length - 1 ? <span className="step-arrow">↓</span> : null}
                </div>
              ))}
            </div>
          </section>

          <section className="testimonials container">
            <SectionHeader
              eyebrow="MÜŞTERİ DENEYİMİ"
              title="İnsanların evlerine bıraktığımız etki."
            />

            <div className="testimonial-track reveal">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="testimonial-item">
                  <p>“{testimonial.quote}”</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.area}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pricing container" id="pricing">
            <SectionHeader
              eyebrow="FİYATLANDIRMA"
              title="HİZMETİNİZİ SEÇİN"
              intro="Seçtiğiniz hizmetin birim fiyatı, adet bazında anlık olarak hesaplanır."
            />

            <div className="pricing-shell reveal">
              <div className="pricing-selector">
                <div className="selector-grid" role="tablist" aria-label="Hizmet türü seçimi">
                  {Object.entries({
                    halı: 'Halı',
                    koltuk: 'Koltuk',
                    yorgan: 'Yorgan',
                    perde: 'Perde',
                    yatak: 'Yatak',
                    battaniye: 'Battaniye',
                  }).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className={selectedCategory === key ? 'selector-button active' : 'selector-button'}
                      onClick={() => setSelectedCategory(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <label className="quantity-field">
                  <span>Adet</span>
                  <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(0, Number(event.target.value) || 0))}
                  />
                </label>
              </div>

              <div className="price-card">
                <span className="price-label">Toplam fiyat</span>
                <strong>₺ {totalPrice.toLocaleString('tr-TR')}</strong>
                <a href="#booking" className="button primary small">
                  Randevu oluştur →
                </a>
              </div>
            </div>
          </section>

          <section className="booking container" id="booking">
            <div className="booking-copy reveal">
              <span className="eyebrow">RANDEVU DENEYİMİ</span>
              <h2>RANDEVUNUZU OLUŞTURUN</h2>
              <p>Temizliğinize uygun, tam zamanlı ve hedefe yönelik bir plan oluşturuyoruz.</p>
            </div>

            <div className="booking-shell reveal">
              <div className="booking-steps" aria-label="Randevu adımları">
                {bookingSteps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    className={currentStep === index ? 'step-pill active' : 'step-pill'}
                    onClick={() => setCurrentStep(index)}
                  >
                    {index + 1}. {step.label}
                  </button>
                ))}
              </div>

              <form className="booking-form" onSubmit={submitBooking}>
                <div className="form-header">
                  <span>Adım {currentStep + 1}</span>
                  <h3>{currentStepLabel}</h3>
                </div>

                {currentStep === 0 ? (
                  <div className="choice-grid">
                    {bookingOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={booking.service === option ? 'choice-button active' : 'choice-button'}
                        onClick={() => handleBookingChange('service', option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}

                {currentStep === 1 ? (
                  <label className="field">
                    <span>Adet</span>
                    <input
                      type="number"
                      min="0"
                      value={booking.quantity}
                      onChange={(event) => handleBookingChange('quantity', event.target.value)}
                    />
                  </label>
                ) : null}

                {currentStep === 2 ? (
                  <label className="field">
                    <span>Adres</span>
                    <textarea
                      rows="3"
                      value={booking.address}
                      onChange={(event) => handleBookingChange('address', event.target.value)}
                    />
                  </label>
                ) : null}

                {currentStep === 3 ? (
                  <label className="field">
                    <span>Telefon</span>
                    <input
                      type="tel"
                      value={booking.phone}
                      onChange={(event) => handleBookingChange('phone', event.target.value)}
                    />
                  </label>
                ) : null}

                {currentStep === 4 ? (
                  <label className="field">
                    <span>Randevu tarihi</span>
                    <input
                      type="date"
                      value={booking.date}
                      onChange={(event) => handleBookingChange('date', event.target.value)}
                    />
                  </label>
                ) : null}

                <div className="form-actions">
                  {currentStep > 0 ? (
                    <button type="button" className="button secondary" onClick={prevStep}>
                      GERİ
                    </button>
                  ) : null}

                  {currentStep < bookingSteps.length - 1 ? (
                    <button type="button" className="button primary" onClick={nextStep}>
                      İLERİ
                    </button>
                  ) : (
                    <button type="submit" className="button primary">
                      RANDEVUNUZU OLUŞTURUN
                    </button>
                  )}
                </div>

                {bookingError ? <p className="form-message error">{bookingError}</p> : null}
                {bookingSuccess ? <p className="form-message success">{bookingSuccess}</p> : null}
              </form>
            </div>
          </section>

          <section className="map-contact container" id="contact">
            <div className="contact-card reveal">
              <span className="eyebrow">BİZE ULAŞIN</span>
              <h2>{company.name}</h2>
              <ul>
                <li>
                  <strong>Instagram</strong>
                  <a href="https://www.instagram.com/umayhali.38" target="_blank" rel="noreferrer">@umayhali.38</a>
                </li>
                <li>
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/+905069723837" target="_blank" rel="noreferrer">+90 506 972 38 37</a>
                </li>
                <li>
                  <strong>Çalışma saatleri</strong>
                  <span>{company.hours}</span>
                </li>
              </ul>
            </div>
          </section>

        </main>

        <footer className="footer">
          <div className="container footer-shell">
            <div className="footer-brand">
              <div className="brand-lockup footer-brand-lockup">
                <img src={logoImage} alt="Umay Halı Yıkama logo" className="brand-logo-mark footer-logo-mark" />
                <span className="brand footer-logo">Umay Halı Yıkama</span>
              </div>
              <p>Temizliğin yeni standardı.</p>
            </div>

            <div className="footer-links">
              <ul>
                <li><a href="#services">Hizmetler</a></li>
                <li><a href="#about">Hakkımızda</a></li>
                <li><a href="#contact">İletişim</a></li>
                <li><a href="#booking">Randevu</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <a href={`https://www.instagram.com/${company.instagram}`} target="_blank" rel="noreferrer">@{company.instagram}</a>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp'tan Teklif Al</a>
            </div>
          </div>

          <div className="container footer-bottom">
            <span>© 2026 Umay Halı Yıkama</span>
            <div>
              <a href="#top">Gizlilik Politikası</a>
              <a href="#top">KVKK</a>
              <a href="#top">Çerez Politikası</a>
            </div>
          </div>
        </footer>
      </div>

      <a className="floating-whatsapp" href={`https://wa.me/${company.whatsapp}?text=Merhaba%2C%20WhatsApp%27tan%20teklif%20almak%20istiyorum.`} target="_blank" rel="noreferrer" aria-label="WhatsApp'tan teklif al">
        <span aria-hidden="true">↗</span>
        <span>WhatsApp'tan Teklif Al</span>
      </a>
    </>
  )
}

export default App
