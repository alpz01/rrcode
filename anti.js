import { addListener, launch } from 'devtools-detector';
const view = document.createElement('div');
document.body.appendChild(view);

// 1. add listener
addListener(
  isOpen =>
    (view.innerText = isOpen
      ? 'devtools status: open'
      : 'devtools status: close')
);
// 2. launch detect
launch();