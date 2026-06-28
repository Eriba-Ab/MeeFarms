import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import { Request } from 'express';
import path from 'path';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'meefarms/products',
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
        public_id: (req: Request, file: Express.Multer.File) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return 'product-' + uniqueSuffix;
        }
    } as any,
});

// Configure multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
