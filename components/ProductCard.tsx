"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCart } from "@/stores/cart";
import { ProductCartCounter } from "./ProductCartCounter";

export type ProductProps = {
  name: string;
  url: string;
  images: string[];
  description: string;
  short_description: string;
  price: number;
};

export function ProductCard(props: ProductProps) {
  const { addProduct, removeProduct } = useCart();
  return (
    <Card className="flex flex-col w-64 min-h-40 max-h-96">
      <CardHeader>
        <Link href={"products/" + props.url}>
          <img
            src={props.images[0]}
            alt=""
            className="w-full rounded-md max-h-28 object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`products/${props.url}`}>
          <Label className="hover:cursor-pointer">{props.name}</Label>
        </Link>
        <p className="line-clamp-4">{props.short_description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <h6>{props.price}</h6>
        <ProductCartCounter {...props} />
      </CardFooter>
    </Card>
  );
}
