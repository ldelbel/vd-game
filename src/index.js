const messageEl = document.createElement('div');
messageEl.textContent = 'I was put here by JavaScript!';
document.body.appendChild(messageEl);

import { showMessage } from './messager';

showMessage('Somebody else did this work!');