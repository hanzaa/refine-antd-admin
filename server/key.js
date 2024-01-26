const crypto = require("crypto");

// 256 bits key
const aesKey = crypto.randomBytes(32);

// Generate a random 16-byte Initialization Vector (IV)
const iv = crypto.randomBytes(16);

console.log(`aesKey: ${aesKey.toString('hex')} \n`);
console.log(`iv: ${iv.toString('hex')} \n`);

//------------------------------------------------------------

// Create a new Cipher object using the AES-256-CBC algorithm for aesKey
const aesKeyCipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
// Encrypt the aesKey using the Cipher object
let encryptedAesKey = aesKeyCipher.update(aesKey);
encryptedAesKey = Buffer.concat([encryptedAesKey, aesKeyCipher.final()]);

// Create a new Cipher object using the AES-256-CBC algorithm for iv
const ivCipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
// Encrypt the iv using the Cipher object
let encryptedIv = ivCipher.update(iv);
encryptedIv = Buffer.concat([encryptedIv, ivCipher.final()]);

console.log(`encryptedAesKey: ${encryptedAesKey.toString('hex')}\n`);
console.log(`encryptedIv: ${encryptedIv.toString('hex')}\n`);

//------------------------------------------------------------

// Create a new Decipher object using the AES-256-CBC algorithm for aesKey
const aesDecipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
let decryptedAesKey = Buffer.concat([aesDecipher.update(encryptedAesKey), aesDecipher.final()]);

// Create a new Decipher object using the AES-256-CBC algorithm for iv
const ivDecipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
let decryptedIv = Buffer.concat([ivDecipher.update(encryptedIv), ivDecipher.final()]);

console.log(`decryptedAesKey: ${decryptedAesKey.toString('hex')}\n`);
console.log(`decryptedIv: ${decryptedIv.toString('hex')}\n`);

//------------------------------------------------------------

// Convert the AES key and IV to base64-encoded strings
const aesKeyBase64 = aesKey.toString('base64');
const ivBase64 = iv.toString('base64');

// Save the AES key and IV as a string value in the environment variable
process.env.MASTER_KEY = aesKeyBase64;
process.env.IV_KEY = ivBase64;

console.log(`aesKeyBase64: ${aesKeyBase64}\n`);
console.log(`ivBase64: ${ivBase64}\n`);