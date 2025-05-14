import { Suspense } from 'react';
import RequestForm from './component/RequestForm';


export default function Page() {
  return (
    <Suspense fallback={ <div className="flex flex-col items-center justify-center h-[400px]">
      <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
      <p className="text-muted-foreground mt-4">Chargement...</p>
    </div>}>
      <RequestForm />
    </Suspense>
  );
}
