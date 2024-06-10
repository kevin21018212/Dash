import { useMutation, useQueryClient } from "@tanstack/react-query";

// Utility function to handle HTTP requests
const handleRequest = async (
  url: string,
  method: string,
  body?: any
): Promise<any> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData);
  }
};

// Custom hook to save content using PUT request
export const useSaveContent = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: any) => handleRequest(url, "PUT", content),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refetch all queries
    },
    onError: (error: any) => {
      console.error(`Error: ${error.message}`);
    },
  });
};

// Custom hook to delete content using DELETE request
export const useDeleteContent = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => handleRequest(url, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refetch all queries
    },
    onError: (error: any) => {
      console.error(`Error: ${error.message}`);
    },
  });
};
