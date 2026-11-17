import Header from './components/header/header.jsx'
import Hero from './sections/hero/hero.jsx'
import Projects from './sections/projects/projects.jsx'
import Skills from './sections/skills/skills.jsx'
import Timeline from './sections/timeline/timeline.jsx'
import Footer from './components/footer/footer.jsx'

import SvgSprite from './assets/svg/SvgSprite.jsx'
import { PortfolioProvider } from './data/PortfolioProvider.jsx'

function App() {
  return (
    <PortfolioProvider>
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <SvgSprite />

      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
      </main>
      <Footer />
    </PortfolioProvider>
  )
}

export default App
