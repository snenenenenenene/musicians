import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import React from 'react';
import { ThemeProvider } from './services/theme-provider';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import CurrentSongStore from './services/store';

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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
