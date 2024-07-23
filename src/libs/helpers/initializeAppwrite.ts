import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string)
  .setProject("669fd02f00083220df12");

export const account = new Account(client);
export { ID } from "appwrite";

export const signup = async (email: string, password: string) => {
  try {
    const response = await account.create("unique()", email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    throw error;
  }
};
