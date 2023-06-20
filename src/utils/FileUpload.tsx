import React, { useRef } from "react";
import { FileUploadSvg } from "../assets/icons";
import "./FileUpload.css";
import { FileUploadProps } from "../types";

const FileUpload = ({ onSelectFile }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        className={"upload-file-btn"}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <FileUploadSvg />
        <span className={"upload-file-span"}> Upload Image </span>
      </button>
      <input
        type={"file"}
        accept={"image/*"}
        className={"file-input"}
        onChange={onSelectFile}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUpload;