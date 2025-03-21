const { MailtrapClient } = require('mailtrap');
require('dotenv').config();

const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });

const sender = {
  email: "kumarparshant12540@gmail.com",
  name: "Patel MernStack",
};

module.exports = { client, sender };
