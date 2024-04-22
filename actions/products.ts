"use server";

import { ProductProps } from "@/components/ProductCard";
import PocketBase, { RecordModel } from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getImagesPaths(product: RecordModel) {
  let newPaths: string[] = [];
  //@ts-ignore
  product.images.forEach((image) => {
    newPaths.push(pb.files.getUrl(product, image));
  });
  return newPaths;
}

export async function loadProducts() {
  // console.log(await pb.collection("huinya").getList());
  let products = await pb.collection("products").getFullList<ProductProps>();
  let gor = await pb.collection("products").getFirstListItem(`url="gorinich"`);
  console.log(
    // await pb.collection("users").getFirstListItem(`email="ebalo@mail.ru"`),
    await pb.collection("users").getFullList(),
    // gor,
    "hui"
  );
  // console.log(products);
  products.forEach((product, i) => {
    console.log(product.url);
    product.images.forEach((image, j) => {
      console.log(image);
      products[i].images[j] = pb.files.getUrl(product, image);
    });
  });

  return products;
}

export const usePocketBase = async () => {
  return pb;
};
