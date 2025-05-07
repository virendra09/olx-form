import React, { useState, useRef, useCallback } from 'react';
import Review from './Review';

function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef();
  const [dragIndex, setDragIndex] = useState(null);
  const [price, setPrice] = useState('');
  const [imageRatioError, setImageRatioError] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);


  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 12) {
      alert('You can only upload up to 12 photos.');
      return;
    }
  
    const newFiles = files.slice(0, 12 - photos.length);
    const newErrors = [];
    let hasInvalidRatio = false;
    let loadedCount = 0;
  
    newFiles.forEach((file, i) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        const isInvalid = ratio > 21 / 9;
        newErrors[i] = { error: isInvalid };
        if (isInvalid) {
          hasInvalidRatio = true;
        }
        loadedCount++;
        if (loadedCount === newFiles.length) {
          setPhotos((prev) => [...prev, ...newFiles]);
          setImageErrors((prev) => [...prev, ...newErrors]);
          setImageRatioError(hasInvalidRatio);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };
  

  const handleBoxClick = () => {
    if (photos.length < 12) {
      fileInputRef.current.click();
    }
  };

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
  
      setImageErrors((prevErrors) => {
        const updatedErrors = prevErrors.filter((_, i) => i !== index);
  
        // Recalculate if any remaining error has invalid ratio
        const stillHasError = updatedErrors.some(err => err?.error);
        setImageRatioError(stillHasError);
  
        return updatedErrors;
      });
  
      return updatedPhotos;
    });
  };
  

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    setPhotos((prev) => {
      const newPhotos = [...prev];
      const [draggedItem] = newPhotos.splice(dragIndex, 1);
      newPhotos.splice(dropIndex, 0, draggedItem);
      return newPhotos;
    });

    setDragIndex(null);
  };

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('');

  const stateCityData = {
    Goa: {
      Calapor: ['Santa Cruz', 'Miramar'],
      Panaji: ['Altinho', 'Campal'],
    },
    Maharashtra: {
      Mumbai: ['Andheri', 'Bandra'],
      Pune: ['Kothrud', 'Baner'],
    },
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

  const handleCurrentLocationClick = () => {
    setSelectedState('');
    setSelectedCity('');
    setSelectedNeighbourhood('');
  };
  

  return (
    <div className="w-full max-w-8xl mx-auto">
<h2 className="text-[20px] font-extrabold uppercase text-center text-[rgb(0, 3, 7)] mb-4">
  POST YOUR AD
</h2>


      <div className="border border-gray-300 rounded-md mb-6 p-4 width-full">
        {/* Category Section */}
        <div className="mb-6">
          <label className=" block text-[20px] font-extrabold leading-[27.6px] uppercase  text-[rgb(2,8,18)]  mb-4">SELECTED CATEGORY</label>
         <a> <span className="text-[rgb(141,144,148)] text-[11px] font-normal leading-[13.8px] cursor-pointer  bg-[rgba(0,0,0,0)]">
                 Mobiles
          </span></a>

          <span className="text-[rgb(141,144,148)] text-[11px] font-normal leading-[13.8px] cursor-pointer  bg-[rgba(0,0,0,0)]"> / </span>
          <a><span className="text-[rgb(141,144,148)] text-[11px] font-normal leading-[13.8px] cursor-pointer  bg-[rgba(0,0,0,0)]">Mobile Phones</span></a>
          <a className="text-[rgb(141,144,148)] text-[11px] font-bold leading-[13.8px] underline underline-offset-2 decoration-[rgb(141,144,148)] cursor-pointer bg-[rgba(0,0,0,0)]">
           {" "}Change</a>



        </div>

        <hr className="-mx-4 my-4 border-t border-gray-300" />


        {/* Ad Details */}
        
        <h3 className="text-lg font-semibold mb-3">INCLUDE SOME DETAILS</h3>

        <div className="mb-4">
          <label className="block font-bold mb-1">Brand *</label>
          <select className="w-full border p-2 rounded text-sm">
            <option value="">Select brand</option>
            <option disabled>Popular Brand</option>
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Mi">Mi</option>
            <option value="Vivo">Vivo</option>
            <option value="Oppo">Oppo</option>
            <option value="Realme">Realme</option>
            <option disabled>All Brand</option>
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
        </div>

        <div className="mb-4">
  <label className="block font-medium mb-1">Ad title *</label>

  <input
    type="text"
    maxLength={70}
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full border p-2 rounded text-sm"
  />

  <div className="flex justify-between mt-0 text-[10px] text-gray-500">
    <p>Mention the key features of your item (e.g. brand, model, age, type)</p>
    <span>{title.length}/70</span>
  </div>
</div>


        <div className="mb-4 relative">
  <label className="block font-medium mb-1">Description *</label>
  
  <textarea
    maxLength={4096}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full border p-2 rounded h-24 resize-y mb-0"
  />

  <div className="flex justify-between text-[11px] text-gray-500 mt-0">
    <p>Include condition, features and reason for selling</p>
    <p>{description.length}/4096</p>
  </div>
</div>


<hr className="-mx-4 my-4 border-t border-gray-300" />

        {/* Price Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">SET A PRICE</h3>
          <label className="block font-medium mb-1">Price *</label>
          <div className="relative">
            <span className="absolute left-2 top-2">₹</span>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPrice(value);
              }}
              className="w-full border p-2 rounded pl-6"
            />
          </div>
        </div>

        <hr className="-mx-4 my-4 border-t border-gray-300" />

        {/* Photos Section */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">UPLOAD UP TO 12 PHOTOS</label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handlePhotoChange}
            className="hidden"
          />
          <div className="grid grid-cols-4 gap-1">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 border flex items-center justify-center text-sm bg-gray-100 ${
                  index === photos.length ? 'border-black cursor-pointer' : 'cursor-default'
                } ${dragIndex === index ? 'opacity-50' : ''}`}
                onClick={index === photos.length ? handleBoxClick : undefined}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                draggable={index < photos.length}
                onDragStart={() => handleDragStart(index)}
              >
               {photos[index] ? (
  <>
    <img
      src={URL.createObjectURL(photos[index])}
      alt={`uploaded-${index}`}
      className="w-full h-full object-cover rounded"
    />
    {/* COVER tag for first image */}
    {imageErrors[index] && imageErrors[index].error ? (
  <span className="absolute top-0 right-0 text-white bg-red-500 text-xs px-2 py-1">
    ERROR
  </span>
) : index === 0 ? (
  <span className="absolute top-0 left-0 text-white bg-blue-500 text-xs px-2 py-1">
    COVER
  </span>
) : null}

    <button
      type="button"
      className="bg-gray-1000 text-red absolute -top-2 -right-2 rounded-full w-4 h-4 flex items-center justify-center text-xs"
      onClick={(e) => {
        e.stopPropagation();
        handleDeletePhoto(index);
      }}
    >
      ×
    </button>
  </>
) : index === photos.length ? (
                  <div className="text-center text-xs">
                    📸
                    <div>Add</div>
                  </div>
                ) : (
                  '📸+'
                )}
              </div>
            ))}
          </div>
          {imageRatioError && (
  <div className="text-red-600 text-sm mt-2">
  Invalid image ratio. Max allowed: 21:9.  </div>
)}

        </div>

        <hr className="-mx-4 my-4 border-t border-gray-300" />

        {/* Location Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">CONFIRM YOUR LOCATION</h3>
          <div className="flex gap-6 text-sm font-semibold mb-2">
            <span className="border-b-2 border-black pb-1">LIST</span>
            <span  onClick={handleCurrentLocationClick} className="text-gray-500 cursor-pointer">CURRENT LOCATION</span>
          </div>

          <label className="block font-medium mb-1">State *</label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {selectedState && (
            <>
              <label className="block font-medium mt-4 mb-1">City *</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select City</option>
                {Object.keys(stateCityData[selectedState]).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </>
          )}

          {selectedCity && (
            <>
              <label className="block font-medium mt-4 mb-1">Neighbourhood *</label>
              <select
                value={selectedNeighbourhood}
                onChange={(e) => setSelectedNeighbourhood(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Neighbourhood</option>
                {stateCityData[selectedState][selectedCity].map((neigh) => (
                  <option key={neigh} value={neigh}>
                    {neigh}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <hr className="-mx-4 my-4 border-t border-gray-300" />

        {/* Review Component */}
        <Review />
      </div>
    </div>
  );
}

export default Form;
