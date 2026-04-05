# 🧋 Hướng Dẫn Cài Đặt Hệ Thống Đặt Trà Online

## Tổng quan hệ thống
```
Khách quét QR → Web đặt món → Vercel API → Telegram Bot → Chủ quán nhận thông báo
```

---

## BƯỚC 1 — Tạo Telegram Bot (5 phút)

1. Mở Telegram, tìm **@BotFather**
2. Gửi lệnh: `/newbot`
3. Đặt tên bot: ví dụ `Quán Trà ABC`
4. Đặt username: ví dụ `quan_tra_abc_bot`
5. BotFather sẽ trả về **Token** dạng: `7123456789:AAGx...`
   → **Lưu lại token này**

### Lấy Chat ID của bạn:
1. Tìm bot **@userinfobot** trên Telegram
2. Gửi bất kỳ tin nhắn nào
3. Bot sẽ trả về `Id: 123456789` → **Lưu Chat ID này**

> **Lưu ý:** Chat với bot của bạn ít nhất 1 lần (gửi /start) để bot có thể nhắn tin cho bạn.

---

## BƯỚC 2 — Tải code lên GitHub (3 phút)

1. Đăng ký tài khoản tại **github.com** (miễn phí)
2. Tạo repository mới → đặt tên `tra-order`
3. Upload toàn bộ thư mục code lên (kéo thả files)
   - `public/index.html`
   - `api/order.js`
   - `vercel.json`
   - `package.json`

---

## BƯỚC 3 — Deploy lên Vercel (5 phút)

1. Đăng ký tại **vercel.com** (dùng tài khoản GitHub)
2. Nhấn **"Add New Project"**
3. Chọn repository `tra-order` vừa tạo
4. Nhấn **Deploy** → Vercel tự build

### Cài biến môi trường:
Sau khi deploy xong, vào **Settings → Environment Variables**, thêm:

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | `7123456789:AAGx...` (token từ BotFather) |
| `TELEGRAM_CHAT_ID` | `123456789` (Chat ID của bạn) |

5. Vào **Deployments → Redeploy** để áp dụng biến môi trường

---

## BƯỚC 4 — Lấy link và tạo QR Code

Sau khi deploy xong, Vercel cấp cho bạn link dạng:
```
https://tra-order-abc123.vercel.app
```

**Tạo QR Code miễn phí:**
1. Vào **qr-code-generator.com** hoặc **qrcode-monkey.com**
2. Dán link Vercel vào
3. Tải QR về → In ra → Dán lên bàn / quầy

---

## BƯỚC 5 — Test thử

1. Mở link Vercel trên điện thoại
2. Chọn 1-2 món → Nhấn "Đặt hàng"
3. Kiểm tra Telegram — bạn sẽ nhận tin nhắn dạng:

```
🔔 ĐƠN HÀNG MỚI!

🆔 Mã đơn: #1234
🕐 Thời gian: 15/01/2025, 14:30:00

📋 Chi tiết:
  🧋 Trà Sữa × 2 = 50.000đ
  🍑 Trà Đào × 1 = 25.000đ

💰 Tổng tiền: 75.000đ
```

---

## Tùy chỉnh thêm

### Thay đổi tên quán / menu:
Mở file `public/index.html`, tìm phần:
```javascript
const menu = [
  { id: 'tra-sua',      name: 'Trà Sữa',      icon: '🧋', desc: '...' },
  ...
];
```
Sửa tên, icon, mô tả tùy ý. Sau đó **push lên GitHub**, Vercel tự động deploy lại.

### Đổi giá:
Tìm dòng `const PRICE = 25000;` và sửa thành giá bạn muốn.

---

## Chi phí
- **Vercel**: Miễn phí (gói Hobby — đủ dùng cho quán nhỏ)
- **Telegram Bot**: Miễn phí hoàn toàn
- **GitHub**: Miễn phí
- **QR Code**: Miễn phí

**→ Tổng chi phí: 0đ/tháng** 🎉

---

## Hỗ trợ
Nếu gặp lỗi, hãy kiểm tra:
- Token và Chat ID đã điền đúng chưa?
- Đã chat `/start` với bot chưa?
- Biến môi trường đã Redeploy chưa?
