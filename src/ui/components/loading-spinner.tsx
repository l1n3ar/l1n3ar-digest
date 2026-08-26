import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
}
