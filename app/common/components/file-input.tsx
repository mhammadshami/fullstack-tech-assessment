import React from "react";

const FileInput = ({
    
}) => {
  return (
    <div>
      <label htmlFor="photo">Upload Photo</label>
      <input type="file" name="photo" id="photo" accept="image/*" />
    </div>
  );
};

export default FileInput;
