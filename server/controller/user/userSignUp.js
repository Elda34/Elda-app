const express = require('express');
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');


// Setup Nodemailer transport
// const transporter = nodemailer.createTransport({
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    

const userSignUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // const profilePic = req.file ? req.file.buffer : null; // Buffer data from memory storage

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password.");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            // profilePic,
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();


        
        // Sending confirmation email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email, // recipient address
            subject: 'Your Account Has Been Created Successfully!',
            text: `Dear ${name},\n\nYour account has been successfully created. Welcome to our platform!\n Thank you.\n\nBest Regards,\nELDA APPLIANCES`, 
            html: `<p>Dear ${name},</p><p>Your account has been successfully created. Welcome to our platform!</p><p>Best Regards,<br>ELDA APPLIANCES</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created and confirmation email sent successfully!"
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

  
module.exports = userSignUpController;




