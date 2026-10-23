(() => {
  'use strict';
  const rows = Array.from(document.querySelectorAll('#products tr'));
  const search = document.querySelector('#search');
  const availability = document.querySelector('#availability');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty');
  const pagination = document.querySelector('#pagination');
  const reset = document.querySelector('#reset');
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const pageInfo = document.querySelector('#page-info');
  const size = 24;
  let category = 'all', page = 1;
  const normalize = value => value.toLocaleLowerCase('uk').normalize('NFKC').replace(/\s+/g, ' ').trim();
  const entries = rows.map(row => {
    let status = normalize(row.querySelector('.status').textContent);
    if (status.startsWith('в наявності')) status = 'в наявності';
    return {row, text: normalize(row.querySelector('.product-copy').textContent), status};
  });
  function render(scroll = false) {
    const query = normalize(search.value);
    const filtered = entries.filter(item => (category === 'all' || item.row.dataset.category === category) && (!query || query.split(' ').every(word => item.text.includes(word))) && (!availability.value || item.status === availability.value));
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    page = Math.min(page, pages);
    rows.forEach(row => { row.hidden = true; });
    filtered.slice((page - 1) * size, page * size).forEach(item => { item.row.hidden = false; });
    count.textContent = filtered.length ? `Знайдено ${filtered.length} · показано ${(page - 1) * size + 1}–${Math.min(page * size, filtered.length)}` : 'Знайдено 0 позицій';
    empty.hidden = filtered.length > 0;
    pagination.hidden = pages <= 1;
    pageInfo.textContent = `${page} / ${pages}`;
    prev.disabled = page === 1;
    next.disabled = page === pages;
    reset.hidden = category === 'all' && !query && !availability.value;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    if (scroll) document.querySelector('#catalog-title').scrollIntoView({block:'start'});
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; page = 1; render(); }));
  search.addEventListener('input', () => { page = 1; render(); });
  availability.addEventListener('change', () => { page = 1; render(); });
  reset.addEventListener('click', () => { category = 'all'; page = 1; search.value = ''; availability.value = ''; render(); search.focus(); });
  prev.addEventListener('click', () => { page--; render(true); });
  next.addEventListener('click', () => { page++; render(true); });
  document.querySelector('#filters').hidden = false;
  render();
})();
