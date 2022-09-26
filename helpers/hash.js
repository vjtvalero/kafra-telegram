const crypto = require('crypto');

const generateHash = (input) => crypto.createHash('sha256').update(input).digest('base64');

module.exports = { generateHash };
