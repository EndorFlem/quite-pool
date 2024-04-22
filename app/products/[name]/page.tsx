"use server";

import { getImagesPaths, usePocketBase } from "@/actions/products";
import { ProductProps } from "@/components/ProductCard";
import { ProductCartCounter } from "@/components/ProductCartCounter";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { headers } from "next/headers";

import Image from "next/image";
import { RecordModel } from "pocketbase";

export default async function ProductPage({
  params,
}: {
  params: { name: string };
}) {
  const pb = await usePocketBase();
  const product: RecordModel & ProductProps = await pb
    .collection("products")
    .getFirstListItem(`url="${params.name}"`);

  product.images = await getImagesPaths(product);

  return (
    <Card className="w-full p-2 flex flex-row">
      <CardHeader className="w-1/3 pt-0">
        <Carousel className="ml-6">
          <CarouselContent className="">
            {product.images.map((url: string) => (
              // <Image src={url} width={500} height={500} alt={url} key={url} />
              <CarouselItem
                key={url}
                className="flex justify-center items-center"
              >
                <img
                  src={url}
                  alt=""
                  className="fit-content"
                  width={480}
                  height={320}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardHeader>
      <CardContent className="ml-auto w-3/5 flex flex-col">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.short_description}</CardDescription>
        <p className="mt-4">{product.description}</p>
        {/* <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
          corporis iste voluptatem distinctio, fuga id pariatur quo
          necessitatibus eos ducimus harum rerum numquam esse ipsa odio! Quasi
          natus accusamus ducimus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tempore harum dolorem quis. Beatae eos voluptatem
          sint aperiam magni illo aliquam sed sequi blanditiis, dicta veniam
          possimus. Amet quis atque aliquid. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Asperiores delectus vitae, earum aliquid
          pariatur eum ab. Delectus eos explicabo eius itaque minus fugiat
          praesentium dolore. Inventore dolor cumque quia aut?
        </p> */}
        <div className="mt-auto flex flex-col ml-auto">
          <h6 className="width-full text-right">{product.price}</h6>
          <ProductCartCounter {...product}></ProductCartCounter>
        </div>
      </CardContent>
    </Card>
  );
}
