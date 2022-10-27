import { worker } from './browser';

worker.start({ quiet: true, onUnhandledRequest: 'bypass' });
