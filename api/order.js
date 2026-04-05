// api/order.js — Vercel Serverless Function
// Nhận đơn hàng từ khách và gửi thông báo Telegram cho chủ quán

export default async function handler(req, res) {
  // Chỉ cho phép POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { orderId, items, note, total } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!items || !items.length) {
    return res.status(400).json({ ok: false, error: 'Không có món nào được chọn' });
  }

  // Lấy config từ biến môi trường Vercel
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong môi trường');
    return res.status(500).json({ ok: false, error: 'Cấu hình server chưa đầy đủ' });
  }

  // Tạo nội dung tin nhắn Telegram
  const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const itemLines = items.map(m => `  ${m.icon} ${m.name} × ${m.qty} = ${(m.qty * 25000).toLocaleString('vi-VN')}đ`).join('\n');
  const noteText  = note ? `\n📝 Ghi chú: ${note}` : '';

  const message = `
🔔 *ĐƠN HÀNG MỚI!*

🆔 Mã đơn: *${orderId}*
🕐 Thời gian: ${time}

📋 *Chi tiết:*
${itemLines}${noteText}

💰 *Tổng tiền: ${total.toLocaleString('vi-VN')}đ*
`.trim();

  // Gửi tin nhắn Telegram
  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      console.error('Telegram API lỗi:', telegramData);
      return res.status(500).json({ ok: false, error: 'Không gửi được Telegram: ' + telegramData.description });
    }

    return res.status(200).json({ ok: true, orderId });

  } catch (err) {
    console.error('Lỗi kết nối Telegram:', err);
    return res.status(500).json({ ok: false, error: 'Lỗi server khi gửi thông báo' });
  }
}
