import { useState, useEffect } from "react";
import "./hero.css";
import SocialMidia from "../../components/socialMidia/socialMidia";

function Hero() {
  const [time, setTime] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState([{ projects: 0, experience: 0 }]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadSkills() {
      try {
        const [compRes, transRes, statRes] = await Promise.all([
          fetch("https://curriculo-api-qirm.onrender.com/competency"),
          fetch("https://curriculo-api-qirm.onrender.com/translations"),
          fetch("https://curriculo-api-qirm.onrender.com/api/hero/status"),
        ]);

        const competencies = await compRes.json();
        const translations = await transRes.json();
        const status = await statRes.json();

        setStatus({
          projects: status.projects || 0,
          experience: status.experience || 0,
        });

        // Mapeia e traduz as competências primeiro
        const activeSkills = competencies
          .map((item) => {
            const translation = translations.find(
              (t) => t.contentKey === item.contentKey,
            );

            return {
              key: item.contentKey,
              label: translation?.pt || item.contentKey,
            };
          })
          .slice(0, 4);
        setSkills(activeSkills);
      } catch (err) {
        console.error("Erro ao carregar competências:", err);
      }
    }

    loadSkills();
  }, []);

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return { h, m, s };
  };

  const formatDate = (date) =>
    date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

  const { h, m, s } = formatTime(time);

  return (
    <section id="home" className="hero">
      {/* ── COLUNA 1: Card de Perfil ── */}
      <aside className="hero-col-left">
        <article className="hero-card">
          <img
            src="https://avatars.githubusercontent.com/u/248354296?v=4"
            alt="Foto de perfil de Michael Silva Soares"
            className="profile-pic"
            width="100"
            height="100"
          />

          <p className="card-role">Full-Stack Dev</p>

          <div className="hero-info">
            <h2>Michael Silva Soares</h2>
            <h4>10 · 11 · 2007</h4>
          </div>

          <div className="card-divider" />

          <p className="hero-bio">
            Desenvolvedor apaixonado por criar experiências digitais únicas e
            soluções que fazem a diferença.
          </p>

          <div className="card-tags">
            <h6 className="tags-label">- Competências</h6>

            {skills.map((skill) => (
              <span key={skill.key} className="card-tag">
                {skill.label}
              </span>
            ))}
          </div>
        </article>
      </aside>

      {/* ── COLUNA 2: Descrição + Social ── */}
      <div className="hero-col-center">
        <div className="center-top">
          <p className="hero-eyebrow">Sobre mim</p>

          <div className="hero-description">
            <h3>
              Criando coisas
              <br />
              <em>com propósito</em>
            </h3>

            <p>
              Sou Michael, tenho 18 anos e sou um desenvolvedor full-stack.
              Gosto de criar projetos criativos e sempre busco aprender novas
              formas de desenvolver minhas habilidades, me mantendo atualizado
              com as últimas tendências em tecnologia. Este portfólio é um
              reflexo do meu compromisso com a excelência e minha paixão por
              criar soluções inovadoras.
            </p>
          </div>
        </div>

        <div className="center-bottom">
          <div className="hero-social-wrapper">
            <SocialMidia />
          </div>
        </div>
      </div>

      {/* ── COLUNA 3: Stats + Spotify + Relógio ── */}
      <aside className="hero-col-right">

        <div className="stats-row">
          <div className="stat-card accent-purple">
            <div className="stat-value big">{status.projects}+</div>
            <div className="stat-label">Projetos</div>
          </div>

          <div className="stat-card accent-blue">
            <div className="stat-value small">{status.experience}</div>
            <div className="stat-label">De experiência</div>
          </div>
        </div>

        {/* Spotify */}
        <div className="spotify-widget-container">
          <div className="spotify-header">
            <span className="spotify-dot" />
            <span className="spotify-label">Ouvindo agora</span>
          </div>

          <div className="spotify-track">
            <div className="spotify-thumb">🎧</div>
            <div>
              <div className="spotify-song">API do Spotify</div>
              <div className="spotify-artist">Integração pendente</div>
            </div>
          </div>

          <div className="spotify-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "62%" }} />
            </div>
            <div className="progress-times">
              <span>1:24</span>
              <span>3:47</span>
            </div>
          </div>
        </div>

        {/* Relógio */}
        <div className="hero-clock-container">
          <div className="clock-location">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            São Luís, BR
          </div>

          <div className="clock-time">
            {h}
            <span className="colon">:</span>
            {m}
            <span className="colon">:</span>
            {s}
          </div>

          <div className="clock-date">{formatDate(time)}</div>

          <div className="clock-tz">
            <span className="clock-tz-label">Fuso horário</span>
            <span className="clock-tz-value">UTC-3</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default Hero;
