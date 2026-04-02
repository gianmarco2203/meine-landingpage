import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const BRAND = '#0f9782'
const DARK = '#0a0a0f'

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0
  const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
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
    let start = 0
    const step = num / 60
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{prefix}{count.toLocaleString('de')}{suffix}</span>
}

const awards = ['FOCUS Wachstumschampion 2025', 'TÜV ISO 9001 zertifiziert', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork', 'Statista Fastest Growing Europe', 'BVMW Mitglied', 'FOCUS Wachstumschampion 2025', 'TÜV ISO 9001 zertifiziert', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork']

const testimonials = [
  { name: 'Peter Brehl', company: 'IKS GmbH', result: '3 SHK Fachkräfte in 30 Tagen', quote: 'Innerhalb eines Monats zwei Bauleiter und einen Anlagenmechaniker eingestellt. Besonders gut gefallen hat uns der klar durchstrukturierte Prozess.' },
  { name: 'Monique Bremer', company: 'Bremer Maschinenbau GmbH', result: '1 Fachkraft nach 7 Tagen', quote: 'Nach nur 7 Tagen war schon die erste Fachkraft eingestellt. Das ging ohne Aufwand und superschnell mit dem rundum sorglos Paket.' },
  { name: 'Christopher Thelen', company: 'Barth Bedachungen GmbH', result: '2 Fachkräfte in 13 Tagen', quote: 'Nach nur 13 Tagen konnten wir schon 2 neue Fachkräfte einstellen. Man lernt einiges. Die Investition hat sich gelohnt!' },
  { name: 'Thomas Albers', company: 'Hacht Garten- und Landschaftsbau', result: '2 Landschaftsgärtner in 30 Tagen', quote: 'Die Position haben wir 8 Monate erfolglos gesucht. Besonders gut gefallen hat uns die persönliche Beratung.' },
  { name: 'René Richter', company: 'RICHTER Metallbau GmbH', result: '2 Metallbauer in 30 Tagen', quote: 'Alles lief professionell, reibungslos und äußerst effizient. Der gesamte Prozess war transparent, zielgerichtet und sehr angenehm.' },
  { name: 'Martin Fischer', company: 'Fischer Elektro-Anlagen GmbH', result: '2 Fachkräfte eingestellt', quote: 'Vereinbarungen werden eingehalten, sodass wir 2 Mitarbeiter eingestellt haben. Rundum zufrieden!' },
]

const branches = ['SHK', 'Elektrotechnik', 'Baugewerbe', 'Metallbau', 'Dachdecker', 'GaLaBau', 'KFZ / Autohäuser', 'Maler & Lackierer', 'Tischler / Schreiner', 'Industrie', 'Pflege', 'Steuerberater']

