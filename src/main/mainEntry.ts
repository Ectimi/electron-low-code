import App from './app';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

new App().startup()