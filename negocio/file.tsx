// File validation function
const validateExcelFile = (file: File): boolean => {
  // Check file type
  const allowedTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    alert('Invalid file type. Please upload an Excel file.');
    return false;
  }
  
  // Limit file size to prevent DoS attacks
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    alert('File too large. Maximum size is 10MB.');
    return false;
  }
  
  return true;
};

// Usage
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && validateExcelFile(file)) {
    // Process file safely
  }
};