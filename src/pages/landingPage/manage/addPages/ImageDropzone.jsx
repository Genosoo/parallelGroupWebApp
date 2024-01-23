/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useCallback, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ onDropCallback, selectedImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <div {...getRootProps()} className={isDragActive ? 'dropzone-active' : 'dropzone'}>
      <input {...getInputProps()} id="file-input" />
      {selectedImage ? (
        <div>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </div>
      ) : (
        <div className="text-[30px] text-gray-500">
          <BiImageAdd />
        </div>
      )}
      {isDragActive ? (
        <p className='text-xl text-gray-700 font-light'>Drop the image here...</p>
      ) : (
        <p className='text-xl text-gray-400 font-light'>Drag and drop an image here or</p>
      )}
      <div className="choose-image-button">Choose Image</div>
    </div>
  );
};

export default ImageDropzone;
