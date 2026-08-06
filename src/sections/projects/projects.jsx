import { useState, useEffect } from "react";
import "./Projects.css";
import AnimatedList from "/src/animations/AnimatedList/AnimatedList.jsx";

function Projects() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    document.body.style.overflow = isListOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };

  }, [isListOpen]);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, transRes] = await Promise.all([
          fetch("https://curriculo-api-qirm.onrender.com/project"),
          fetch("https://curriculo-api-qirm.onrender.com/translations"),
        ]);

        setProjects(await projRes.json());
        setTranslations(await transRes.json());
        
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      }
    }

    loadData();
  }, []);

  // Tradução
  const getTitle = (key) =>
    translations.find((t) => t.contentKey === key)?.pt || key;

  // Formata número (01, 02, ..., 10)
  const formatNum = (num) => (num < 10 ? `0${num}` : `${num}`);

  const getProjectById = (id) =>
    projects.find((p) => p.id === id);

  // Define o ícone conforme a URL
  const getProjectIcon = (url) => {
    if (!url || url.trim() === "") {
      return "build";
    }

    if (url.toLowerCase().includes("github.com")) {
      return "repo";
    }

    return "site";
  };

  // Projetos fora do pódio
  const otherProjects = projects.filter((p) => p.id > 3 && p.id < 7);

  return (
    <section id="projects" className="projects">
      {/* ───────── PÓDIO ───────── */}
      <article className="container-podio">
        <div className="section-label">
          <h2>Projetos destacados</h2>
        </div>

        <div className="podio">
          {/* #1 */}
          {getProjectById(1) && (
            <a
              href={getProjectById(1).url}
              target="_blank"
              rel="noopener noreferrer"
              className="podio-card podio-segundo-lugar"
            >
              <div className="medal medal-gold">#1</div>

              <p className="project-name">
                {getTitle(getProjectById(1).titleKey)}
              </p>
            </a>
          )}

          {/* #2 */}
          {getProjectById(2) && (
            <a
              href={getProjectById(2).url}
              target="_blank"
              rel="noopener noreferrer"
              className="podio-card podio-primeiro-lugar"
            >
              <div className="medal medal-silver">#2</div>

              <p className="project-name">
                {getTitle(getProjectById(2).titleKey)}
              </p>
            </a>
          )}

          {/* #3 */}
          {getProjectById(3) && (
            <a
              href={getProjectById(3).url}
              target="_blank"
              rel="noopener noreferrer"
              className="podio-card podio-terceiro-lugar"
            >
              <div className="medal medal-bronze">#3</div>

              <p className="project-name">
                {getTitle(getProjectById(3).titleKey)}
              </p>
            </a>
          )}
        </div>
      </article>

      {/* ───────── OUTROS PROJETOS ───────── */}
      <aside className="projetos">
        <div className="outros-header">
          <h2>Outros projetos</h2>
        </div>

        {otherProjects.map((project) => (
          <a
            key={project.id}
            href={project.url || undefined}
            className="projeto-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="projeto-num">
              {formatNum(project.id)}
            </span>

            <div className="projeto-info">
              <p className="projeto-titulo">
                {getTitle(project.titleKey)}
              </p>

              <p className="projeto-desc">
                {project.url || "Em desenvolvimento"}
              </p>
            </div>

            <span className="projeto-tag">
              <svg viewBox="0 0 20 20" width="30" height="30">
                <use href={`/#${getProjectIcon(project.url)}`} />
              </svg>
            </span>
          </a>
        ))}

        {/* ───────── BOTÃO VER MAIS ───────── */}
        <div className="ver-mais-wrap">
          <button
            className="ver-mais"
            onClick={() => setIsListOpen(true)}
          >
            Ver mais
          </button>
        </div>

        {/* ───────── MODAL COMPLETO ───────── */}
        {isListOpen && (
          <AnimatedList
            items={projects.map((p) => ({
              num: formatNum(p.id),
              title: getTitle(p.titleKey),
              desc: p.url || "Em desenvolvimento",
              link: p.url,
              tag: getProjectIcon(p.url),
            }))}
            onItemSelect={() => setIsListOpen(false)}
            onClose={() => setIsListOpen(false)}
            showGradients
            enableArrowNavigation
            displayScrollbar
          />
        )}
      </aside>
    </section>
  );
}

export default Projects;
