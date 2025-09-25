import { json, error as svelteError } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
      include: {
        categoria: true,
        marca: true,
        imagenes: {
          orderBy: { orden: 'asc' },
          select: {
            id: true,
            url: true,
            esPrincipal: true,
            orden: true,
            descripcion: true
          }
        },
        variantes: {
          where: { activa: true },
          orderBy: [{ orden: 'asc' }, { nombre: 'asc' }],
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            sku: true,
            precio: true,
            precioOferta: true,
            stock: true,
            atributos: true,
            imagenUrl: true,
            esPredeterminada: true
          }
        },
        atributos: {
          include: {
            opciones: {
              orderBy: { valor: 'asc' }
            }
          },
          orderBy: { nombre: 'asc' }
        }
      }
    });

    if (!producto) {
      throw svelteError(404, 'Producto no encontrado');
    }

    // Calcular precio mínimo y máximo de las variantes
    const precios = producto.variantes.map(v => v.precioOferta || v.precio);
    const precioMinimo = precios.length > 0 ? Math.min(...precios) : producto.precio;
    const precioMaximo = precios.length > 0 ? Math.max(...precios) : producto.precio;
    const tieneOferta = producto.variantes.some(v => v.precioOferta !== null);
    const stockTotal = producto.variantes.reduce((sum, v) => sum + v.stock, 0);

    // Obtener productos relacionados (misma categoría, excluyendo el actual)
    const productosRelacionados = await prisma.producto.findMany({
      where: {
        categoriaId: producto.categoriaId,
        id: { not: producto.id },
        activo: true
      },
      include: {
        imagenes: {
          take: 1,
          select: { url: true }
        },
        variantes: {
          where: { activa: true },
          select: { precio: true, precioOferta: true, stock: true }
        }
      },
      take: 4,
      orderBy: { fechaCreacion: 'desc' }
    });

    // Formatear productos relacionados
    const productosRelacionadosFormateados = productosRelacionados.map(p => {
      const precios = p.variantes.map(v => v.precioOferta || v.precio);
      const precioMinimo = precios.length > 0 ? Math.min(...precios) : p.precio;
      
      return {
        id: p.id,
        nombre: p.nombre,
        slug: p.slug,
        precio: p.precio,
        precioMinimo,
        tieneOferta: p.variantes.some(v => v.precioOferta !== null),
        imagenUrl: p.imagenes[0]?.url || null,
        stockTotal: p.variantes.reduce((sum, v) => sum + v.stock, 0)
      };
    });

    return json({
      ...producto,
      precioMinimo,
      precioMaximo,
      tieneOferta,
      stockTotal,
      productosRelacionados: productosRelacionadosFormateados
    });

  } catch (error) {
    console.error(`Error al obtener el producto ${params.id}:`, error);
    
    if (error.status === 404) {
      throw svelteError(404, 'Producto no encontrado');
    }
    
    throw svelteError(500, 'Error al obtener el producto');
  }
};
