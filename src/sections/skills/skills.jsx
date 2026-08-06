import { useEffect, useState } from "react";
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

function TechChip({ icon, name, learning = false, progress = 100 }) {
  const deviconClass = DEVICON_TRANSLATION[icon];

  return (
    <div className="skill-card" style={{ "--progress-width": `${progress}%` }}>
      <span
        className={`skill-dot ${
          learning ? "skill-dot--learning" : "skill-dot--mastered"
        }`}
      />

      <div className="skill">
        {deviconClass && (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconClass}.svg`}
            width={28}
            height={28}
            alt={name}
          />
        )}
        <span className="skill-card-label">{name}</span>
      </div>

      <div className="skill-bar">
        <div className="skill-bar-fill" />
      </div>
    </div>
  );
}

function Skills() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch(
          "https://curriculo-api-qirm.onrender.com/technologies",
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar tecnologias");
        }

        const data = await response.json();

        const filteredData = data.filter(
          (tech) => !["VsCode", "Intellij", "PyCharm"].includes(tech.icon),
        );

        setTechnologies(filteredData);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
      }
    };

    fetchTechnologies();
  }, []);

  const masteredSkills = technologies.filter((tech) => tech.isActive);
  const learningSkills = technologies.filter((tech) => !tech.isActive);

  return (
    <section id="skills" className="skills">
      <div className="skills-header">
        <h2>Skills</h2>
      </div>

      <div className="skills-col-wrap">
        <div className="skills-col">
          <h3>Tecnologias dominadas</h3>
          <div className="skills-grid">
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
            {learningSkills.map((tech) => (
              <TechChip
                key={`learning-${tech.id}`}
                icon={tech.icon}
                name={tech.name}
                learning
                progress={40}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
