// Minimal local content verified against this repository. Keep it updated when
// adding projects so the static site remains useful when the API is offline.
export const fallback = {
  projects: [{ id: 1, titleKey: 'portfolio', url: 'https://github.com/michael-PSTL/Portf-lio-web' }],
  translations: [{ contentKey: 'portfolio', pt: 'Portfólio web' }],
  competencies: [{ contentKey: 'Desenvolvimento full-stack' }],
  technologies: [
    { id: 'html', name: 'HTML', icon: 'HTML', isActive: true },
    { id: 'css', name: 'CSS', icon: 'CSS', isActive: true },
    { id: 'javascript', name: 'JavaScript', icon: 'JavaScript', isActive: true },
    { id: 'react', name: 'React', icon: 'React', isActive: true },
  ],
  socialLinks: [{ url: 'https://github.com/michael-PSTL' }],
  heroStatus: { projects: null, experience: null },
};
