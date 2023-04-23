import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { Provider } from 'react-redux';
import store from './RTK/store';
import './styles/base/index.scss';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AllContextProvider, { useAllContext } from './context/ClaimIdContext';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <AllContextProvider>
            <App />
          </AllContextProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
