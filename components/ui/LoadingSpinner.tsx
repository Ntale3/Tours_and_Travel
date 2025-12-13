import { Loader2 } from 'lucide-react';

export const LoadingSpinner= ({message}:{message:string}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
