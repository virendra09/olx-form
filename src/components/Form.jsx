import React, { useState, useRef } from 'react';
import './Form.css';
import Review from './Review';

function Form() {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef();

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 12) {
      alert("You can only upload up to 12 photos.");
      return;
    }
    setPhotos(prev => [...prev, ...files.slice(0, 12 - photos.length)]);
  };

  const handleBoxClick = () => {
    if (photos.length < 12) {
      fileInputRef.current.click();
    }
  };



const [selectedState, setSelectedState] = useState('');
const [selectedCity, setSelectedCity] = useState('');
const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('');

const stateCityData = {
  Goa: {
    Calapor: ['Santa Cruz', 'Miramar'],
    Panaji: ['Altinho', 'Campal']
  },
  Maharashtra: {
    Mumbai: ['Andheri', 'Bandra'],
    Pune: ['Kothrud', 'Baner']
  }
};

const handleStateChange = (e) => {
  setSelectedState(e.target.value);
  setSelectedCity('');
  setSelectedNeighbourhood('');
};

const handleCityChange = (e) => {
  setSelectedCity(e.target.value);
  setSelectedNeighbourhood('');
};


  return (

    <div className="form-container">
      <h2>POST YOUR AD</h2>

{/* first section ........................................ */}
      <div className="section">
        <label>SELECTED CATEGORY</label>
        <p>Mobiles / Mobile Phones <span className="change">Change</span></p>
      </div>

      <div class="divider"></div>

      <h3>INCLUDE SOME DETAILS</h3>

      <div className="section">
        <label>Brand *</label>
        <select required className='selectOption'>
          <option value="">Select brand</option>
          <option disabled style={{ fontWeight: 'bold' }}>Popular Brand</option>
          <option value="iPhone">iPhone</option>
          <option value="Samsung">Samsung</option>
          <option value="Mi">Mi</option>
          <option value="Vivo">Vivo</option>
          <option value="Oppo">Oppo</option>
          <option value="Realme">Realme</option>
          <option disabled style={{ fontWeight: 'bold' }}>All Brand</option>
          <option value="Asus">Asus</option>
          <option value="BlackBerry">BlackBerry</option>
          <option value="Google Pixel">Google Pixel</option>
          <option value="Honor">Honor</option>
          <option value="Gionee">Gionee</option>
          <option value="HTC">HTC</option>
          <option value="Infinix">Infinix</option>
          <option value="Intex">Intex</option>
          <option value="Huawei">Huawei</option>
          <option value="Karbonn">Karbonn</option>
        </select>

        <label>Ad title *</label>
        <input
          type="text"
          maxLength={70}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="char-count">{title.length}/70</div>
        <span className='infoPara'>Mention the key features of your item (e.g. brand, model, age, type)</span>

        <label>Description *</label>
        <textarea
          maxLength={4096}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="char-count">{description.length}/4096</div>
        <span className='infoPara'>Include condition, features and reason for selling</span>
      </div>

      <div class="divider"></div>


{/* second section.......................................... */}
      <div className="section">
        <h3>SET A PRICE</h3>
        <label>Price *</label>
        <input type="text" placeholder="₹" />
      </div>

      <div class="divider"></div>

{/* third section.......................................... */}
<div className="section">
        <label>UPLOAD UP TO 12 PHOTOS</label>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
        <div className="photo-grid">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={`photo-slot ${index === 0 && photos.length === 0 ? 'add-photo-box' : ''}`}
              onClick={index === photos.length ? handleBoxClick : undefined}
            >
              {photos[index] ? (
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`uploaded-${index}`}
                  className="photo-img"
                />
              ) : index === photos.length ? (
                <div className="add-photo-text">
                  <span role="img" aria-label="camera">📸</span>
                  <div>Add Photo</div>
                </div>
              ) : (
                <span className="placeholder-icon">📸+</span>
              )}
            </div>
          ))}
        </div>
        {photos.length === 0 && <p className="error-text">This field is mandatory</p>}
      </div>

      <div class="divider"></div>

{/* third section.......................................... */}
<div className="section">
  <h3>CONFIRM YOUR LOCATION</h3>
  <div className="tabs">
    <span className="active-tab">LIST</span>
    <span>CURRENT LOCATION</span>
  </div>

  {/* State Dropdown */}
  <label>State *</label>
  <select
    className="selectOption"
    value={selectedState}
    onChange={handleStateChange}
    required
  >
    <option value="">Select State</option>
    {Object.keys(stateCityData).map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>

  {/* City Dropdown (Visible only if state is selected) */}
  {selectedState && (
    <>
      <label>City *</label>
      <select
        className="selectOption"
        value={selectedCity}
        onChange={handleCityChange}
        required
      >
        <option value="">Select City</option>
        {Object.keys(stateCityData[selectedState]).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </>
  )}

  {/* Neighbourhood Dropdown (Visible only if city is selected) */}
  {selectedCity && (
    <>
      <label>Neighbourhood *</label>
      <select
        className="selectOption"
        value={selectedNeighbourhood}
        onChange={(e) => setSelectedNeighbourhood(e.target.value)}
        required
      >
        <option value="">Select Neighbourhood</option>
        {stateCityData[selectedState][selectedCity].map((neigh) => (
          <option key={neigh} value={neigh}>{neigh}</option>
        ))}
      </select>
    </>
  )}
</div>

<div class="divider"></div>

{/* Review your details section */}
      <Review/>
    </div>
  );
}

export default Form;
