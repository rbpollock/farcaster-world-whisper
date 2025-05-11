
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import eruda from 'eruda'

// Initialize eruda for mobile debugging
if (window.location.search.includes('debug=true') || process.env.NODE_ENV === 'development') {
  eruda.init();
  console.log('Eruda initialized for debugging');
}

createRoot(document.getElementById("root")!).render(<App />);
