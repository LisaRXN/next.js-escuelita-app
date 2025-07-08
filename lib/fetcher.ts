export const fetcher = async (url: string) => {
    const res = await fetch(url, {
      credentials: "include", // pour envoyer le cookie __session de Clerk
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  };
  