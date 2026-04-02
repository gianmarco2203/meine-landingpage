import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'

gsap.registerPlugin(ScrollTrigger)

const BRAND = '#0f9782'
const DARK = '#0a0a0f'

// ─── Reusable Animation Components ─────────────────────────────────────────

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0
  const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/\D/g, ''))
    gsap.to({ val: 0 }, {
      val: num, duration: 2, ease: 'power2.out',
      onUpdate: function() { setCount(Math.floor(this.targets()[0].val)) }
    })
  }, [inView])
  return <span ref={ref}>{prefix}{count.toLocaleString('de')}{suffix}</span>
}

// ─── Data ────────────────────────────────────────────────────────────────────

const awards = ['FOCUS Wachstumschampion 2025', 'TÜV ISO 9001 zertifiziert', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork', 'Statista Fastest Growing Europe', 'BVMW Mitglied']

const testimonials = [
  { name: 'Peter Brehl', company: 'IKS GmbH', result: '3 SHK Fachkräfte in 30 Tagen', quote: 'Innerhalb eines Monats zwei Bauleiter und einen Anlagenmechaniker eingestellt. Der klar durchstrukturierte Prozess hat uns überzeugt.' },
  { name: 'Monique Bremer', company: 'Bremer Maschinenbau GmbH', result: '1 Fachkraft nach 7 Tagen', quote: 'Nach nur 7 Tagen war schon die erste Fachkraft eingestellt. Das ging ohne Aufwand und superschnell.' },
  { name: 'Christopher Thelen', company: 'Barth Bedachungen GmbH', result: '2 Fachkräfte in 13 Tagen', quote: 'Nach nur 13 Tagen konnten wir schon 2 neue Fachkräfte einstellen. Die Investition hat sich absolut gelohnt!' },
  { name: 'Thomas Albers', company: 'Hacht Garten- und Landschaftsbau', result: '2 Fachkräfte in 30 Tagen', quote: 'Die Position haben wir 8 Monate erfolglos gesucht. Mit Candidate Flow in einem Monat besetzt.' },
  { name: 'René Richter', company: 'RICHTER Metallbau GmbH', result: '2 Metallbauer in 30 Tagen', quote: 'Alles lief professionell, reibungslos und äußerst effizient. Transparent, zielgerichtet, sehr angenehm.' },
  { name: 'Martin Fischer', company: 'Fischer Elektro-Anlagen GmbH', result: '2 Fachkräfte eingestellt', quote: 'Vereinbarungen werden eingehalten. 2 Mitarbeiter eingestellt. Rundum zufrieden!' },
]

const branches = ['SHK', 'Elektrotechnik', 'Baugewerbe', 'Metallbau', 'Dachdecker', 'GaLaBau', 'KFZ / Autohäuser', 'Maler & Lackierer', 'Tischler / Schreiner', 'Industrie', 'Pflege', 'Steuerberater']

const faqs = [
  { q: 'Was kostet die Candidate Flow® Methode?', a: 'Die Investition liegt je nach Paket zwischen 13.900 € und 50.000 € netto. Entscheidend: Jede offene Stelle kostet Sie Ø 2.650 € Umsatz pro Woche – die Methode rechnet sich meist in wenigen Wochen.' },
  { q: 'Wie funktioniert die 30-Tage-Garantie?', a: 'Wir garantieren schriftlich, dass Sie innerhalb von 30 Tagen qualifizierte Fachkräfte einstellen können – oder wir arbeiten auf eigene Kosten weiter, bis das Ergebnis erreicht ist.' },
  { q: 'Für welche Branchen funktioniert das?', a: 'Die Methode wurde im Handwerk entwickelt und funktioniert branchenübergreifend – von SHK bis Pflege, von Metallbau bis Steuerberatung.' },
  { q: 'Wie viel Zeit muss ich investieren?', a: 'Ihr Aufwand beschränkt sich auf die Abschlussgespräche mit vorqualifizierten Kandidaten. Wir übernehmen Kampagne, Bewerbermanagement und Vorqualifizierung vollständig.' },
  { q: 'Was unterscheidet Candidate Flow von klassischen Stellenanzeigen?', a: 'Klassische Stellenanzeigen warten passiv. Wir betreiben aktives Social Recruiting – wir finden Fachkräfte dort wo sie sind, auch wenn sie nicht aktiv suchen.' },
]

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={i * 0.06}>
      <div className="border border-white/10 rounded-2xl overflow-hidden mb-3 hover:border-white/20 transition-colors">
        <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors">
          <span className="font-semibold text-white pr-4 text-base">{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-2xl flex-shrink-0" style={{ color: BRAND }}>+</motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <p className="px-6 pb-6 text-gray-400 leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const scrollStoryRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP parallax on hero
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // GSAP scroll story (Apple-style pinned scroll)
  useEffect(() => {
    if (!scrollStoryRef.current) return
    const ctx = gsap.context(() => {
      const items = scrollStoryRef.current.querySelectorAll('.story-item')
      items.forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: scrollStoryRef.current, start: `${i * 25}% center`, end: `${i * 25 + 25}% center`, toggleActions: 'play none none reverse' }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="font-sans antialiased" style={{ fontFamily: 'Inter, sans-serif', background: DARK }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-black" style={{ color: BRAND }}>Candidate Flow®</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            {['Methode', 'Ergebnisse', 'Branchen'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:021188284540" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">0211 8828 45 40</a>
            <a href="#analyse" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:scale-105 transition-all" style={{ background: BRAND }}>
              Kostenlose Analyse →
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-20">
        <div className="hero-bg absolute inset-0" style={{ background: `radial-gradient(ellipse at 65% 30%, ${BRAND}20 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, ${BRAND}08 0%, transparent 50%)` }}></div>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 border"
              style={{ borderColor: `${BRAND}40`, background: `${BRAND}12`, color: BRAND }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND }}></span>
              Statista: Schnellst wachsendes Unternehmen Europas
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.04] mb-6">
              Fachkräfte in{' '}
              <span style={{ color: BRAND }}>30 Tagen</span><br />
              einstellen –<br />
              <span className="text-white/80">mit Garantie.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              4.500+ Betriebe haben ihren Fachkräftemangel mit der Candidate Flow® Methode nachhaltig gelöst. Planbar. Messbar. Garantiert.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#analyse" className="px-8 py-4 rounded-xl text-white font-bold text-lg text-center transition-all hover:opacity-90 hover:scale-105"
                style={{ background: BRAND, boxShadow: `0 0 50px ${BRAND}35` }}>
                Kostenlose Analyse →
              </a>
              <a href="#ergebnisse" className="px-8 py-4 rounded-xl text-white font-bold text-lg text-center border border-white/20 hover:bg-white/8 transition-all">
                Ergebnisse ansehen
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-2">
              {['✓ TÜV ISO 9001', '✓ FOCUS 2025', '✓ Kununu Top Arbeitgeber'].map(b => (
                <span key={b} className="text-xs text-gray-500 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg">{b}</span>
              ))}
            </motion.div>
          </div>

          {/* Lottie + floating card */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:flex flex-col items-center justify-center relative">
            <div className="relative w-80 h-80">
              <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json" style={{ width: '100%', height: '100%' }} />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-6 py-4 text-center min-w-[200px]">
                <div className="text-3xl font-black" style={{ color: BRAND }}>4.500+</div>
                <div className="text-sm text-gray-500 font-medium">Betriebe vertrauen uns</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
      <div className="bg-[#111118] border-y border-white/5 py-5 overflow-hidden">
        <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 28s linear infinite', whiteSpace: 'nowrap' }}>
          {[...awards, ...awards, ...awards].map((a, i) => (
            <span key={i} className="text-sm font-semibold text-gray-500 flex-shrink-0 flex items-center gap-3">
              <span style={{ color: BRAND }}>★</span> {a}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }`}</style>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '4500', suffix: '+', label: 'Partnerbetriebe im DACH-Raum' },
              { value: '30', suffix: '', label: 'Tage bis zur Einstellung' },
              { value: '100', suffix: '%', label: 'Einstellungsgarantie schriftlich' },
              { value: '10', prefix: '>', suffix: ' Mio. €', label: 'Jahresumsatz netto' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: BRAND }}>
                  <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </div>
                <p className="text-gray-500 text-sm leading-snug">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLL STORY (GSAP) ──────────────────────────────────────────── */}
      <section ref={scrollStoryRef} className="bg-[#0d0d14] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Warum Candidate Flow®</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Drei Wahrheiten über Recruiting im Handwerk</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', stat: '61%', text: 'der Handwerksbetriebe lehnen Aufträge ab, weil Fachkräfte fehlen. Nicht weil die Nachfrage fehlt – sondern weil die Menschen fehlen.' },
              { num: '02', stat: '2.650 €', text: 'Umsatzverlust pro offener Stelle und Woche. Bei 2 unbesetzten Stellen über ein Jahr sind das über 275.000 € verlorener Umsatz.' },
              { num: '03', stat: '30 Tage', text: 'Einstellungsgarantie schriftlich. Kein anderer Anbieter in Deutschland gibt Ihnen diese Sicherheit auf dem Papier.' },
            ].map((item, i) => (
              <div key={i} className={`story-item opacity-0 bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-[#0f9782]/40 transition-all`}>
                <div className="text-xs font-bold text-gray-600 mb-4">{item.num}</div>
                <div className="text-5xl font-black mb-4" style={{ color: BRAND }}>{item.stat}</div>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN ────────────────────────────────────────────────────────── */}
      <section className="bg-[#111118] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Das Problem</p>
            <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
              Klassisches Recruiting funktioniert nicht mehr.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💸', title: '2.650 € Verlust pro Woche', text: 'Jede unbesetzte Stelle kostet Ihren Betrieb im Durchschnitt 2.650 € Umsatz pro Woche.' },
              { icon: '📋', title: 'Stellenanzeigen bringen nichts', text: 'Qualifizierte Handwerker sind nicht aktiv auf der Suche. Sie werden nicht auf Indeed gefunden.' },
              { icon: '📈', title: 'Der Wettbewerb überholt Sie', text: 'Während Sie erfolglos inserieren, wachsen Ihre Konkurrenten mit Fachkräften, die eigentlich zu Ihnen gepasst hätten.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, borderColor: `${BRAND}50` }} className="bg-[#0f0f13] border border-white/8 rounded-2xl p-8">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHOD ──────────────────────────────────────────────────────── */}
      <section id="methode" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Die Lösung</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Die Candidate Flow® Methode</h2>
            <p className="text-xl text-gray-500 max-w-xl mx-auto">Drei Schritte. Planbar. Garantiert.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Recruiting-Analyse & Strategie', text: 'Wir analysieren Ihren Betrieb und entwickeln eine maßgeschneiderte Social-Recruiting-Strategie inkl. Arbeitgebermarke.' },
              { num: '02', title: 'Kampagne & Bewerbermanagement', text: 'Gezielte Kampagnen auf Social Media. Jede Bewerbung wird vorqualifiziert, bevor sie zu Ihnen gelangt.' },
              { num: '03', title: 'Fachkraft eingestellt', text: 'Sie führen nur die Abschlussgespräche. Einstellung in 30 Tagen – schriftlich garantiert.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                <motion.div whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }} className="bg-gray-50 rounded-3xl p-10 border border-gray-100 transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm mb-8" style={{ background: BRAND }}>{step.num}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.text}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANCHES ────────────────────────────────────────────────────── */}
      <section id="branchen" className="bg-[#111118] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Branchen</p>
            <h2 className="text-4xl font-black text-white mb-4">Für Ihr Gewerk optimiert</h2>
          </FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {branches.map((branch, i) => (
              <FadeIn key={branch} delay={i * 0.03}>
                <motion.div whileHover={{ scale: 1.08, backgroundColor: BRAND, borderColor: BRAND }}
                  className="px-5 py-3 rounded-full border border-white/15 text-sm font-medium text-gray-300 cursor-default transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {branch}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section id="ergebnisse" className="py-24" style={{ background: BRAND }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-4 text-white/60">Echte Ergebnisse</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">500+ Fachkräfte vermittelt</h2>
            <p className="text-lg text-white/70">Was unsere Partner sagen</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5 }} className="bg-white/12 backdrop-blur-sm rounded-2xl p-7 border border-white/15 h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-5 self-start">✓ {t.result}</div>
                  <p className="text-white/90 leading-relaxed mb-6 flex-1 text-sm italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-white/55 text-xs">{t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#111118] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>FAQ</p>
            <h2 className="text-4xl font-black text-white">Häufige Fragen</h2>
          </FadeIn>
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} i={i} />)}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="analyse" className="py-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0c7d6e 0%, ${BRAND} 50%, #13b39c 100%)` }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 0%, transparent 55%)' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <div className="inline-block mb-8">
              <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json" style={{ width: 80, height: 80 }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Bereit, Ihren Fachkräftemangel zu lösen?</h2>
            <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">Starten Sie mit einer kostenlosen Recruiting-Analyse. Unverbindlich. In 30 Minuten wissen Sie, wie viele Fachkräfte möglich sind.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://kontakt.candidate-flow.de/recruiting-analyse-handwerk" target="_blank" rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl bg-white text-lg font-black transition-all hover:scale-105 hover:shadow-2xl" style={{ color: BRAND }}>
                Kostenlose Analyse starten →
              </a>
              <a href="tel:021188284540" className="px-10 py-5 rounded-2xl border-2 border-white/80 text-white text-lg font-bold hover:bg-white/10 transition-all text-center">
                📞 0211 8828 45 40
              </a>
            </div>
            <p className="mt-5 text-sm text-white/50">Kein Risiko · Keine Kosten · 30 Tage Garantie</p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0f] border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="text-xl font-black mb-3" style={{ color: BRAND }}>Candidate Flow®</div>
              <p className="text-gray-600 text-sm mb-1">Johannstraße 1 · 40476 Düsseldorf</p>
              <a href="tel:021188284540" className="text-sm font-medium" style={{ color: BRAND }}>0211 8828 45 40</a>
            </div>
            {[
              { title: 'Leistungen', links: ['Candidate Flow® Methode', 'Recruiting Analyse', 'Social Recruiting', 'Employer Branding'] },
              { title: 'Unternehmen', links: ['Über uns', 'Team', 'Karriere', 'Presse'] },
              { title: 'Auszeichnungen', links: ['FOCUS Wachstumschampion 2025', 'TÜV ISO 9001', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork'] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
                {col.links.map(l => <p key={l} className="text-sm text-gray-600 mb-2 hover:text-gray-400 cursor-pointer transition-colors">{l}</p>)}
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-700">
            <p>© 2025 Candidate Flow GmbH · Alle Rechte vorbehalten</p>
            <div className="flex gap-6">
              {['Impressum', 'Datenschutz', 'AGB'].map(l => <a key={l} href="#" className="hover:text-gray-400 transition-colors">{l}</a>)}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
