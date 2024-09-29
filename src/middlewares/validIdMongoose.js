import mongoose from 'mongoose';

export const validID = (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "ID is not provided" });
    }
}