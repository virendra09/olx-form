import React, { useState } from 'react';

function Review() {
  const [name, setName] = useState('Virendra Yadav');
  // const [mobile, setMobile] = useState('+91');
  const [profileImage, setProfileImage] = useState(null);

  const handleNameChange = (e) => {
    if (e.target.value.length <= 30) {
      setName(e.target.value);
    }
  };

  // const handleMobileChange = (e) => {
  //   const value = e.target.value;
  
  //   // If the user deletes everything, re-add +91 
  //   if (!value.startsWith('+91')) {
  //     setMobile('+91 ');
  //   } else {
  //     setMobile(value);
  //   }
  // };

const [countryCode, setCountryCode] = useState('+91');
const [mobileNumber, setMobileNumber] = useState('');

const handleMobileNumberChange = (e) => {
  const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
  if (value.length <= 10) {
    setMobileNumber(value);
  }
};

const isFormValid =
  name.trim() !== '' &&
  mobileNumber.length === 10 &&
  profileImage;


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

  // const isFormValid =
  // name.trim() !== '' &&
  // mobile.replace(/\D/g, '').length === 12 && // +91 + 10 digits
  // profileImage;


  return (
    <div className="review-section w-full max-w-2xl mx-auto px-4 ">
    <h3 className="text-lg font-semibold mb-4">REVIEW YOUR DETAILS</h3>
  
    <div className="flex items-start gap-4 mb-4">
      {/* Profile Image */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-green-700 text-white flex items-center justify-center text-2xl font-semibold">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{name.charAt(0).toUpperCase() || 'V'}</span>
        )}
        <label className="absolute bottom-0  bg-green-900 w-5 h-5 flex items-center justify-center rounded-full cursor-pointer text-2xs shadow">
          📸
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
  
      {/* Name Input */}
      <div className="flex-1">
        <label className="block font-medium text-sm mb-1">Name</label>
        <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
          maxLength={30}
        />
        <div className="text-xs text-gray-500 text-right mt-1">{name.length}/30</div>
        </div>
        {/* Verification Info */}
        <div>
          <h3 className=' font-black-bold mb-1 '>Let's verify your account</h3>
          <p className='text-sm '>We will send you a confirmation <br/>code by sms on the next step.</p>
        </div>
         
        

        {/* Phone Input */}
        <label className="block font-medium text-sm mt-4 mb-1">Mobile Phone Number*</label>
        {/* <input
        //   type="tel"
        //   value={mobile}
        //   onChange={handleMobileChange}
        //   className="w-full p-2 border border-gray-300 rounded text-sm"
        //   placeholder="+91"
        //   maxLength={16}
        // /> */}

       
        <div className='  w-full flex gap:1 border border-gray-300 rounded'>
        <span className="px-3 py-2  text-sm inline">
    +91
  </span> <input
  type="tel"
  value={mobileNumber}
  onChange={handleMobileNumberChange}
  className="w-full p-2  text-sm inline"
  placeholder="Enter 10-digit mobile number"
  maxLength={10}
/>
</div>
      </div>
    </div>
  
    <div className="border-t border-gray-300 my-4" />
  
    <button
      style={{
        backgroundColor: isFormValid ? '#0963e1' : '#D9DADB',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        width: '7rem',
        cursor: isFormValid ? 'pointer' : 'not-allowed',
      }}
      disabled={!isFormValid}
    >
      Post now
    </button>
  </div>
  
  );
}

export default Review;
