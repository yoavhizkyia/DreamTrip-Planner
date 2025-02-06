import { Provider } from 'jotai';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
)
