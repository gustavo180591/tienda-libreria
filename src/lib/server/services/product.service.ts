import { prisma } from '$lib/server/db';
import { stockService } from './stock.service';

export class ProductService {
  /**
   * Get all active products with pagination
   */
  async getProducts({
    page = 1,
    limit = 10,
    categoryId,
    search,
  }: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
  } = {}) {
    const skip = (page - 1) * limit;
    
    const where: any = { isActive: true };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          variants: {
            where: { isActive: true },
            include: {
              stock: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Get available stock for each variant
    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        const variants = await Promise.all(
          product.variants.map(async (variant) => {
            const availableStock = await stockService.getAvailableStock(variant.id);
            return {
              ...variant,
              availableStock,
              inStock: availableStock > 0,
            };
          })
        );

        return {
          ...product,
          variants,
          inStock: variants.some((v) => v.inStock),
        };
      })
    );

    return {
      data: productsWithStock,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single product by slug with available stock
   */
  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          include: {
            stock: true,
          },
        },
      },
    });

    if (!product) return null;

    // Get available stock for each variant
    const variants = await Promise.all(
      product.variants.map(async (variant) => {
        const availableStock = await stockService.getAvailableStock(variant.id);
        return {
          ...variant,
          availableStock,
          inStock: availableStock > 0,
        };
      })
    );

    return {
      ...product,
      variants,
      inStock: variants.some((v) => v.inStock),
    };
  }

  /**
   * Get products by category slug
   */
  async getProductsByCategory(slug: string, page = 1, limit = 10) {
    const category = await prisma.category.findUnique({
      where: { slug, isActive: true },
    });

    if (!category) {
      return { data: [], pagination: { total: 0, page, limit, totalPages: 0 } };
    }

    return this.getProducts({
      page,
      limit,
      categoryId: category.id,
    });
  }

  /**
   * Search products by query
   */
  async searchProducts(query: string, page = 1, limit = 10) {
    return this.getProducts({
      page,
      limit,
      search: query,
    });
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8) {
    const products = await prisma.product.findMany({
      where: { 
        isActive: true,
        featured: true, 
      },
      take: limit,
      include: {
        variants: {
          where: { isActive: true },
          include: {
            stock: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Get available stock for each variant
    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        const variants = await Promise.all(
          product.variants.map(async (variant) => {
            const availableStock = await stockService.getAvailableStock(variant.id);
            return {
              ...variant,
              availableStock,
              inStock: availableStock > 0,
            };
          })
        );

        return {
          ...product,
          variants,
          inStock: variants.some((v) => v.inStock),
        };
      })
    );

    return productsWithStock;
  }

  /**
   * Get all categories
   */
  async getCategories() {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

export const productService = new ProductService();
