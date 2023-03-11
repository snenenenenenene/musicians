import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import App from './App';
import CurrentSongStore from './services/store';
import { ThemeProvider } from './services/theme-provider';
import './styles/tailwind.css';

const queryClient = new QueryClient();

async function main() {
  if (process.env.REACT_APP_API_MOCKING === 'enabled') {
    console.log('MOCKS ENABLED');
    const { worker } = require('./mocks/browser');
    await worker.start();
  }
}

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <CurrentSongStore>
      <AnimatePresence exitBeforeEnter>
        <ThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            draggable
          />
          <App />
          <ToastContainer />
        </ThemeProvider>
      </AnimatePresence>
    </CurrentSongStore>
  </QueryClientProvider>,
  document.getElementById('root')
);

main();
