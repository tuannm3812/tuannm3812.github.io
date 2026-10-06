import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { titleFor } from '../data/routeMeta';

export default function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    // Blog posts set their own title (null here), so Layout must not overwrite it.
    const title = titleFor(location.pathname);
    if (title) document.title = title;
  }, [location]);
}
