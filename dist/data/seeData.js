"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.suppliers = exports.brands = exports.categories = void 0;
exports.categories = Array.from({ length: 10 }, (_, i) => ({
    name: `Category ${i + 1}`,
    image: `https://via.placeholder.com/150?text=Category+${i + 1}`,
    slug: `category-${i + 1}`,
    description: `Description for Category ${i + 1}`,
}));
exports.brands = Array.from({ length: 10 }, (_, i) => ({
    name: `Brand ${i + 1}`,
    image: `https://via.placeholder.com/150?text=Brand+${i + 1}`,
    slug: `brand-${i + 1}`,
    description: `Description for Brand ${i + 1}`,
    country: "USA",
    website: `https://brand${i + 1}.com`,
    suppliers: [],
}));
exports.suppliers = Array.from({ length: 10 }, (_, i) => {
    const now = new Date();
    return {
        sku: `SUP-${1000 + i}`,
        supplierName: `Supplier ${i + 1}`,
        contactPerson: `Contact ${i + 1}`,
        phone: `09000000${i}`,
        email: `supplier${i + 1}@example.com`,
        address: `123 Street No.${i + 1}, City`,
        categories: [],
        orderQuantity: 10 + i,
        importPrice: 1000 + i * 50,
        expectedArrivalDate: new Date(now.getTime() + 7 * 86400000),
        lastRestockDate: new Date(now.getTime() - 30 * 86400000),
        restockStatus: "PENDING",
        slug: `supplier-${i + 1}`,
    };
});
const getProducts = (categoryIds, brandIds, supplierIds) => Array.from({ length: 10 }, (_, i) => ({
    sku: `PROD-${1000 + i}`,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    images: [`https://via.placeholder.com/150?text=Product+${i + 1}`],
    pricing: {
        price: 100 + i * 10,
        promotionPrice: 90 + i * 8,
        discountPercentage: 10,
    },
    category: categoryIds[i % categoryIds.length],
    brand: brandIds[i % brandIds.length],
    supplier: supplierIds[i % supplierIds.length],
    stock: 20 + i,
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue"],
    ratings: 5,
    gender: "UNISEX",
    status: "ACTIVE",
    availability: "IN_STOCK",
    slug: `product-${i + 1}`,
}));
exports.getProducts = getProducts;
//# sourceMappingURL=seeData.js.map