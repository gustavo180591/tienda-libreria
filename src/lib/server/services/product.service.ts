import { prisma } from '$lib/server/db';
import type { Prisma, Product, ProductVariant, Category } from '@prisma/client';

type ProductWithVariants = Product & {
  variants: ProductVariant[];
  category: Category | null;
  inStock: boolean;
};

type ProductListResult = {
  data: ProductWithVariants[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

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
  } = {}): Promise<ProductListResult> {
    const skip = (page - 1) * limit;
    
    const where: Prisma.ProductWhereInput = { isActive: true };
    
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
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Calculate available stock for each product
    const productsWithStock = products.map(product => ({
      ...product,
      variants: product.variants.map(variant => ({
        ...variant,
        availableStock: variant.stock,
        inStock: variant.stock > 0,
      })),
      inStock: product.variants.some(v => v.stock > 0),
    })) as ProductWithVariants[];

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
  async getProductBySlug(slug: string): Promise<ProductWithVariants | null> {
    const product = await prisma.product.findUnique({
      where: { 
        slug,
        isActive: true 
      },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
        },
      },
    });

    if (!product) return null;

    // Calculate available stock for each variant
    const variants = product.variants.map(variant => ({
      ...variant,
      availableStock: variant.stock,
      inStock: variant.stock > 0,
    }));

    return {
      ...product,
      variants,
      inStock: variants.some(v => v.inStock),
    } as ProductWithVariants;
  }

  /**
   * Get products by category slug
   */
  async getProductsByCategory(slug: string, page = 1, limit = 10): Promise<ProductListResult> {
    const category = await prisma.category.findUnique({
      where: { 
        slug, 
        isActive: true 
      },
    });

    if (!category) {
      return { 
        data: [], 
        pagination: { 
          total: 0, 
          page, 
          limit, 
          totalPages: 0 
        } 
      };
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
  async searchProducts(query: string, page = 1, limit = 10): Promise<ProductListResult> {
    return this.getProducts({
      page,
      limit,
      search: query,
    });
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit = 8): Promise<ProductWithVariants[]> {
    const products = await prisma.product.findMany({
      where: { 
        isActive: true,
        featured: true, 
      },
      take: limit,
      include: {
        category: true,
        variants: {
          where: { isActive: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Calculate available stock for each product
    const productsWithStock = products.map(product => ({
      ...product,
      variants: product.variants.map(variant => ({
        ...variant,
        availableStock: variant.stock,
        inStock: variant.stock > 0,
      })),
      inStock: product.variants.some(v => v.stock > 0),
    })) as ProductWithVariants[];

    return productsWithStock;
  }

  /**
   * Get all active categories with product count
   */
  async getCategories() {
    return await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { 
            products: { 
              where: { isActive: true } 
            } 
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
  
  /**
   * Get a single variant by ID with product info
   */
  async getVariantById(variantId: string) {
    return await prisma.productVariant.findUnique({
      where: { id: variantId, isActive: true },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}

export const productService = new ProductService();
