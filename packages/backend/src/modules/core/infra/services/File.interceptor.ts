import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import fs from 'fs';

export const UseFileInterceptor = FileInterceptor('image', {
  storage: diskStorage({
    destination: path.resolve(process.cwd(), '../../uploads'),
    filename: (req, file, callback) => {
      const files = fs.readdirSync(
        path.resolve(process.cwd(), '../../uploads'),
      );
      const fileExtName = extname(file.originalname);
      const fileName = `${file.fieldname}-${files.length + 1}${fileExtName}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
});