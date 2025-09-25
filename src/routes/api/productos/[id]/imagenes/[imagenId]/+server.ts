import { json, error as svelteError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { deleteFile } from '$lib/server/storage';
import type { RequestHandler } from './$types';

// Obtener una imagen específica
export const GET: RequestHandler = async ({ params }) => {
  try {
    const imagen = await prisma.imagenProducto.findUnique({
      where: { 
        id: params.imagenId,
        productoId: params.id
      }
    });

    if (!imagen) {
      throw svelteError(404, 'Imagen no encontrada');
    }

    return json(imagen);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    
    if (error.status === 404) {
      throw error;
    }
    
    throw svelteError(500, 'Error al obtener la imagen');
  }
};

// Eliminar una imagen
export const DELETE: RequestHandler = async ({ params }) => {
  try {
    // Obtener la imagen antes de eliminarla
    const imagen = await prisma.imagenProducto.findUnique({
      where: { 
        id: params.imagenId,
        productoId: params.id
      }
    });

    if (!imagen) {
      throw svelteError(404, 'Imagen no encontrada');
    }

    // Eliminar el archivo físico
    await deleteFile(imagen.url);

    // Eliminar el registro de la base de datos
    await prisma.imagenProducto.delete({
      where: { id: params.imagenId }
    });

    // Si era la imagen principal, establecer la primera disponible como principal
    if (imagen.esPrincipal) {
      const primeraImagen = await prisma.imagenProducto.findFirst({
        where: { 
          productoId: params.id,
          id: { not: params.imagenId }
        },
        orderBy: { orden: 'asc' },
        take: 1
      });

      if (primeraImagen) {
        await prisma.imagenProducto.update({
          where: { id: primeraImagen.id },
          data: { esPrincipal: true }
        });
      }
    }

    // Reordenar las imágenes restantes
    const imagenes = await prisma.imagenProducto.findMany({
      where: { productoId: params.id },
      orderBy: { orden: 'asc' }
    });

    const updates = imagenes.map((img, index) => {
      return prisma.imagenProducto.update({
        where: { id: img.id },
        data: { orden: index + 1 }
      });
    });

    await Promise.all(updates);

    return json({ success: true });
    
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    
    if (error.status === 404) {
      throw error;
    }
    
    throw svelteError(500, 'Error al eliminar la imagen');
  }
};

// Actualizar una imagen (descripción, orden, si es principal)
export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    const data = await request.json();
    
    // Verificar que la imagen existe
    const imagenExistente = await prisma.imagenProducto.findUnique({
      where: { 
        id: params.imagenId,
        productoId: params.id
      }
    });

    if (!imagenExistente) {
      throw svelteError(404, 'Imagen no encontrada');
    }

    // Si se está marcando como principal, desmarcar las demás
    if (data.esPrincipal) {
      await prisma.imagenProducto.updateMany({
        where: { 
          productoId: params.id,
          id: { not: params.imagenId },
          esPrincipal: true 
        },
        data: { esPrincipal: false }
      });
    }

    // Actualizar la imagen
    const imagenActualizada = await prisma.imagenProducto.update({
      where: { id: params.imagenId },
      data: {
        descripcion: data.descripcion,
        esPrincipal: data.esPrincipal,
        orden: data.orden
      }
    });

    return json(imagenActualizada);
    
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    
    if (error.status === 404) {
      throw error;
    }
    
    throw svelteError(500, 'Error al actualizar la imagen');
  }
};
