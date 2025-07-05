import { VehicleForm } from "@/components/VehicleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@/types";
import { subDays, addDays } from "date-fns";

const today = new Date();

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Honda Activa",
    registrationNumber: "MH12AB1234",
    type: "2-wheeler",
    insuranceExpiry: addDays(today, 25).toISOString(),
    pucExpiry: addDays(today, 90).toISOString(),
  },
  {
    id: "2",
    name: "Toyota Fortuner",
    registrationNumber: "MH14CD5678",
    type: "4-wheeler",
    insuranceExpiry: subDays(today, 10).toISOString(),
    pucExpiry: addDays(today, 5).toISOString(),
  },
  {
    id: "3",
    name: "Royal Enfield Classic",
    registrationNumber: "MH01EF9012",
    type: "2-wheeler",
    insuranceExpiry: addDays(today, 120).toISOString(),
    pucExpiry: addDays(today, 150).toISOString(),
  },
   {
    id: "4",
    name: "Maruti Swift",
    registrationNumber: "MH02GH3456",
    type: "4-wheeler",
    insuranceExpiry: addDays(today, 2).toISOString(),
    pucExpiry: subDays(today, 30).toISOString(),
  },
];

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = mockVehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Vehicle not found</h2>
        <p className="text-muted-foreground">The requested vehicle could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Edit Vehicle Details</CardTitle>
          <CardDescription>
            Update the details for {vehicle.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VehicleForm initialData={vehicle} />
        </CardContent>
      </Card>
    </div>
  );
}
