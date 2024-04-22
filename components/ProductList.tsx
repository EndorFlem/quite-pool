import { ProductCard, ProductProps } from "./ProductCard";
import { use } from "react";
import { loadProducts } from "@/actions/products";

export async function ProductList() {
  const products = await loadProducts();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 ">
      {products.map((product, index) => {
        return <ProductCard {...product} key={product.name} />;
      })}
    </div>
  );
}