const faqs = [
  { q: 'Was kostet die Candidate Flow® Methode?', a: 'Die Investition liegt je nach Leistungspaket zwischen 13.900 € und 50.000 € netto. Entscheidend ist: Jede offene Stelle kostet Sie Ø 2.650 € Umsatz pro Woche – die Methode rechnet sich meist in wenigen Wochen.' },
  { q: 'Wie funktioniert die 30-Tage-Garantie?', a: 'Wir garantieren schriftlich, dass Sie innerhalb von 30 Tagen qualifizierte Fachkräfte einstellen können – oder wir arbeiten auf eigene Kosten weiter, bis das Ergebnis erreicht ist.' },
  { q: 'Für welche Branchen funktioniert das?', a: 'Die Methode wurde im Handwerk entwickelt und funktioniert branchenübergreifend für alle Betriebe mit dringendem Personalbedarf – von SHK bis Pflege, von Metallbau bis Steuerberatung.' },
  { q: 'Wie viel Zeit muss ich investieren?', a: 'Ihr Aufwand beschränkt sich auf die Abschlussgespräche mit vorqualifizierten Kandidaten. Unsere Experten übernehmen Kampagne, Bewerbermanagement und Vorqualifizierung vollständig.' },
  { q: 'Was unterscheidet Candidate Flow von klassischen Stellenanzeigen?', a: 'Klassische Stellenanzeigen warten passiv auf Bewerber. Wir betreiben aktives Social Recruiting – wir finden Fachkräfte dort wo sie sind, auch wenn sie gerade nicht aktiv suchen.' },
]

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={i * 0.05}>
      <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
        <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors">
          <span className="font-semibold text-white pr-4">{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-2xl flex-shrink-0" style={{ color: BRAND }}>+</motion.span>
        </button>
        <motion.div initial={{ height: 0 }} animate={{ height: open ? 'auto' : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
          <p className="px-6 pb-6 text-gray-400 leading-relaxed">{a}</p>
        </motion.div>
      </div>
    </FadeIn>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="font-sans antialiased bg-[#0a0a0f]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight" style={{ color: BRAND }}>Candidate Flow®</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            {['Methode', 'Ergebnisse', 'Branchen', 'Über uns'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:021188284540" className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              0211 8828 45 40
            </a>
            <a href="#analyse" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95" style={{ background: BRAND }}>
              Kostenlose Analyse →
            </a>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-16" style={{ background: DARK }}>
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at 60% 20%, ${BRAND}18 0%, transparent 60%)` }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border" style={{ borderColor: `${BRAND}40`, background: `${BRAND}10`, color: BRAND }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND }}></span>
            Statista: Schnellst wachsendes Unternehmen Europas 2025
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <p className="text-lg text-gray-400 mb-3 font-medium">Speziell für wachstumsorientierte Unternehmen</p>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 max-w-4xl">
              Fachkräfte in <span style={{ color: BRAND }}>30 Tagen</span><br />einstellen – mit<br />schriftlicher Garantie.
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            4.500+ Handwerksbetriebe haben ihren Fachkräftemangel mit der Candidate Flow® Methode nachhaltig gelöst – planbar, messbar, garantiert.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="#analyse" className="px-8 py-4 rounded-xl text-white font-bold text-lg text-center transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg" style={{ background: BRAND, boxShadow: `0 0 40px ${BRAND}40` }}>
              Kostenlose Recruiting-Analyse →
            </a>
            <a href="#ergebnisse" className="px-8 py-4 rounded-xl text-white font-bold text-lg text-center border border-white/20 hover:bg-white/10 transition-all">
              Ergebnisse ansehen
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-3">
            {['✓ TÜV ISO 9001', '✓ FOCUS Wachstumschampion 2025', '✓ Kununu Top Arbeitgeber', '✓ GreatPlaceToWork'].map(badge => (
              <span key={badge} className="text-sm text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">{badge}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AWARDS MARQUEE */}
      <div className="bg-[#111118] border-y border-white/5 py-5 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...awards, ...awards].map((a, i) => (
            <span key={i} className="text-sm font-semibold text-gray-500 flex-shrink-0 flex items-center gap-3">
              <span style={{ color: BRAND }}>★</span> {a}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* STATS */}
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
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="bg-[#111118] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Das Problem</p>
            <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
              61% der Betriebe lehnen Aufträge ab –<br />weil die Fachkräfte fehlen.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💸', title: '2.650 € Verlust pro Woche', text: 'Jede unbesetzte Stelle kostet Ihren Betrieb im Durchschnitt 2.650 € Umsatz pro Woche. Bei 3 offenen Stellen sind das über 400.000 € Jahresverlust.' },
              { icon: '📋', title: 'Stellenanzeigen bringen nichts', text: 'Qualifizierte Fachkräfte im Handwerk sind nicht aktiv auf der Suche. Sie werden nicht auf Indeed gefunden – Sie müssen sie aktiv ansprechen.' },
              { icon: '📈', title: 'Der Wettbewerb überholt Sie', text: 'Während Sie erfolglos inserieren, wachsen Ihre Konkurrenten mit Fachkräften, die eigentlich zu Ihnen gepasst hätten.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4, borderColor: `${BRAND}60` }} className="bg-[#0f0f13] border border-white/10 rounded-2xl p-8 transition-colors cursor-default">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="methode" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Die Lösung</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Die Candidate Flow® Methode</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Drei Schritte. Planbar. Garantiert. In 30 Tagen.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            {[
              { num: '01', title: 'Recruiting-Analyse & Strategie', text: 'Wir analysieren Ihren Betrieb, die Zielgruppe und entwickeln eine maßgeschneiderte Social-Recruiting-Strategie – inkl. Stellenbeschreibung und Arbeitgebermarke.' },
              { num: '02', title: 'Kampagne & Bewerbermanagement', text: 'Unsere Experten schalten gezielte Kampagnen auf Facebook, Instagram und Google. Jede Bewerbung wird vorqualifiziert, bevor sie zu Ihnen gelangt.' },
              { num: '03', title: 'Fachkraft eingestellt', text: 'Sie führen nur noch die Abschlussgespräche mit passenden Kandidaten. Die Einstellung ist mit schriftlicher Garantie innerhalb von 30 Tagen sichergestellt.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }} className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm mb-6" style={{ background: BRAND }}>{step.num}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.text}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section id="branchen" className="bg-[#111118] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Branchen</p>
            <h2 className="text-4xl font-black text-white mb-4">Für Ihr Gewerk optimiert</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Spezialisierte Recruiting-Strategien für über 20 Branchen im Handwerk und Mittelstand.</p>
          </FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {branches.map((branch, i) => (
              <FadeIn key={branch} delay={i * 0.04}>
                <motion.span whileHover={{ scale: 1.05, backgroundColor: BRAND, color: '#fff' }} className="px-5 py-3 rounded-full border border-white/20 text-sm font-medium text-gray-300 cursor-default transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {branch}
                </motion.span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="ergebnisse" className="py-24" style={{ background: BRAND }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Echte Ergebnisse</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">500+ Fachkräfte vermittelt</h2>
            <p className="text-xl text-white/80">Was unsere Partner über die Candidate Flow® Methode sagen</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -4 }} className="bg-white/15 backdrop-blur-sm rounded-2xl p-7 border border-white/20 h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-5 self-start">
                    <span>✓</span> {t.result}
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6 flex-1 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-white/60 text-xs">{t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#111118] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: BRAND }}>FAQ</p>
            <h2 className="text-4xl font-black text-white">Häufige Fragen</h2>
          </FadeIn>
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} i={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section id="analyse" className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0d8a76 0%, ${BRAND} 50%, #12b09a 100%)` }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 60%)' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Bereit, Ihren Fachkräftemangel zu lösen?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Starten Sie jetzt mit einer kostenlosen Recruiting-Analyse. Unverbindlich. In 30 Minuten wissen Sie, wie viele Fachkräfte für Ihren Betrieb möglich sind.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://kontakt.candidate-flow.de/recruiting-analyse-handwerk" target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-xl bg-white text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl active:scale-95" style={{ color: BRAND }}>
                Kostenlose Analyse starten →
              </a>
              <a href="tel:021188284540" className="px-10 py-5 rounded-xl border-2 border-white text-white text-lg font-bold hover:bg-white/10 transition-all text-center">
                📞 0211 8828 45 40
              </a>
            </div>
            <p className="mt-5 text-sm text-white/60">Kein Risiko · Keine Kosten · 30 Tage Garantie</p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0f] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black mb-3" style={{ color: BRAND }}>Candidate Flow®</div>
              <p className="text-gray-500 text-sm mb-2">Johannstraße 1<br />40476 Düsseldorf</p>
              <a href="tel:021188284540" className="text-sm" style={{ color: BRAND }}>0211 8828 45 40</a>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Leistungen</p>
              {['Candidate Flow® Methode', 'Recruiting Analyse', 'Social Recruiting', 'Employer Branding'].map(l => (
                <a key={l} href="#" className="block text-sm text-gray-500 hover:text-white transition-colors mb-2">{l}</a>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Unternehmen</p>
              {['Über uns', 'Team', 'Karriere', 'Presse', 'Blog'].map(l => (
                <a key={l} href="#" className="block text-sm text-gray-500 hover:text-white transition-colors mb-2">{l}</a>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">Auszeichnungen</p>
              {['FOCUS Wachstumschampion 2025', 'TÜV ISO 9001', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork'].map(a => (
                <p key={a} className="text-sm text-gray-500 mb-2">✓ {a}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
            <p>© 2025 Candidate Flow GmbH · Alle Rechte vorbehalten</p>
            <div className="flex gap-6">
              {['Impressum', 'Datenschutz', 'AGB'].map(l => (
                <a key={l} href="#" className="hover:text-gray-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
