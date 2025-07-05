import type { Vehicle } from "@/types";
import { VehicleListItem } from "./VehicleListItem";
import { Car } from "lucide-react";

export function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg bg-card">
        <Car className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold font-headline">No vehicles found</h3>
        <p className="text-muted-foreground mt-2">Add a new vehicle to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleListItem key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
