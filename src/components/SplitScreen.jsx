import React, { useState } from 'react';
import './SplitScreen.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const SplitScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hobbies: [],
        gender: '',
        mobile: '',
        profileImg: null
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedHobbies = [...formData.hobbies];
        if (checked) {
            updatedHobbies.push(value);
        } else {
            updatedHobbies = updatedHobbies.filter(hobby => hobby !== value);
        }
        setFormData({
            ...formData,
            hobbies: updatedHobbies
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profileImg: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('profileImg', formData.profileImg);

            formDataToSend.append('hobbies', formData.hobbies.join(',')); // Change here

            const response = await fetch('/api/formdata', { // Change here
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Form data saved successfully');
                setFormData({
                    name: '',
                    email: '',
                    hobbies: [],
                    gender: '',
                    mobile: '',
                    profileImg: null
                });
                document.getElementById('profileImg').value = null;
            } else {
                console.error('Failed to save form data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving form data:', error.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/formdata?mobileNumber=${searchQuery}`); // Change here
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error('Failed to fetch search results:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };


    return (
        <div>
            <div id="left-pane">
            <h2>Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Hobbies</label><br />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hobby1" value="Reading" onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="hobby1">Reading</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hobby2" value="Sports" onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="hobby2">Sports</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hobby3" value="Music" onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="hobby3">Music</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hobby4" value="Writing" onChange={handleCheckboxChange} />
                                <label className="form-check-label" htmlFor="hobby4">Writing</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Gender</label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="male" name="gender" value="Male" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="female" name="gender" value="Female" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                            <input type="tel" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
                            <div className="invalid-feedback">Please enter a valid 10-digit mobile number.</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="profileImg" className="form-label">Profile Image</label>
                            <input type="file" className="form-control" id="profileImg" name="profileImg" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4" style={{ marginTop: '20px' }}>
                            <button type="submit" className="btn btn-outline-secondary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="right-pane">
            <h2>Homepage</h2>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search by mobile number"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                    <button type="submit" >Search</button>
                </form>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <h3>{result.name}</h3>
                            <p>Email: {result.email}</p>
                            <p>Gender: {result.gender}</p>
                            <p>Mobile: {result.mobile}</p>
                            {result.hobbies.length > 0 && (
                                <div>
                                    <p>Hobbies:</p>
                                    <ul>
                                        {result.hobbies.map((hobby, i) => (
                                            <li key={i}>{hobby}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {result.profileImg && (
                                <img src={`http://localhost:5000/${result.profileImg}`} alt="Profile" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SplitScreen;
