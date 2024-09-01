import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        callback(null, path.join(__dirname, '../storage/imgs'));
    },
    filename: function(req, file, callback) {
        const extension = file.mimetype.split('/')[1];
        callback(null,  `${file.fieldname}-${Date.now()}.${extension}`);
    }
});

export const upload = multer({ storage });