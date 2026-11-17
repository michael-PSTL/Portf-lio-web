import { usePortfolio } from '../../data/usePortfolio.js';
import './ConnectionNotice.css';

export default function ConnectionNotice() {
  const { error, loading, retry, failedResources = [] } = usePortfolio();
  if (!error) return null;

  return (
    <aside className="connection-notice" aria-labelledby="connection-title" aria-busy={loading}>
      <div className="connection-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 16.5H6a4 4 0 0 1-.7-7.94A6.5 6.5 0 0 1 18 8a4.5 4.5 0 0 1 .5 8.97M9 20l6-6m-6 0 6 6" />
        </svg>
      </div>
      <div className="connection-copy" role="status" aria-live="polite" aria-atomic="true">
        <span className="connection-eyebrow">{loading ? 'Reconectando' : 'Uma pausa na conexão'}</span>
        <h2 id="connection-title">{loading ? 'Buscando as atualizações…' : failedResources.length === 6 ? 'A conexão caiu. As ideias continuam.' : 'Algumas novidades vão ter que esperar.'}</h2>
        <p>{loading ? 'Você pode continuar explorando enquanto tentamos de novo.' : 'Não foi possível atualizar todos os dados agora. Continue explorando com as últimas informações disponíveis.'}</p>
      </div>
      <button type="button" className="connection-retry" onClick={retry} disabled={loading}>
        <svg className={loading ? 'is-retrying' : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9" /></svg>
        {loading ? 'Reconectando…' : 'Tentar novamente'}
      </button>
    </aside>
  );
}
