const generateVerificationCode = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let verificationCode = '';

  for (let i = 0; i < length; i++) {
      verificationCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return verificationCode;
};

module.exports = { generateVerificationCode };
