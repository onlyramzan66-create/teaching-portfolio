import { diskStorage } from 'multer';
import { extname } from 'path';

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
}

export const imageUploadOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (
      _req: unknown,
      file: { originalname: string },
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const baseName = sanitizeFileName(file.originalname.replace(extname(file.originalname), ''));
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${baseName || 'image'}-${unique}${extname(file.originalname).toLowerCase()}`);
    },
  }),
  fileFilter: (_req: unknown, file: { mimetype: string }, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error('Only JPG, PNG, and WEBP images are allowed'), false);
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};

export const resumeUploadOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (
      _req: unknown,
      file: { originalname: string },
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const baseName = sanitizeFileName(file.originalname.replace(extname(file.originalname), ''));
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${baseName || 'resume'}-${unique}${extname(file.originalname).toLowerCase()}`);
    },
  }),
  fileFilter: (_req: unknown, file: { mimetype: string }, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error('Only PDF, DOC, and DOCX resumes are allowed'), false);
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
};

export function buildFileUrl(req: { protocol: string; get: (header: string) => string }, filename: string) {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}
