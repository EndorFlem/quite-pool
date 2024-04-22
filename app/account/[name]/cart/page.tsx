"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/stores/cart";
import { CartProductCard } from "./_components/CartProductCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useCart((state) => state);
  const router = useRouter();
  return (
    <>
      <Card className="w-full">
        <CardContent className="mt-4 flex flex-col h-auto gap-4">
          {Object.entries(cart.products).length > 0 ? (
            <>
              {Object.entries(cart.products).map(([, { product }], index) => {
                return (
                  <>
                    <CartProductCard {...product} key={index} />
                  </>
                );
              })}
              {/* {Object.entries(cart.products).map(([, { product }]) => {
                return (
                  <>
                    <CartProductCard {...product} />
                  </>
                );
              })}
              {Object.entries(cart.products).map(([, { product }]) => {
                return (
                  <>
                    <CartProductCard {...product} />
                  </>
                );
              })} */}
              <CardFooter className="justify-end p-2 pb-0 pr-0 gap-2">
                {cart.totalPrice}
                <Button
                  variant={"default"}
                  onClick={() => {
                    router.push("/purchase");
                  }}
                >
                  Buy
                </Button>
              </CardFooter>
            </>
          ) : (
            <div className="items-center justify-center flex w-full h-full">
              <h3>Cart is empty</h3>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
