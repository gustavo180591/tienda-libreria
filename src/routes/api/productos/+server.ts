import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Producto, Prisma } from '@prisma/client';

export const GET: RequestHandler = async ({ url }) => {
  try {
    // Paginación
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filtros
    const categoriaId = url.searchParams.get('categoriaId');
    const marcaId = url.searchParams.get('marcaId');
    const minPrecio = url.searchParams.get('minPrecio');
    const maxPrecio = url.searchParams.get('maxPrecio');
    const destacado = url.searchParams.get('destacado') === 'true';
    const novedad = url.searchParams.get('novedad') === 'true';
    const search = url.searchParams.get('search') || '';

    // Ordenamiento
    const sortBy = url.searchParams.get('sortBy') || 'nombre';
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';

    // Construir el objeto de consulta
    const where: Prisma.ProductoWhereInput = {
      activo: true,
      ...(categoriaId && { categoriaId }),
      ...(marcaId && { marcaId }),
      ...(minPrecio && { precio: { gte: parseFloat(minPrecio) } }),
      ...(maxPrecio && { precio: { lte: parseFloat(maxPrecio) } }),
      ...(destacado && { esDestacado: true }),
      ...(novedad && { esNovedad: true }),
    };

    // Búsqueda por texto (básica - se puede mejorar con búsqueda full-text)
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
        { codigoBarras: { contains: search } },
      ];
    }

    // Obtener productos con paginación
    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        include: {
          categoria: true,
          marca: true,
          imagenes: { take: 1 }, // Solo traer la primera imagen para la lista
          variantes: {
            where: { activa: true },
            select: { precio: true, precioOferta: true, stock: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.producto.count({ where })
    ]);

    // Calcular precio mínimo de las variantes
    const productosConPrecio = productos.map(producto => {
      const precios = producto.variantes.map(v => v.precioOferta || v.precio);
      const precioMinimo = precios.length > 0 ? Math.min(...precios) : producto.precio;
      const tieneOferta = producto.variantes.some(v => v.precioOferta !== null);
      const stockTotal = producto.variantes.reduce((sum, v) => sum + v.stock, 0);
      
      return {
        ...producto,
        precioMinimo,
        tieneOferta,
        stockTotal,
        // Mantener solo la primera imagen para la lista
        imagenPrincipal: producto.imagenes[0]?.url || null,
        // No exponer datos sensibles o innecesarios
        imagenes: undefined,
        variantes: undefined
      };
    });

    return json({
      data: productosConPrecio,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPreviousPage: page > 1,
      },
    });

  } catch (error) {
    console.error('Error al obtener productos:', error);
    return json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
};
