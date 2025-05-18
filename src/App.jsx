// PAGES
import { useEffect, useState } from 'react';
import { HomePage, LoadingPage } from './pages'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts early
  }, []);

  return isLoading ? <LoadingPage /> : <HomePage />;
}