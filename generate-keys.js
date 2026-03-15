/**
 * Script tạo cặp khóa RSA 2048-bit cho JWT thuật toán RS256.
 * Chạy: node generate-keys.js
 * Sinh ra: private.pem (giữ bí mật), public.pem (có thể phân phối để verify token).
 */
const crypto = require('crypto');
const fs = require('fs');

const KEY_SIZE_BITS = 2048; // RSA 2048 bit - chuẩn cho RS256
const PRIVATE_KEY_PATH = 'private.pem';
const PUBLIC_KEY_PATH = 'public.pem';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: KEY_SIZE_BITS,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

fs.writeFileSync(PRIVATE_KEY_PATH, privateKey, 'utf8');
fs.writeFileSync(PUBLIC_KEY_PATH, publicKey, 'utf8');

console.log('Đã tạo cặp khóa RSA', KEY_SIZE_BITS, 'bit (RS256):');
console.log('  -', PRIVATE_KEY_PATH);
console.log('  -', PUBLIC_KEY_PATH);
console.log('Lưu ý: Không commit private.pem lên git. Thêm private.pem vào .gitignore.');
