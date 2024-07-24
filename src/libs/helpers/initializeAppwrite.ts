// libs/helpers/initializeAppwrite.ts
import { Account, Client, Databases, ID, Models } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";

export const signup = async (email: string, password: string) => {
  const userId = ID.unique();
  try {
    const response = await account.create(userId, email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await account.deleteSession("current");
};

export const login = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<
  Models.User<Models.Preferences>
> => {
  return account.get();
};

export const createMultipleDocuments = async (documents: any[]) => {
  try {
    // Check if the user is logged in
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User is not logged in");
    }

    const promises = documents.map((doc) =>
      databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        ID.unique(),
        {
          ...doc,
          userId: user.$id,
        }
      )
    );
    const results = await Promise.all(promises);
    console.log("Documents created:", results);
    return results;
  } catch (error) {
    console.error("Error in createMultipleDocuments:", error);
    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        console.error(
          "User is not authorized. Please check login status and permissions."
        );
      }
    }
    throw error;
  }
};
