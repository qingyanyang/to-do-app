import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import App from './App';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfigProvider, theme as antdTheme } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#495cac',
    },
  },
});

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
        <ThemeProvider theme={theme}>
          <ConfigProvider
            theme={{
              components: {
                Popover: {
                  zIndexPopup: 0,
                },
              },
              algorithm: antdTheme.darkAlgorithm,
              token: {
                // Seed Token
                colorPrimary: '#495cac',
                borderRadius: 8,
                colorBorder: '#494d53',
                colorBorderSecondary: '#494d53',
                colorTextQuaternary: '#494d53',
                colorBgContainer: '#111113',
                colorBgBase: '#18191b',
                // colorBgElevated: '#000000',
              },
            }}
          >
            <App />
          </ConfigProvider>
        </ThemeProvider>
      </Provider>
    </Theme>
  </React.StrictMode>,
);
