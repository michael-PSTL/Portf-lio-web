import Header from './components/header/header.jsx'
import Hero from './sections/hero/hero.jsx'
import Projects from './sections/projects/projects.jsx'
import Skills from './sections/skills/skills.jsx'
import Timeline from './sections/timeline/timeline.jsx'
import Footer from './components/footer/footer.jsx'

import SvgSprite from './assets/svg/SvgSprite.jsx'

function App() {
  return (
    <>
      <SvgSprite />

      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
      </main>
      <Footer />
    </>
  )
}

export default App