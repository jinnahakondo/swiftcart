import { ProductCard } from '@/components/product/ProductCard';
import { ProductType } from '@/lib/types/productType';
import React from 'react'

async function getProducts() {
    const res = await fetch('http://localhost:3000/api/products');
    if (!res.ok) {
        throw new Error("something is worng")
    }
    const data = await res.json();
    return data.data || [];
}

export default async function PopularProducts() {
    const products: ProductType[] = await getProducts()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product: ProductType) => (
                <ProductCard product={product} key={product._id} />
            ))}
        </div>
    )
}
