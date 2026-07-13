export const parseMediaUrl = (url) => {
  if (!url) return url;
  
  // Google Drive generic file view format
  // https://drive.google.com/file/d/1X.../view
  const gDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gDriveMatch && gDriveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${gDriveMatch[1]}`;
  }
  
  // Google Drive share link format 2
  // https://drive.google.com/open?id=1X...
  const gDriveMatch2 = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (url.includes('drive.google.com') && gDriveMatch2 && gDriveMatch2[1]) {
    return `https://drive.google.com/uc?export=view&id=${gDriveMatch2[1]}`;
  }

  // Other URLs (e.g. Google Photos) are returned as-is
  // Note: Google Photos links might not render directly in an <img> tag 
  // because they point to HTML pages. But we'll save them anyway.
  return url;
};

export const isVideoUrl = (url) => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.match(/\.(mp4|webm|mov|ogg)$/) || lowerUrl.includes('video');
};
