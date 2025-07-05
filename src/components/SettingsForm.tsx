"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const settingsFormSchema = z.object({
  alertDays: z.coerce
    .number({ invalid_type_error: "Please enter a number." })
    .min(1, "Must be at least 1 day.")
    .max(90, "Cannot be more than 90 days."),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  alertDays: 7,
};

export function SettingsForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Settings Saved",
      description: `You will now be reminded ${data.alertDays} days before expiry.`,
    });
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="alertDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Renewal Alert</FormLabel>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Remind me</span>
                <Input type="number" className="w-24" {...field} />
                <span className="text-sm text-muted-foreground">days before expiry.</span>
              </div>
              <FormDescription>
                Set how many days in advance you want to receive renewal notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Preferences
        </Button>
      </form>
    </Form>
  );
}
