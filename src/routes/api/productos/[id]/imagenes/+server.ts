import { json, error as svelteError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { uploadFile, deleteFile } from '$lib/server/storage';
import type { RequestHandler } from './$types';

// Obtener todas las imágenes de un producto
export const GET: RequestHandler = async ({ params }) => {
  try {
    const imagenes = await prisma.imagenProducto.findMany({
      where: { productoId: params.id },
      orderBy: { orden: 'asc' }
    });
    
    return json(imagenes);
  } catch (error) {
    console.error('Error al obtener imágenes del producto:', error);
    throw svelteError(500, 'Error al obtener las imágenes del producto');
  }
};

// Subir una nueva imagen para un producto
export const POST: RequestHandler = async ({ request, params }) => {
  try {
    const data = await request.formData();
    const file = data.get('file') as File | null;
    const descripcion = data.get('descripcion') as string || '';
    const esPrincipal = data.get('esPrincipal') === 'true';
    
    if (!file) {
      throw svelteError(400, 'No se ha proporcionado ningún archivo');
    }

    // Subir el archivo
    const filePath = await uploadFile(file, `products/${params.id}`);
    
    // Si se marca como principal, desmarcar las demás
    if (esPrincipal) {
      await prisma.imagenProducto.updateMany({
        where: { productoId: params.id, esPrincipal: true },
        data: { esPrincipal: false }
      });
    }
    
    // Obtener el máximo orden actual
    const maxOrder = await prisma.imagenProducto.aggregate({
      where: { productoId: params.id },
      _max: { orden: true }
    });
    
    // Crear el registro en la base de datos
    const imagen = await prisma.imagenProducto.create({
      data: {
        url: filePath,
        descripcion,
        esPrincipal,
        orden: (maxOrder._max.orden || 0) + 1,
        producto: { connect: { id: params.id } }
      }
    });
    
    return json(imagen, { status: 201 });
    
  } catch (error) {
    console.error('Error al subir imagen:', error);
    
    if (error.status === 400) {
      throw error;
    }
    
    throw svelteError(500, 'Error al subir la imagen');
  }
};

// Actualizar orden o estado de las imágenes
export const PUT: RequestHandler = async ({ request, params }) => {
  try {
    const { imagenes } = await request.json();
    
    // Verificar que el producto existe
    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
      select: { id: true }
    });
    
    if (!producto) {
      throw svelteError(404, 'Producto no encontrado');
    }
    
    // Actualizar cada imagen
    const updates = imagenes.map((img: { id: string; orden: number; esPrincipal: boolean }) => {
      return prisma.imagenProducto.update({
        where: { id: img.id, productoId: params.id },
        data: {
          orden: img.orden,
          esPrincipal: img.esPrincipal
        }
      });
    });
    
    // Si hay una nueva imagen principal, asegurarse de que solo una sea principal
    const hasNewMainImage = imagenes.some((img: { esPrincipal: boolean }) => img.esPrincipal);
    
    if (hasNewMainImage) {
      const mainImageId = imagenes.find((img: { esPrincipal: boolean }) => img.esPrincipal)?.id;
      
      if (mainImageId) {
        await prisma.imagenProducto.updateMany({
          where: { 
            productoId: params.id,
            id: { not: mainImageId },
            esPrincipal: true
          },
          data: { esPrincipal: false }
        });
      }
    }
    
    await Promise.all(updates);
    
    return json({ success: true });
    
  } catch (error) {
    console.error('Error al actualizar imágenes:', error);
    
    if (error.status === 404) {
      throw error;
    }
    
    throw svelteError(500, 'Error al actualizar las imágenes');
  }
};
