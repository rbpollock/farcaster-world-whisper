
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import eruda from 'eruda'

// Initialize eruda for mobile debugging - always enabled
eruda.init();
console.log('Eruda initialized for debugging');

createRoot(document.getElementById("root")!).render(<App />);
