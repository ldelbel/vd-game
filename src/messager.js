export function showMessage(messageText) {
  const messageEl = document.createElement('div');
  messageEl.textContent = messageText;
  document.body.appendChild(messageEl);
}