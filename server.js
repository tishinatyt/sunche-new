const express = require('express');
const cors = require('cors');

// Support both env vars (Railway/prod) and local config.js (dev)
let config = {};
try { config = require('./config'); } catch(e) {}
const CLAUDE_API_KEY    = process.env.CLAUDE_API_KEY    || config.CLAUDE_API_KEY;
const TELEGRAM_BOT_TOKEN= process.env.TELEGRAM_BOT_TOKEN|| config.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID  = process.env.TELEGRAM_CHAT_ID  || config.TELEGRAM_CHAT_ID;
const PORT              = process.env.PORT              || config.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `Ти — AI-помічник компанії SunChe (Чернігів). Відповідай виключно українською мовою.

Компанія SunChe займається:
- Монтажем сонячних електростанцій (СЕС) під ключ — гарантія 5 років
- Резервним живленням: акумулятори, інвертори, ДБЖ для будинків та бізнесу
- Технічним обслуговуванням встановленого обладнання

Ключові переваги:
- Безкоштовний виїзд спеціаліста для оцінки об'єкту
- Кредит 0% від ПриватБанку (програма «Джерела енергії»): сума 100 000–480 000 грн, строк до 60 місяців
- Бренди обладнання: Jinko Solar, Canadian Solar, LONGi, JA Solar, Trina Solar

Контакти:
- Адреса: Чернігів, вул. Ремісника 45
- Telegram: @cryptomaus

Правила:
- Відповідай коротко — 2–3 речення максимум
- Будь дружнім та корисним
- Якщо питають ціну — скажи що точну вартість розраховує спеціаліст після виїзду, і запропонуй залишити заявку
- Не вигадуй конкретні ціни
- Якщо клієнт хоче заявку — скажи що кнопка "Залишити заявку" є нижче`;

// POST /api/chat — проксі до Claude API
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Claude error:', data);
      return res.status(502).json({ error: 'Claude API error' });
    }

    res.json({ message: data.content[0].text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/lead — відправка заявки в Telegram
app.post('/api/lead', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone required' });
  }

  const text =
    `🌞 <b>Нова заявка з сайту SunChe!</b>\n\n` +
    `👤 Ім'я: ${name}\n` +
    `📞 Телефон: ${phone}\n\n` +
    `💬 Джерело: AI чат-бот`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram error:', data);
      return res.status(502).json({ error: 'Telegram error' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Lead error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => console.log(`SunChe Chat Server: http://localhost:${PORT}`));
