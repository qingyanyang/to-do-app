import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import App from './App';
import { Theme, ThemePanel } from '@radix-ui/themes';

// import firebase from '../FirebaseConfig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Theme
      accentColor='lime'
      grayColor='sage'
      panelBackground='translucent'
      appearance='dark'
      scaling='100%'
      radius='full'
    >
      <App />
    </Theme>
  </React.StrictMode>,
);
