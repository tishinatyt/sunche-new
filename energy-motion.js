(() => {
  'use strict';
  const button = document.querySelector('.charge-toggle');
  if (!button) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('sunche-charge-paused') === 'true'; } catch {}

  function sync() {
    document.body.classList.toggle('charge-paused', paused || preference.matches);
    button.hidden = preference.matches;
    button.setAttribute('aria-pressed', String(!paused && !preference.matches));
    button.setAttribute('aria-label', paused ? 'Увімкнути рух заряду на фоні' : 'Зупинити рух заряду на фоні');
    button.querySelector('.charge-toggle-label').textContent = paused ? 'Фон на паузі' : 'Рух фону';
  }
  button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('sunche-charge-paused', String(paused)); } catch {}
    sync();
  });
  preference.addEventListener('change', sync);
  const visibility = () => document.body.classList.toggle('charge-tab-hidden', document.hidden);
  document.addEventListener('visibilitychange', visibility);
  visibility();
  sync();
})();
