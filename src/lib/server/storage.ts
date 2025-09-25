import { v4 as uuidv4 } from 'uuid';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { PUBLIC_UPLOAD_DIR } from '$env/static/public';

type FileUpload = {
  name: string;
  type: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

export const uploadFile = async (file: FileUpload, subfolder = 'products'): Promise<string> => {
  try {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipo de archivo no permitido');
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande (máximo 5MB)');
    }

    // Crear directorio si no existe
    const uploadDir = join(process.cwd(), 'static', 'uploads', subfolder);
    await fs.mkdir(uploadDir, { recursive: true });

    // Generar nombre único
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = join(uploadDir, fileName);

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Devolver ruta relativa
    return `/uploads/${subfolder}/${fileName}`;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw new Error('Error al procesar el archivo');
  }
};

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const fullPath = join(process.cwd(), 'static', filePath);
    await unlink(fullPath);
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    // No lanzamos el error para no romper el flujo si el archivo no existe
  }
};

// Función para optimizar imágenes (requiere sharp)
export const optimizeImage = async (filePath: string, options = {}) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sharp = require('sharp');
    
    const optimizedPath = filePath.replace(/\.(jpg|jpeg|png|webp|avif)$/, '.webp');
    
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(optimizedPath);
    
    // Eliminar el archivo original
    await unlink(filePath);
    
    return optimizedPath;
  } catch (error) {
    console.error('Error al optimizar imagen:', error);
    return filePath; // Devolver la ruta original si hay un error
  }
};
