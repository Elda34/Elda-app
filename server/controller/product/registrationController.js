const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Registration = require('../../models/register');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to store files in memory

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf') ||
        file.mimetype.startsWith('application/msword') ||
        file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and document files are allowed!'));
    }
  }
});

// Controller to handle product registration
const registerProduct = async (req, res) => {
  const formData = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File upload is required' });
  }

  console.log('Form Data:', formData);
  console.log('File:', file);

  try {
    const registration = new Registration({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      orderNumber: req.body.orderNumber,
      serialNumber: req.body.serialNumber,
      installationDate: req.body.installationDate,
      fileUpload: file.originalname, // Store the original file name
    });

    await registration.save();
    res.status(200).send('Registration successful');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller to retrieve all product registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRegFile = async (req, res) => {
  try {
    const registrations = await Registration.findById(req.params.id);
    if (!registrations || !registrations.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', registrations.fileType);
    res.send(registrations.fileData);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerProduct,
  upload,
  getAllRegistrations,
  getRegFile
};
