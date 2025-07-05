import { auth } from "@clerk/nextjs/server";

export async function useUser() {

  const user = await auth()

  return user;
}
