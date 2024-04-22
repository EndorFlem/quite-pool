"use client";

import { useCart } from "@/stores/cart";
import { Button } from "./ui/button";
import { ProductProps } from "./ProductCard";

export function ProductCartCounter(props: ProductProps) {
  const { addProduct, removeProduct, products } = useCart();

  return (
    <div className="flex flex-row w-32">
      <Button
        onClick={() => {
          removeProduct(props);
        }}
      >
        -
      </Button>
      <h6 className="h-fit text-center m-auto">
        {products[props.name] ? products[props.name].count : 0}
      </h6>
      <Button
        size={"default"}
        onClick={() => {
          addProduct(props);
        }}
      >
        +
      </Button>
    </div>
  );
}
