export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { orderId, items, note, total } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ ok: false, error: 'Khong co mon nao' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ ok: false, error: 'Thieu cau hinh server' });
    }

    const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const itemLines = items.map(m => `  ${m.icon} ${m.name} x${m.qty} = ${(m.qty * 25000).toLocaleString('vi-VN')}d`).join('\n');
    const noteText = note ? `\nGhi chu: ${note}` : '';

    const message = `DON HANG MOI!\n\nMa don: ${orderId}\nThoi gian: ${time}\n\nChi tiet:\n${itemLines}${noteText}\n\nTong tien: ${total.toLocaleString('vi-VN')}d`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const body = JSON.stringify({
      chat_id: String(CHAT_ID).trim(),
      text: message
    });

    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      return res.status(500).json({ ok: false, error: telegramData.description || 'Loi Telegram' });
    }

    return res.status(200).json({ ok: true, orderId });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
