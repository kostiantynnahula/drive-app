export const getS3PublicUrl = (
  bucketName: string,
  fileName: string,
  region: string,
) => {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
};

export const getRandomFileName = (extension: string, length = 8) => {
  const randomString = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  const timestamp = Date.now();
  return `${randomString}-${timestamp}.${extension}`;
};

export const getFileExtension = (filename: string) => {
  return filename.split('.').pop();
};

export const getNewFileName = (filename: string): string => {
  const extension = getFileExtension(filename);
  return getRandomFileName(extension);
};
