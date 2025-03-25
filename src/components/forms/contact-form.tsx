/**
 * https://www.shadcn-form.com/playground
 * https://github.com/hasanharman/form-builder
 * Hasan Harman'a bu güzel aracı geliştirdiği için çok teşşekkürler
 */
"use client";
import { useState } from "react";
import { showToast } from "@/components/ui/sonner-extended";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

const formSchema = z.object({
  subject: z
    .string()
    .nonempty("Konu alanı zorunludur")
    .min(3, "Konu başlığı en az 3 karakter olmalıdır.")
    .max(100, "Konu başlığı en fazla 100 karakter olmalıdır."),
  email: z
    .string()
    .nonempty("E-posta alanı zorunludur")
    .email("Geçersiz e-posta adresi."),
  description: z
    .string()
    .nonempty("Açıklama alanı zorunludur")
    .min(10, "Açıklama en az 10 karakter olmalıdır.")
    .max(1000, "Açıklama en fazla 1000 karakter olmalıdır."),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      email: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      showToast(
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Mail />
            İletişim Talebi
          </h1>
          <h2 className="text-base font-bold">Konu: {values.subject}</h2>
          <p className="text-sm">
            İletişim talebiniz bize ulaştı, teşşekkürler.
          </p>
        </div>,
        {
          type: "success",
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast("Failed to submit the form. Please try again.", {
        type: "error",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konu</FormLabel>
              <FormControl>
                <Input placeholder="Konu Başlığı" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail Adresiniz</FormLabel>
              <FormControl>
                <Input placeholder="E-Mail Adresiniz" type="email" {...field} />
              </FormControl>
              <FormDescription>Size ulaşmamız için gerekli</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Açıklama"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
