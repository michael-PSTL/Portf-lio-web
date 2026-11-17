import { useState, useEffect } from "react";
import "./hero.css";
import SocialMidia from "../../components/SocialMidia/SocialMidia.jsx";
import { usePortfolio } from "../../data/usePortfolio.js";

function Hero() {
  const [time, setTime] = useState(new Date());
  const { competencies, translations, heroStatus: status } = usePortfolio();
  const skills = competencies.slice(0, 4).map((item) => ({
    key: item.contentKey,
    label: translations.find((translation) => translation.contentKey === item.contentKey)?.pt || item.contentKey,
  }));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const parts = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Fortaleza', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return { h: values.hour, m: values.minute, s: values.second };
  };

  const formatDate = (date) =>
    date.toLocaleDateString("pt-BR", {
      timeZone: "America/Fortaleza",
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
            <h1>
              Criando coisas
              <br />
              <em>com propósito</em>
            </h1>

            <p>
              Sou Michael, sou um desenvolvedor full-stack.
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

      {/* ── COLUNA 3: Estatísticas + Relógio ── */}
      <aside className="hero-col-right">

        <div className="stats-row">
          <div className="stat-card accent-purple">
            <div className="stat-value big">{status.projects ?? "—"}</div>
            <div className="stat-label">Projetos</div>
          </div>

          <div className="stat-card accent-blue">
            <div className="stat-value small">{status.experience ?? "—"}</div>
            <div className="stat-label">De experiência</div>
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
