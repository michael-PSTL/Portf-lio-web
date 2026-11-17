import { useContext } from 'react';
import { PortfolioContext } from './PortfolioContext.js';

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio precisa de PortfolioProvider');
  return context;
}
