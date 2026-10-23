(() => {
  'use strict';

  // Content is visible before this optional enhancement runs.
  const sticky = document.getElementById('sticky');
  const updateSticky = () => {
    const visible = window.scrollY > 500;
    sticky.classList.toggle('show', visible);
    sticky.inert = !visible;
  };
  updateSticky();
  window.addEventListener('scroll', updateSticky, { passive: true });

  const btn = document.getElementById('sc-btn');
  const panel = document.getElementById('sc-panel');
  const msgs = document.getElementById('sc-msgs');
  const input = document.getElementById('sc-input');
  const lead = document.getElementById('sc-lead');
  const reqBtn = document.getElementById('sc-req-btn');
  let greeted = false;

  function addMessage(role, text) {
    const row = document.createElement('div');
    row.className = `sc-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'sc-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    msgs.appendChild(row);
    while (msgs.children.length > 30) msgs.firstElementChild.remove();
    msgs.scrollTop = msgs.scrollHeight;
  }

  function setOpen(open) {
    panel.inert = !open;
    panel.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      if (!greeted) {
        addMessage('bot', 'Вітаємо! Тут можна отримати короткі відповіді про послуги SunChe у Чернігові та області. Напишіть «ціна», «резервне живлення», «монтаж» або «контакти». Для консультації фахівця натисніть «Залишити заявку».');
        greeted = true;
      }
      input.focus({ preventScroll: true });
    } else {
      btn.focus({ preventScroll: true });
    }
  }
  btn.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  document.getElementById('sc-head-close').addEventListener('click', () => setOpen(false));
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });

  // Instant answers use published site information; no remote credentials or user data transfer.
  function answer(text) {
    const q = text.toLocaleLowerCase('uk-UA');
    if (/цін|цен|варт|кошту|розрах|расчет/.test(q)) return 'Вартість залежить від потужності, акумуляторів, даху та обсягу монтажу. Заповніть форму розрахунку через кнопку «Залишити заявку» — підготуємо пропозицію для вашого об’єкта.';
    if (/резерв|акум|батар|відключ|отключ|світл|свет/.test(q)) return 'Для роботи під час відключень підбираємо інвертор і акумулятори під ваші прилади та потрібний час автономності. Звичайна мережева СЕС без резервного рішення під час відключення мережі не працює.';
    if (/черн|черні|де |где|област|адрес|місто/.test(q)) return 'Працюємо у Чернігові та Чернігівській області. Виїзди в інші міста України узгоджуємо індивідуально. Напишіть місто й тип об’єкта нашому фахівцю в Telegram: @cryptomaus.';
    if (/монтаж|станці|станци|панел|сес|сэс/.test(q)) return 'Виконуємо підбір, проєктування, монтаж і запуск сонячних станцій під ключ, а також обслуговування. Для початку знадобляться дані про споживання, дах і потребу в резервному живленні.';
    if (/контакт|телеф|telegram|телеграм|заяв|людин|человек/.test(q)) return 'Зв’яжіться з фахівцем SunChe у Telegram: @cryptomaus. Кнопка «Залишити заявку» відкриває посилання на форму розрахунку та Telegram.';
    if (/кредит|розстр|расср/.test(q)) return 'Можемо обговорити кредитування або розстрочку під час консультації. Доступні умови та рішення щодо фінансування уточнюйте у банку перед оформленням.';
    return 'Для індивідуального питання напишіть фахівцю SunChe у Telegram: @cryptomaus. Тут я можу підказати про монтаж, резервне живлення, регіон роботи та розрахунок вартості.';
  }
  function send() {
    const text = input.value.trim().slice(0, 1000);
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    addMessage('bot', answer(text));
  }
  document.getElementById('sc-send').addEventListener('click', send);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); send(); }
  });
  reqBtn.addEventListener('click', () => {
    lead.classList.add('show');
    reqBtn.hidden = true;
    document.getElementById('sc-lead-send').focus();
  });
  document.getElementById('sc-lead-cancel').addEventListener('click', () => {
    lead.classList.remove('show');
    reqBtn.hidden = false;
    input.focus();
  });
})();
