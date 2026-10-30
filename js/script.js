// The mode switch is only present on the home page.
const toggle = document.querySelector('#mode-switch');
const body = document.body;

// Keep the text and colors for each scene together so setMode() can update
// the page from one place when the visitor switches between day and night.
const copy = {
  day: {
    status: 'CURRENTLY IN DAY MODE',
    eyebrow: 'THE IFS TECHNICAL CONSULTANT',
    intro: 'IFS Technical Consultant with 6+ years of experience. Work spans IFS Applications 7.5–10 and IFS Cloud 25R2.',
    action: 'EXPLORE MY WORK',
    actionTarget: 'pages/work.html',
    visual: 'A LITTLE DAYLIGHT',
    caption: 'FOCUS / CRAFT / CURIOSITY',
    theme: '#f2f0e9'
  },
  night: {
    status: 'CURRENTLY IN NIGHT MODE',
    eyebrow: 'THE SELECTOR',
    intro: 'DJ, listener, and collector of moments. I follow the feeling, find the groove, and bring a room together through sound.',
    action: 'EXPLORE MY DJ JOURNEY',
    actionTarget: 'pages/night.html',
    visual: 'AFTER HOURS',
    caption: 'RHYTHM / FEELING / CONNECTION',
    theme: '#111419'
  }
};

function setMode(mode) {
  // The body data attribute controls the matching CSS color scheme.
  const night = mode === 'night';
  body.dataset.mode = mode;

  // Update the switch's accessible state and label for screen reader users.
  toggle.setAttribute('aria-checked', String(night));
  toggle.setAttribute('aria-label', `Switch to ${night ? 'day' : 'night'} mode`);

  // Change the browser theme color and all of the text that depends on the mode.
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

  // Remember the visitor's choice so it can be restored on their next visit.
  try {
    localStorage.setItem('personal-frequency-mode', mode);
  } catch (_) {
    // Storage can be disabled, so the page should still work without it.
  }
}

// Clicking the switch always changes to the other scene.
toggle.addEventListener('click', () => setMode(body.dataset.mode === 'day' ? 'night' : 'day'));

// Restore night mode if the visitor selected it previously. If browser storage
// is unavailable, the page simply keeps its default day mode.
try {
  const saved = localStorage.getItem('personal-frequency-mode');
  if (saved === 'night') setMode(saved);
} catch (_) {
  // Continue in day mode when browser storage is unavailable.
}
