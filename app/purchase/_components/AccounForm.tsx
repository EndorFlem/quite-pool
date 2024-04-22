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

let citiesArr: string[] = [];
Object.values(cities).forEach((i) => (citiesArr = citiesArr.concat(i)));

const FormSchema = z
  .object({
    region: z.enum(Object.keys(cities) as [string]),
    city: z.enum(citiesArr as [string]),
    homeAdress: z
      .string({ required_error: "Please provide your home adress" })
      .min(1),
    //make regex
    phone: z.string(),
    email: z.string().email(),
    name: z.string().min(0),
    surname: z.string().min(0),
    patrinymic: z.string().min(0).optional(),
  })
  .default({
    phone: "",
    email: "",
    region: "",
    city: "",
    homeAdress: "",
    name: "",
    surname: "",
    patrinymic: "",
  });

export function AccountForm(props: { switchTab: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      homeAdress: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    props.switchTab();
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>Всякое говно</CardHeader>
      <CardContent className="w-full h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col h-full gap-4"
          >
            <NamesInput {...form} />
            <PhoneEmailSection {...form} />
            <RegionCitySelector {...form} />
            <Button type="submit" className="w-fit ml-auto mt-auto">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function RegionCitySelector(
  form: UseFormReturn<
    {
      region: string;
      city: string;
      homeAdress: string;
      phone: string;
      email: string;
      name: string;
      surname: string;
      patrinymic?: string;
    },
    any,
    undefined
  >
) {
  const region = form.watch("region");

  return (
    <div className="flex justify-between">
      <FormField
        name="region"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/4">
            <FormLabel>Region</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(cities).map((name) => (
                  <SelectItem value={name} key={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="city"
        render={({ field }) => (
          <FormItem className="w-1/4">
            <FormLabel>City</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={region === undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* it's bad, but as I understood ts doesn't respect the great and
                mighty language */}
                {/* 
                //@ts-ignore */}
                {cities[region === undefined ? "Адыгея" : region].map(
                  (name: string) => (
                    <SelectItem value={name} key={name}>
                      {name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="homeAdress"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel>Input you adress</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Adress..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function PhoneEmailSection(
  form: UseFormReturn<
    {
      region: string;
      city: string;
      homeAdress: string;
      phone: string;
      email: string;
      name: string;
      surname: string;
      patrinymic?: string;
    },
    any,
    undefined
  >
) {
  return (
    <div className="flex justify-between">
      <FormField
        name="phone"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel>Input you adress</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Phone..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
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
  );
}

function NamesInput(
  form: UseFormReturn<
    {
      region: string;
      city: string;
      homeAdress: string;
      phone: string;
      email: string;
      name: string;
      surname: string;
      patrinymic?: string;
    },
    any,
    undefined
  >
) {
  return (
    <div className="flex justify-between">
      <FormField
        name="surname"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel>Input you adress</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Phone..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/4">
            <FormLabel>Input you adress</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="patrinymic"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-1/4">
            <FormLabel>Input you adress</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
