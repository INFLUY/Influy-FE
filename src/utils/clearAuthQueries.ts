import { QueryClient } from '@tanstack/react-query';

export const clearAuthQueries = (queryClient: QueryClient) => {
  // clear auth queries -> all queries
  queryClient.clear();
};
