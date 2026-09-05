// netlify/functions/send-to-telegram.js

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = `🚗 <b>New Car Rental Request</b>\n\n` +
    `Name: ${data.fullName}\n` +
    `Contact: ${data.contactNumber}\n` +
    `Date & Time: ${data.dateTime}\n` +
    `Deliver Time: ${data.deliverTime}\n` +
    `Pickup: ${data.address}\n` +
    `Destination: ${data.destination}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send' })
    };
  }
};