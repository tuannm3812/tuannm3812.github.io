import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'Tuan Nguyen | ML & Engineering',
  '/experience': 'Experience & Skill Matrix | Tuan Nguyen',
  '/projects': 'Technical Project Portfolio | Tuan Nguyen',
  '/blog': 'Reflections & Insights | Tuan Nguyen',
  '/contact': 'Get in Touch | Tuan Nguyen',
};

export default function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Tuan Nguyen | ML & Engineering';
    document.title = title;
  }, [location]);
}
