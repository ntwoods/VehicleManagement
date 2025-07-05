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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/datepicker";
import type { Vehicle } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const vehicleFormSchema = z.object({
  name: z.string().min(2, "Vehicle name must be at least 2 characters."),
  registrationNumber: z.string().min(4, "Please enter a valid registration number."),
  type: z.enum(["2-wheeler", "4-wheeler"], {
    required_error: "You need to select a vehicle type.",
  }),
  insuranceExpiry: z.date({
    required_error: "Insurance expiry date is required.",
  }),
  pucExpiry: z.date({
    required_error: "PUC expiry date is required.",
  }),
  insuranceDocument: z.any().optional(),
  pucDocument: z.any().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

interface VehicleFormProps {
    initialData?: Vehicle;
}

export function VehicleForm({ initialData }: VehicleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<VehicleFormValues> = initialData ? {
      ...initialData,
      insuranceExpiry: new Date(initialData.insuranceExpiry),
      pucExpiry: new Date(initialData.pucExpiry),
  } : {};

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(data);
    toast({
      title: initialData ? "Vehicle Updated" : "Vehicle Added",
      description: `"${data.name}" has been successfully ${initialData ? 'updated' : 'added'}.`,
    });
    setIsSubmitting(false);
    router.push("/");
    router.refresh(); // To reflect changes if data was real
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Honda Activa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., MH12AB1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Vehicle Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2-wheeler" />
                    </FormControl>
                    <FormLabel className="font-normal">2-Wheeler</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4-wheeler" />
                    </FormControl>
                    <FormLabel className="font-normal">4-Wheeler</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="insuranceExpiry"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Insurance Expiry Date</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="pucExpiry"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>PUC Expiry Date</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="insuranceDocument"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Upload Insurance Doc</FormLabel>
                <FormControl>
                    <Input type="file" {...form.register('insuranceDocument')} />
                </FormControl>
                <FormDescription>Optional. Upload PDF or image.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="pucDocument"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Upload PUC Doc</FormLabel>
                <FormControl>
                    <Input type="file" {...form.register('pucDocument')} />
                </FormControl>
                <FormDescription>Optional. Upload PDF or image.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Save Changes" : "Add Vehicle"}
        </Button>
      </form>
    </Form>
  );
}
