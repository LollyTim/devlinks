import { account } from "@/libs/helpers/initializeAppwrite";

export const signup = async (email: string, password: string) => {
  try {
    const response = await account.create("unique()", email, password);
    return response;
  } catch (error) {
    throw error;
  }
};
