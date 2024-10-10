// controllers/careerController.js
const JobApplication = require('../../models/CareerModel');
const nodemailer = require('nodemailer');
const transporter = require('../../config/nodemailerConfig');
const path = require('path');
const fs = require('fs');
const multer = require('multer')


const storage = multer.memoryStorage(); // Use memory storage to store files in memory

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('application/msword') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and document files are allowed!'));
    }
  }
});
// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { name, email, educationalQualification, lookingFor, experience, phone, summary } = req.body;
    const resume = req.file  // Ensure the resume file path is correctly captured

    // Save to MongoDB
    const newJobApplication = new JobApplication({
      name,
      email,
      educationalQualification,
      lookingFor,
      experience,
      phone,
      summary,
      fileData: resume.buffer, // Use file.buffer to store the file data
      fileType: resume.mimetype 
    });
    await newJobApplication.save();

    // Send email with application details
    const mailOptions = {
      from: email, // Sender address
      to: 'careelda@gmail.com', // Receiver email (your email)
      subject: 'New Job Application Submitted',
      text: `
        Name: ${name}
        Email: ${email}
        Educational Qualification: ${educationalQualification}
        Looking For: ${lookingFor}
        Experience: ${experience}
        Phone: ${phone}
        Summary: ${summary}
      `,
      attachments: resume ? [{ path: resume }] : [], // Attach resume if it exists
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Application submitted successfully' });
      }
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Get all job applications
const allCareers = async (req, res) => {
  try {
    const careers = await JobApplication.find({});
    return res.status(200).json(careers); // Return the careers array directly
  } catch (error) {
    console.error('Error retrieving job applications:', error);
    return res.status(500).json({ error: 'Failed to retrieve job applications. Please check the server logs for more details.' });
  }
};

const getCareerFile = async (req, res) => {
  try {
    const career = await JobApplication.findById(req.params.id);
    if (!career || !career.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', career.fileType);
    res.send(career.fileData);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the functions
module.exports = { 
  upload,
  applyForJob,
  allCareers,
  getCareerFile,
};
