import api from './api';

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.filePath;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
};
