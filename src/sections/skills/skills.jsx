import { usePortfolio } from "../../data/usePortfolio.js";
import "./skills.css";

const DEVICON_TRANSLATION = {
  HTML: "html5/html5-original",
  CSS: "css3/css3-original",
  JavaScript: "javascript/javascript-original",
  Java: "java/java-original",
  Spring: "spring/spring-original",
  MySql: "mysql/mysql-original",
  docker: "docker/docker-original",
  React: "react/react-original",
  "Next.js": "nextjs/nextjs-original",
  TypeScript: "typescript/typescript-original",
  python: "python/python-original",
  PostgreSql: "postgresql/postgresql-original",
  aws: "amazonwebservices/amazonwebservices-original-wordmark",
  Git: "git/git-original",
};

function TechChip({ icon, name, learning = false }) {
  const deviconClass = DEVICON_TRANSLATION[icon];

  return (
    <div className="skill-card">
      <span
        className={`skill-dot ${
          learning ? "skill-dot--learning" : "skill-dot--mastered"
        }`}
      />

      <div className="skill">
        {deviconClass && (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${deviconClass}.svg`}
            width={28}
            height={28}
            alt=""
            loading="lazy"
          />
        )}
        <span className="skill-card-label">{name}</span>
      </div>

    </div>
  );
}

function Skills() {
  const { technologies: allTechnologies, error } = usePortfolio();
  const technologies = allTechnologies.filter(
    (tech) => !["VsCode", "Intellij", "PyCharm"].includes(tech.icon),
  );

  const masteredSkills = technologies.filter((tech) => tech.isActive);
  const learningSkills = technologies.filter((tech) => !tech.isActive);

  return (
    <section id="skills" className="skills">
      <div className="skills-header">
        <h2>Skills</h2>
      </div>

      {error && <p className="data-notice" role="status">Algumas informações não puderam ser atualizadas.</p>}
      <div className="skills-col-wrap">
        <div className="skills-col">
          <h3>Tecnologias dominadas</h3>
          <div className="skills-grid">
            {!masteredSkills.length && <p>Nenhuma tecnologia informada.</p>}
            {masteredSkills.map((tech) => (
              <TechChip
                key={`mastered-${tech.id}`}
                icon={tech.icon}
                name={tech.name}
              />
            ))}
          </div>
        </div>

        <div className="skills-col skills-col--learning">
          <h3>Em processo de estudo</h3>
          <div className="skills-grid">
            {!learningSkills.length && <p>Novos estudos serão compartilhados aqui.</p>}
            {learningSkills.map((tech) => (
              <TechChip
                key={`learning-${tech.id}`}
                icon={tech.icon}
                name={tech.name}
                learning
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
