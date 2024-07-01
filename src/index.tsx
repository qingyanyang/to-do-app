import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import App from './App';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import store from './store';

// import firebase from '../FirebaseConfig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Theme
      accentColor='indigo'
      grayColor='slate'
      panelBackground='translucent'
      appearance='dark'
      scaling='100%'
      radius='full'
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </React.StrictMode>,
);
