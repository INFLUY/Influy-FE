import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import '@/styles/global.css';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
