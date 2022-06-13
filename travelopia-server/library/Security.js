
const crypto = require('crypto');
const encryptionSeed = '1e167449-abda-4514-729e-d39a672d2660';

function cipherText(text, encrypt = true) {
  if (text || text === 0) {
    const textToEncrypt = text.toString();
    const encoding = encrypt ? ['utf8', 'hex'] : ['hex', 'utf8'];
    const algorithm = 'aes256';
    const cipher = crypto[encrypt ? "createCipher" : "createDecipher"](algorithm, encryptionSeed);
    return cipher.update(textToEncrypt, ...encoding) + cipher.final(encoding[1]);
  }
  return text;
}

exports.encrypt = (text) => cipherText(text);

exports.decrypt = (text) => cipherText(text, false);

exports.random = function (digit) {
  crypto.randomBytes(digit, function (err, buf) {
    if (err) {
      global.CONSOLE(err)
    }
    else if (buf) {
      return buf.toString('hex');
    }
  });
}
exports.randomFixedInteger = (length) => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

/**
 * Function to generate has for tenant shop
 * Converts string-> SHA256 string -> base64 -> base64URL
 * @param {String } text
 * @param {String } encryptionKey
 */
exports.tenantShopEncrypt = function (text, encryptionKey) {
  const algorithm = 'SHA256';
  return crypto.createHmac(algorithm, encryptionKey)
    .update(text).digest('base64').replace(/\+/g, "-").replace(/\//g, "_");
}