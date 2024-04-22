import { SuccessfulPurchase } from "@/app/purchase/_components/CreditCardForm";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { FiCreditCard } from "react-icons/fi";
import { usePocketBase } from "@/actions/products";
import { z } from "zod";

const FormSchema = z
  .object({
    name: z.string().min(0),
    email: z.string().email(),
    password: z.string().min(0),
    confirmPassword: z.string(),
  })
  .refine((data) => {
    return data.password == data.confirmPassword;
  }, "You wrote wrong password")
  .refine((data) => {});

async function checkEmail(email: string) {
  "use server";

  const pb = await usePocketBase();

  if (await pb.collection("users").getFirstListItem(`email="${email}"`)) {
  }
}

export default function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
                name="name"
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
              />{" "}
              <FormField
                name="password"
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
