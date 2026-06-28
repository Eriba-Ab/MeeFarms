import express, { Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Upload single image
router.post('/', protect, admin, upload.single('image'), (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        // Return the file path that can be used to access the image
        const filePath = `/uploads/products/${req.file.filename}`;
        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath: filePath
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

export default router;
