import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';

const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingFallback = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand dark:border-slate-800" />
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route 
            path="/blog" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
              </Suspense>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
