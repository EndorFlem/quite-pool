import RootLayout from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { ProductList } from "@/components/ProductList";
import { Suspense, use } from "react";

export default function ProductsPage() {
  return (
    <>
      <ProductList />
    </>
  );
}
