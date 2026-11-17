import { useEffect, useRef } from "react";
import "./timeline.css";

const events = [
  {
    date: "16 · 08 · 2025",
    title: "Primeiro contato com programação",
    text: "Conheci a programação depois de pesquisas sobre Excel, pois eu fazia um curso avançado. Vi o nome Python e decidi mergulhar de vez no mundo do desenvolvimento.",
  },
  {
    date: "22 · 09 · 2025",
    title: "Estruturando a base",
    text: "Aprendi oque é um back-end front-end, conheci o professor gustavo guanabara e decidi começar pelo front-end, estudando html, css e um pouco de javascript.",
  },
  {
    date: "06 · 01 · 2026",
    title: "Explorando novas tecnologias",
    text: "Decidi que a linguagem que usaria no back-end seria o java, conhecendo sintaxe e logíca de programação e onde ela era mais utilizada, como sistemas corporativos.",
  },
  {
    date: "14 · 03 · 2026",
    title: "Conhecendo a permanencia de dados",
    text: "Aqui eu aprendi sobre banco de dados e decidir começar pelo MySQL. Aprendi oque é CRUD(create, read, update, delete), assim dando novas ideias de projetos",
  },
];

function TimelineItem({ date, title, text }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      ref.current.classList.add('visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <li className="timeline-item" ref={ref}>
      <span className="timeline-dot" />

      <div className="timeline-card">
        <span className="timeline-date">{date}</span>

        <h3>{title}</h3>

        <p>{text}</p>
      </div>
    </li>
  );
}

export default function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <div className="timeline-header">
        <span>Minha Jornada</span>
        <h2>Evolução como Desenvolvedor</h2>
      </div>

      <ul className="timeline-list">
        {events.map((event) => (
          <TimelineItem key={event.date} {...event} />
        ))}
      </ul>
    </section>
  );
}
