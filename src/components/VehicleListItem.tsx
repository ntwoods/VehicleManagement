"use client";

import type { Vehicle } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, FileText, Bike, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { differenceInDays, parseISO, format } from "date-fns";

const getRenewalStatus = (
  expiryDate: string
): {
  daysLeft: number;
  variant: "destructive" | "secondary" | "outline";
  text: string;
} => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = parseISO(expiryDate);
  const daysLeft = differenceInDays(expiry, today);

  if (daysLeft < 0) {
    return { daysLeft, variant: "destructive", text: "Expired" };
  }
  if (daysLeft <= 30) {
    return {
      daysLeft,
      variant: "secondary",
      text: `Expires in ${daysLeft + 1} ${daysLeft === 0 ? "day" : "days"}`,
    };
  }
  return { daysLeft, variant: "outline", text: "Valid" };
};

export function VehicleListItem({ vehicle }: { vehicle: Vehicle }) {
  const insuranceStatus = getRenewalStatus(vehicle.insuranceExpiry);
  const pucStatus = getRenewalStatus(vehicle.pucExpiry);

  const VehicleIcon = vehicle.type === "2-wheeler" ? Bike : Car;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline flex items-center gap-2">
              <VehicleIcon className="w-6 h-6 text-muted-foreground" />
              {vehicle.name}
            </CardTitle>
            <CardDescription>{vehicle.registrationNumber}</CardDescription>
          </div>
          <Badge variant="outline">{vehicle.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Insurance
            </h4>
            <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                Expires on {format(parseISO(vehicle.insuranceExpiry), "MMM d, yyyy")}
                </p>
                <Badge variant={insuranceStatus.variant}>{insuranceStatus.text}</Badge>
            </div>
        </div>
        <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                PUC
            </h4>
            <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                Expires on {format(parseISO(vehicle.pucExpiry), "MMM d, yyyy")}
                </p>
                <Badge variant={pucStatus.variant}>{pucStatus.text}</Badge>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/edit-vehicle/${vehicle.id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
