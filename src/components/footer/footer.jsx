import { usePortfolio } from '../../data/usePortfolio.js';
import { safeUrl } from '../../data/api.js';
import './footer.css';

const NAVIGATION = [
  { href: '#home', label: 'Sobre mim' },
  { href: '#projects', label: 'Projetos' },
  { href: '#skills', label: 'Tecnologias' },
  { href: '#timeline', label: 'Trajetória' },
];

function socialLabel(url) {
  if (url.startsWith('mailto:')) return 'E-mail';
  const hostname = new URL(url).hostname.replace(/^www\./, '');
  if (hostname === 'github.com') return 'GitHub';
  if (hostname === 'linkedin.com') return 'LinkedIn';
  if (hostname === 'instagram.com') return 'Instagram';
  if (hostname === 'tiktok.com') return 'TikTok';
  if (['wa.me', 'whatsapp.com', 'api.whatsapp.com'].includes(hostname)) return 'WhatsApp';
  return hostname;
}

function Arrow({ up = false }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={up ? 'M12 19V5m-6 6 6-6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} />
  </svg>;
}

export default function Footer() {
  const { socialLinks } = usePortfolio();
  const links = [...new Set(socialLinks.map(({ url }) => safeUrl(url)).filter((url) => url && !url.includes('google.com/maps')))];
  const email = links.find((url) => url.startsWith('mailto:'));

  return (
    <footer id="info" className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-inner">
        <div className="footer-invitation">
          <div>
            <p className="footer-eyebrow"><span aria-hidden="true" /> Ideias merecem sair do papel</p>
            <h2 id="footer-heading">O próximo projeto<br />pode ser <em>o nosso.</em></h2>
            <p className="footer-description">Código, criatividade e propósito para transformar ideias em experiências digitais.</p>
          </div>
          <a className="footer-cta" href={email || 'https://github.com/michael-PSTL'} target={email ? undefined : '_blank'} rel={email ? undefined : 'noopener noreferrer'}>
            {email ? 'Vamos conversar' : 'Conheça meu GitHub'} <Arrow />
          </a>
        </div>

        <div className="footer-details">
          <div className="footer-identity">
            <a className="footer-brand" href="#home" aria-label="Michael Soares — início"><span aria-hidden="true">m<span>.</span></span> Michael Soares</a>
            <p>Desenvolvedor full-stack.<br />Sempre aprendendo. Sempre construindo.</p>
            <span className="footer-location">São Luís, Maranhão · Brasil</span>
          </div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            <h3>Explore</h3>
            {NAVIGATION.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <nav className="footer-nav" aria-label="Redes e contato">
            <h3>Vamos nos conectar</h3>
            {links.map((url) => <a key={url} href={url} target={url.startsWith('mailto:') ? undefined : '_blank'} rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>{socialLabel(url)}<span aria-hidden="true">↗</span></a>)}
          </nav>
        </div>

        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Michael Silva Soares. Todos os direitos reservados.</small>
          <a href="#home" className="footer-back-top">Voltar ao início <Arrow up /></a>
        </div>
      </div>
    </footer>
  );
}
