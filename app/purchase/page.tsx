"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cities from "./_components/cities.json";
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
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AccountForm } from "./_components/AccounForm";
import { CreditCardForm } from "./_components/CreditCardForm";
import { useRouter } from "next/router";
import { FiCheckCircle } from "react-icons/fi";
import { Dialog } from "@/components/ui/dialog";

export default function Page() {
  const [tab, changeTab] = useState("payment");

  const switchTab = () => {
    changeTab("payment");
  };

  return (
    <>
      <Tabs value={tab} className="m-auto h-5/6 w-1/2">
        <TabsContent value="account" className="h-full">
          <AccountForm switchTab={switchTab} />
        </TabsContent>
        <TabsContent value="payment">
          <CreditCardForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
