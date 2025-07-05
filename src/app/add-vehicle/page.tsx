import { VehicleForm } from "@/components/VehicleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddVehiclePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add New Vehicle</CardTitle>
          <CardDescription>
            Enter the details of your new vehicle to start tracking its renewals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VehicleForm />
        </CardContent>
      </Card>
    </div>
  );
}
