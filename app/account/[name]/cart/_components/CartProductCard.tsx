import { ProductProps } from "@/components/ProductCard";
import { ProductCartCounter } from "@/components/ProductCartCounter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/stores/cart";

import { MdDelete } from "react-icons/md";

export function CartProductCard(props: ProductProps) {
  const { deleteProduct } = useCart();

  //maybe I use CardTitle and CardDescription in the wrong place (CardContent)
  return (
    <Card className="flex h-48 justify-between">
      <CardHeader className="w-1/4">
        <img
          src={props.images[0]}
          alt=""
          className="object-contain w-full h-full"
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-between p-6 w-fit">
        <CardTitle>
          {props.name}
          <CardDescription className="">
            {props.short_description}
          </CardDescription>
        </CardTitle>
        <div className="flex items-center gap-4 justify-end">
          <ProductCartCounter {...props} />
          <Button
            variant={"outline"}
            size={"icon"}
            className="border-2 border-[#ff2222] rounded w-8 h-8 flex items-center justify-center"
            onClick={() => {
              console.log(props.name);
              deleteProduct(props.name);
            }}
            title="delete"
          >
            <MdDelete color="#ff2222" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
