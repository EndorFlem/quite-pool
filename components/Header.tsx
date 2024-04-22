"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiUser, FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { Button } from "./ui/button";

function BackButton() {
  const router = useRouter();
  let isVisible = usePathname().match(new RegExp("/", "g"))?.length != 1;

  return (
    <>
      {isVisible && (
        <Button
          onClick={() => router.back()}
          className="absolute"
          variant={"link"}
        >
          <FiChevronsLeft className="text-lg" />
        </Button>
      )}
    </>
  );
}

export function Header() {
  return (
    //embed a slavic symbol
    <div className="flex h-40 bg-light-blue p-4">
      {/* <img src="" alt="" className="mx-auto" /> */}
      <BackButton />
      <div className="mx-auto w-32 h-32 bg-blue rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue to-light-blue"></div>
      <div className="flex gap-2">
        <Link href="/account">
          <FiUser className="text-deep-blue" />
        </Link>
        <Link href="/account/bogdan/cart">
          <FiShoppingCart className="text-deep-blue" />
        </Link>
      </div>
    </div>
  );
}
