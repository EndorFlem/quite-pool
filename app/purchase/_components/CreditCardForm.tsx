"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import cities from "./cities.json";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiCheckCircle, FiCreditCard } from "react-icons/fi";

const FormSchema = z.object({
  number: z.string(),
  date: z.string(),
  cvv: z.string(),
});

export function CreditCardForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      number: "",
      date: "",
      cvv: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // router.push("/purchase/success");
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <Label className="flex items-center gap-2">
          Всякое говно <FiCreditCard className="" />
        </Label>
      </CardHeader>
      <CardContent className="w-full h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full gap-4 flex-col"
          >
            <div className="flex gap-4 ">
              <FormField
                name="number"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Input you adress</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Input you adress</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                name="cvv"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Input you adress</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SuccessfulPurchase />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function SuccessfulPurchase() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  const handleSubmitInvite = () => {
    let count = 5;
    const interval = setInterval(() => {
      count = count - 1;
      if (count <= 1) {
        router.push("/account");
      }
      setSeconds(count);
    }, 1000);
    return () => clearInterval(interval);
  };
  return (
    <Dialog
      onOpenChange={() => {
        handleSubmitInvite();
      }}
    >
      <DialogTrigger className="w-fit ml-auto mt-auto" asChild>
        <Button type="submit">Submit</Button>
      </DialogTrigger>
      <DialogContent
        className="ml-auto mr-auto"
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="flex items-center text-blue mb-auto flex-col">
          <FiCheckCircle className="w-48 h-48" />
          <DialogTitle>Your purchase was successful</DialogTitle>
          <DialogDescription>
            You will be redirected in {seconds}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
