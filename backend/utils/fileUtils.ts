import fs from 'fs';
import path from 'path';

export const convertPhotoToBase64 = (photo: Express.Multer.File): string => {
  const filePath = path.join(__dirname, '..', photo.path);
  const fileBuffer = fs.readFileSync(filePath);
  const base64Photo = fileBuffer.toString('base64');
  return base64Photo;
};
