import { useToast } from "@/design-system/ui/Toast/use-toast";
import { ServiceResponse } from "@/models/Service";
import { useState } from "react";

type Service<TParams, TResult> = {
  execute: (params?: TParams) => Promise<ServiceResponse<TResult>>;
};

type UseServiceProps<TParams, TResult> = {
  service: Service<TParams, TResult>;
};

export default function useService<TParams, TResult>({
  service,
}: UseServiceProps<TParams, TResult>) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ServiceResponse<TResult> | null>(null);
  const toast = useToast();

  const execute = async (params?: TParams) => {
    setIsLoading(true);

    const result = await service.execute(params);

    result?.messages?.forEach((message) => {
      toast.toast({
        description: message.message,
        variant: message.type === "error" ? "destructive" : "default",
      });
    });

    setIsLoading(false);
    setResult(result);
  };

  return { result, isLoading, execute };
}

// export function useServices({
//   services,
// }: {
//   services: Service<TParams, TResult>[];
// }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState<ServiceResponse<any>[] | []>([]);

//   return { result, isLoading, execute };
// }
