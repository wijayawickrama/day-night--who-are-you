const toggle = document.querySelector('#mode-switch');
const body = document.body;
const copy = {
  day: {
    status: 'CURRENTLY IN DAY MODE', eyebrow: 'THE BUILDER', intro: 'Software engineer, curious by default. I turn complex ideas into clear, useful things—one thoughtful line of code at a time.',
    action: 'EXPLORE MY WORK', visual: 'A LITTLE DAYLIGHT', caption: 'FOCUS / CRAFT / CURIOSITY', aboutTag: '01 — THE ENGINEER', aboutAside: 'I turn complex ideas into clear, useful digital experiences.', theme: '#f2f0e9'
  },
  night: {
    status: 'CURRENTLY IN NIGHT MODE', eyebrow: 'THE SELECTOR', intro: 'DJ, listener, and collector of moments. I follow the feeling, find the groove, and bring a room together through sound.',
    action: 'LET’S FIND THE GROOVE', visual: 'AFTER HOURS', caption: 'RHYTHM / FEELING / CONNECTION', aboutTag: '01 — THE DJ', aboutAside: 'I build a moment worth staying out for, one track at a time.', theme: '#111419'
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
  document.querySelector('#visual-label').textContent = copy[mode].visual;
  document.querySelector('#visual-caption').textContent = copy[mode].caption;
  document.querySelector('#about-tag').textContent = copy[mode].aboutTag;
  document.querySelector('#about-aside').textContent = copy[mode].aboutAside;
  const title = document.querySelector('#hero-title');
  title.textContent = title.dataset[mode];
  document.querySelectorAll('[data-day-only]').forEach((element) => { element.hidden = night; });
  document.querySelectorAll('[data-night-only]').forEach((element) => { element.hidden = !night; });
  try { localStorage.setItem('personal-frequency-mode', mode); } catch (_) { /* Storage can be disabled. */ }
}

toggle.addEventListener('click', () => setMode(body.dataset.mode === 'day' ? 'night' : 'day'));
document.querySelector('#year').textContent = new Date().getFullYear();
try {
  const saved = localStorage.getItem('personal-frequency-mode');
  if (saved === 'night') setMode(saved);
} catch (_) { /* Continue in day mode when storage is unavailable. */ }
