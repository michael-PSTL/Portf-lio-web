import { useState, useEffect } from "react";
import "./footer.css";

const FRASES = [
  "Foco no que ainda não foi compreendido.",
  "A engenharia que resolve problemas.",
  "Alguem que resolve problemas.",
  "Estrategista escalando seu negócio.",
];

function Footer() {
  const qtdOndas = 8;
  const [fraseAtual, setFraseAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseAtual((atual) => (atual + 1) % FRASES.length);
    }, 3500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <footer id="info">
      <div className="footer-onda-container">
        {Array.from({ length: qtdOndas }).map((_, i) => (
          <svg className="footer-onda" key={i} width="200" height="124">
            <use href="/#ondas" />
          </svg>
        ))}
      </div>

      <aside>
        <span>quantidade de commits - {/* aqui */} </span>
        <span>quantidade de repositorios - {/* aqui */} </span>
        <span>Tempo de desenvolvedor - {/* aqui */} </span>
      </aside>

      <div className="motivation-text">
        <span className="rotating-text" key={fraseAtual}>
          {FRASES[fraseAtual]}
        </span>
        <strong className="name">Michael Silva Soares</strong>
      </div>

      <span>
        © {new Date().getFullYear()} Michael Silva Soares — todos os direitos reservados ·{" "}
        <a href="/termos">termos de uso</a> ·{" "}
        <a href="/privacidade">privacidade</a>
      </span>
    </footer>
  );
}

export default Footer;