import React, { useRef } from "react";
import "./FileUpload.css";

interface props {
  onSelectFile: (e: any) => void;
}

const FileUpload = ({ onSelectFile }: props) => {
  const fileInputRef = useRef<any>(null);

  return (
    <div>
      <button
        className='upload-file-btn'
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <svg
          className='upload-file-svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            vectorEffect='non-scaling-stroke'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
          ></path>
        </svg>

        <span className='upload-file-span'>Upload Image</span>
      </button>
      <input
        type='file'
        accept='image/*'
        className='file-input'
        onChange={onSelectFile}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUpload;
