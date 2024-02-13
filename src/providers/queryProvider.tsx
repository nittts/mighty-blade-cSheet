import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const options = {
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  };

  const client = new QueryClient(options);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
