const Contactus = require('../../models/Contactus');

// Function to store a contact message
const sendContactusMessage = async (req, res) => {
  const { name, email, message, phone } = req.body;

  try {
    // Save contact message to the database
    const contactus = new Contactus({ name, email, message, phone });
    await contactus.save();

    return res.status(200).json({ message: 'Message stored successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Failed to save contact message. Please check the server logs for more details.' });
  }
};

// Function to retrieve all contact messages
const getusAllMessages = async (req, res) => {
  try {
    const messages = await Contactus.find({});
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving contact messages:', error);
    return res.status(500).json({ error: 'Failed to retrieve contact messages. Please check the server logs for more details.' });
  }
};

module.exports = { sendContactusMessage, getusAllMessages };
