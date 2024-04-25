const { createHash, createCipheriv, randomBytes, createDecipheriv, pbkdf2Sync } = require('crypto');


export default function hash(input: string): string {
    return createHash('sha256').update(input).digest('base64');
}

const PBKDF2_ITERATIONS = 10000;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;

export function encrypt(text: string, password: string): string {
    const iv = randomBytes(16);
    const salt = randomBytes(SALT_LENGTH);
    const key = pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return salt.toString('hex') + ':' + iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(encryptedText: string, password: string): string {
    const [saltHex, ivHex, encryptedDataHex] = encryptedText.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');
    // Derive the key using PBKDF2 with the provided password and salt
    const key = pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
