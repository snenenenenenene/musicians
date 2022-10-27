export const convertSecondsToHHMMSS = (secs) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const mins = (secs % 3600) / 60;
  return [mins, secs % 60].map(format).join(':');
};

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
