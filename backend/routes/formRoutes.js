// formRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const FormDataModel = require('../models/formDataModel'); 

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); 

// Route for handling form submission including image upload
router.post('/', upload.single('profileImg'), async (req, res) => {
    try {
        // Extract form data from the request body
        const { name, email, gender, mobile } = req.body;
        const hobbies = req.body.hobbies.split(','); // Change here

        // If a profile image was uploaded, get its path
        let profileImgPath = '';
        if (req.file) {
            profileImgPath = req.file.path;
        }

        const formData = new FormDataModel({
            name,
            email,
            hobbies,
            gender,
            mobile,
            profileImg: profileImgPath // Assign the profile image path to the profileImg field
        });

        await formData.save();

        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const mobile = req.query.mobileNumber; 
        
        const formData = await FormDataModel.find({ mobile: mobile });
        res.status(200).json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
