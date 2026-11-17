import { useCallback, useState } from 'react';
import './projects.css';
import AnimatedList from '../../animations/AnimatedList/AnimatedList.jsx';
import { usePortfolio } from '../../data/usePortfolio.js';
import { safeUrl } from '../../data/api.js';

const PODIUM_CLASSES = ['podio-segundo-lugar', 'podio-primeiro-lugar', 'podio-terceiro-lugar'];

function ProjectLink({ project, className, children }) {
  const href = safeUrl(project.url, false);
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : <div className={className}>{children}</div>;
}

export default function Projects() {
  const [isListOpen, setIsListOpen] = useState(false);
  const { projects, translations, loading, error } = usePortfolio();
  const closeList = useCallback(() => setIsListOpen(false), []);
  const titleFor = (project) => translations.find((entry) => entry.contentKey === project.titleKey)?.pt
    || project.title || project.name || project.titleKey || 'Projeto';
  const iconFor = (project) => safeUrl(project.url, false) ? 'repo' : 'build';
  const featured = projects.slice(0, 3);
  const others = projects.slice(3, 6);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading" aria-busy={loading}>
      <article className="container-podio">
        <div className="section-label"><h2 id="projects-heading">Projetos em destaque</h2></div>
        {loading && projects.length === 0 && <p role="status">Carregando projetos…</p>}
        {!loading && projects.length === 0 && (
          <p role="status">{error ? 'Os projetos estão temporariamente indisponíveis.' : 'Novos projetos em breve.'}</p>
        )}
        {featured.length > 0 && (
          <div className="podio">
            {featured.map((project, index) => (
              <ProjectLink key={project.id ?? project.titleKey ?? index} project={project} className={`podio-card ${PODIUM_CLASSES[index]}`}>
                <span className="medal">#{index + 1}</span>
                <p className="project-name">{titleFor(project)}</p>
                {!safeUrl(project.url, false) && <span className="project-state">Em desenvolvimento</span>}
                <span className="card-dots" aria-hidden="true"><span /><span /><span /></span>
              </ProjectLink>
            ))}
          </div>
        )}
      </article>
      <aside className="projetos" aria-labelledby="other-projects-heading">
        <div className="outros-header"><h2 id="other-projects-heading">Outros projetos</h2></div>
        {others.map((project, index) => (
          <ProjectLink key={project.id ?? project.titleKey ?? index} project={project} className="projeto-item">
            <span className="projeto-num">{String(index + 4).padStart(2, '0')}</span>
            <div className="projeto-info">
              <p className="projeto-titulo">{titleFor(project)}</p>
              <p className="projeto-desc">{safeUrl(project.url, false) || 'Em desenvolvimento'}</p>
            </div>
            <span className="projeto-tag" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="30" height="30"><use href={`#${iconFor(project)}`} /></svg>
            </span>
          </ProjectLink>
        ))}
        {!loading && others.length === 0 && <p>Veja os projetos em destaque.</p>}
        {projects.length > 0 && (
          <div className="ver-mais-wrap">
            <button type="button" className="ver-mais" onClick={() => setIsListOpen(true)} aria-haspopup="dialog">Ver todos os projetos</button>
          </div>
        )}
        {isListOpen && (
          <AnimatedList
            items={projects.map((project, index) => ({
              id: project.id ?? project.titleKey ?? index,
              num: String(index + 1).padStart(2, '0'),
              title: titleFor(project),
              desc: safeUrl(project.url, false) || 'Em desenvolvimento',
              link: safeUrl(project.url, false),
              tag: iconFor(project),
            }))}
            onClose={closeList}
          />
        )}
      </aside>
    </section>
  );
}
