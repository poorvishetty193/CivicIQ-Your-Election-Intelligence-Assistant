import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
      <WifiOff className="w-20 h-20 text-primary/30" />
      <h1 className="text-4xl font-bold text-primary">You&apos;re Offline</h1>
      <p className="text-xl text-primary/70 max-w-md">
        CivicIQ needs an internet connection to fetch the latest election intelligence and chat responses.
      </p>
      <Button asChild size="lg">
        <Link href="/">Try Again</Link>
      </Button>
    </div>
  );
}
