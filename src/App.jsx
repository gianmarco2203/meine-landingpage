import { useState, useEffect } from 'react'

const BRAND = '#0f9782'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="font-sans antialiased">

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold" style={{color: BRAND}}>Candidate Flow®</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#methode" className="hover:text-white transition-colors">Methode</a>
            <a href="#ergebnisse" className="hover:text-white transition-colors">Ergebnisse</a>
            <a href="#ueber-uns" className="hover:text-white transition-colors">Über uns</a>
          </div>
          <a href="#analyse" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105" style={{background: BRAND}}>
            Kostenlose Analyse →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(15,151,130,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(15,151,130,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: BRAND}}></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-[#0f9782]/30 bg-[#0f9782]/10 text-[#0f9782]">
            <span className="w-2 h-2 rounded-full bg-[#0f9782] animate-pulse"></span>
            FOCUS Wachstumschampion 2025 · TÜV ISO 9001 zertifiziert
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 max-w-4xl">
            Fachkräfte in <span style={{color: BRAND}}>30 Tagen</span> einstellen –
            <br />mit schriftlicher Garantie.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Mehr als 5.000 Handwerksbetriebe haben ihren Fachkräftemangel mit uns nachhaltig gelöst. Social Recruiting mit messbaren Ergebnissen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#analyse" className="px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90 hover:scale-105 text-center" style={{background: BRAND}}>
              Jetzt Recruiting-Analyse starten →
            </a>
            <a href="#ergebnisse" className="px-8 py-4 rounded-xl text-white font-bold text-lg border border-white/20 hover:bg-white/10 transition-all text-center">
              Ergebnisse ansehen
            </a>
          </div>
          <div className="flex flex-wrap gap-6">
            {['TÜV ISO 9001', 'FOCUS Wachstumschampion 2025', 'Kununu Top Arbeitgeber', 'GreatPlaceToWork'].map(badge => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <span className="text-[#0f9782]">✓</span> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="bg-[#111118] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0f9782] font-semibold text-sm uppercase tracking-widest mb-4">Das Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
              61% der Handwerksbetriebe lehnen Aufträge ab –<br />weil die Fachkräfte fehlen.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💸', title: 'Versteckter Umsatzverlust', text: 'Jede offene Stelle kostet Ihren Betrieb durchschnittlich 2.650 € Umsatz pro Woche.' },
              { icon: '📋', title: 'Klassische Stellenanzeigen versagen', text: 'Auf Indeed, StepStone und Co. bewerben sich kaum noch qualifizierte Fachkräfte im Handwerk.' },
              { icon: '📈', title: 'Der Wettbewerb wächst weiter', text: 'Während Sie erfolglos suchen, wächst die Konkurrenz – mit den Fachkräften, die Sie hätten haben können.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0f0f13] border border-white/10 rounded-2xl p-8 hover:border-[#0f9782]/50 transition-all group">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="methode" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-4" style={{color: BRAND}}>Unsere Lösung</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Die Candidate Flow® Methode</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Drei Schritte. Planbar. Garantiert.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Recruiting-Analyse & Strategie', text: 'Wir analysieren Ihren Betrieb, Ihre Zielgruppe und entwickeln eine maßgeschneiderte Recruiting-Strategie.' },
              { num: '02', title: 'Kampagne & Bewerbermanagement', text: 'Unsere Experten schalten zielgruppenspezifische Kampagnen und übernehmen die komplette Vorqualifizierung.' },
              { num: '03', title: 'Fachkraft eingestellt', text: 'Sie führen nur noch die Abschlussgespräche – mit vorqualifizierten Kandidaten, die wirklich zu Ihnen passen.' },
            ].map((step, i) => (
              <div key={i} className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#0f9782]/30 hover:shadow-lg transition-all group">
                <div className="text-6xl font-black mb-6 opacity-10 group-hover:opacity-20 transition-opacity" style={{color: BRAND}}>{step.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.text}</p>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 text-2xl text-gray-300 z-10">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="ergebnisse" className="py-24 text-white" style={{background: BRAND}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-4 text-white/70">Echte Ergebnisse</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">500+ Fachkräfte vermittelt</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">Was unsere Partner sagen</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: '3 SHK Fachkräfte in 30 Tagen eingestellt. Der klar durchstrukturierte Prozess und die Vorauswahl der Kandidaten haben uns beeindruckt.', name: 'Peter Brehl', company: 'IKS GmbH', result: '3 Fachkräfte in 30 Tagen' },
              { quote: '2 Elektriker in 3 Wochen – das hat sogar unsere Erwartungen übertroffen. Wir können Candidate Flow wärmstens weiterempfehlen.', name: 'Thomas M.', company: 'Elektro Müller GmbH', result: '2 Elektriker in 21 Tagen' },
              { quote: 'Nach nur 7 Tagen war schon die erste Fachkraft eingestellt. Das ging ohne Aufwand und superschnell.', name: 'Monique B.', company: 'Bremer Maschinenbau GmbH', result: '1 Fachkraft nach 7 Tagen' },
            ].map((t, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-semibold mb-6">✓ {t.result}</div>
                <p className="text-white/90 text-lg leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-white/70 text-sm">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0a0a0f] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5.000+', label: 'Partnerbetriebe im DACH-Raum' },
              { value: '30', label: 'Tage bis zur Einstellung' },
              { value: '100%', label: 'Einstellungsgarantie schriftlich' },
              { value: '>10 Mio.€', label: 'Jahresumsatz netto' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0f9782]/50 transition-all">
                <div className="text-4xl md:text-5xl font-black mb-3" style={{color: BRAND}}>{stat.value}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="analyse" className="py-24 text-white" style={{background: `linear-gradient(135deg, #0d8a76, ${BRAND})`}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Bereit, Ihren Fachkräftemangel zu lösen?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Starten Sie jetzt mit einer kostenlosen Recruiting-Analyse. Unverbindlich. In 30 Minuten wissen Sie, wie viele Fachkräfte für Ihren Betrieb möglich sind.</p>
          <a href="https://kontakt.candidate-flow.de/recruiting-analyse-handwerk" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 rounded-xl bg-white text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl" style={{color: BRAND}}>
            Kostenlose Analyse starten →
          </a>
          <p className="mt-4 text-sm text-white/60">Kein Risiko · Keine Kosten · Sofortige Antwort</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="ueber-uns" className="bg-[#0a0a0f] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-xl font-bold mb-2" style={{color: BRAND}}>Candidate Flow®</div>
              <p className="text-gray-500 text-sm">Johannstraße 1 · 40476 Düsseldorf</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <a href="https://candidate-flow.de/impressum" className="hover:text-white transition-colors">Impressum</a>
              <a href="https://candidate-flow.de/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="https://candidate-flow.de/agb" className="hover:text-white transition-colors">AGB</a>
            </div>
            <p className="text-gray-600 text-sm">© 2025 Candidate Flow GmbH</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
