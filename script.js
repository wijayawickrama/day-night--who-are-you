const toggle = document.querySelector('#mode-switch');
const body = document.body;
const copy = {
  day: {
    status: 'CURRENTLY IN DAY MODE', eyebrow: 'THE IFS TECHNICAL CONSULTANT', intro: 'IFS Technical Consultant with 6+ years of experience. Work spans IFS Applications 7–10 and IFS Cloud 25R2.',
    action: 'EXPLORE MY WORK', actionTarget: 'work.html', visual: 'A LITTLE DAYLIGHT', caption: 'FOCUS / CRAFT / CURIOSITY', theme: '#f2f0e9'
  },
  night: {
    status: 'CURRENTLY IN NIGHT MODE', eyebrow: 'THE SELECTOR', intro: 'DJ, listener, and collector of moments. I follow the feeling, find the groove, and bring a room together through sound.',
    action: 'LET’S FIND THE GROOVE', actionTarget: 'mailto:hello@example.com?subject=DJ%20Booking', visual: 'AFTER HOURS', caption: 'RHYTHM / FEELING / CONNECTION', theme: '#111419'
  }
};

function setMode(mode) {
  const night = mode === 'night';
  body.dataset.mode = mode;
  toggle.setAttribute('aria-checked', String(night));
  toggle.setAttribute('aria-label', `Switch to ${night ? 'day' : 'night'} mode`);
  document.querySelector('meta[name="theme-color"]').content = copy[mode].theme;
  document.querySelector('#status').textContent = copy[mode].status;
  document.querySelector('#eyebrow').textContent = copy[mode].eyebrow;
  document.querySelector('#intro').textContent = copy[mode].intro;
  document.querySelector('#action-label').textContent = copy[mode].action;
  document.querySelector('#action').href = copy[mode].actionTarget;
  document.querySelector('#visual-label').textContent = copy[mode].visual;
  document.querySelector('#visual-caption').textContent = copy[mode].caption;
  const title = document.querySelector('#hero-title');
  title.textContent = title.dataset[mode];
  try { localStorage.setItem('personal-frequency-mode', mode); } catch (_) { /* Storage can be disabled. */ }
}

toggle.addEventListener('click', () => setMode(body.dataset.mode === 'day' ? 'night' : 'day'));
try {
  const saved = localStorage.getItem('personal-frequency-mode');
  if (saved === 'night') setMode(saved);
} catch (_) { /* Continue in day mode when storage is unavailable. */ }
