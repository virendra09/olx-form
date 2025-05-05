import React, { useState } from 'react';
import './Form.css';

function Review() {
  const [name, setName] = useState('Virendra Yadav');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleNameChange = (e) => {
    if (e.target.value.length <= 30) {
      setName(e.target.value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = name.trim() !== '' && mobile.trim().length >= 10 && profileImage;

  return (
    <div className="section">
      <h3>REVIEW YOUR DETAILS</h3>

      <div className="profile">
        <div className="profile-circle">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-img" />
          ) : (
            <span>{name.charAt(0) || 'V'}</span>
          )}
          <label className="camera-icon">
          📸
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
        </div>

        <div className="name-section">
          <label>Name</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <div className="char-count">{name.length} / 30</div>
        </div>
      </div>

      <p className="verify-title">Let's verify your account</p>
      <p className="verify-desc">
        We will send you a confirmation code by SMS on the next step.
      </p>

      <label>Mobile Phone Number *</label>
      <input
        type="tel"
        placeholder="+91"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <div class="divider"></div>

      <button className="post-btn" disabled={!isFormValid}>Post now</button>
    </div>
  );
}

export default Review;
