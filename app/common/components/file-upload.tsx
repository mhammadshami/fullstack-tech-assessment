interface FileUploadProps {
  label: string;
  name: string;
  accept: string;
  required?: boolean;
  existingFilePath?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, name, accept, required, existingFilePath }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        accept={accept}
        required={required}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {existingFilePath && (
        <div className="mt-2">
          {name === "photo" ? (
            <img src={existingFilePath} alt="Uploaded" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <a
              href={existingFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100"
            >
              Download {label}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
