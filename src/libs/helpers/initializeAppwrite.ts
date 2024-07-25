import { Account, Client, Databases, ID, Models, Query } from "appwrite";

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

export const createProfileDocument = async (profileData: {
  profileImage: string | null;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User is not logged in");
    }

    const document = {
      ...profileData,
      userId: user.$id,
    };

    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID as string,
      ID.unique(),
      document
    );

    console.log("Profile document created:", result);
    return result;
  } catch (error) {
    console.error("Error in createProfileDocument:", error);
    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        throw new Error(
          "User is not authorized. Please check login status and permissions."
        );
      } else if (error.message.includes("Document already exists")) {
        throw new Error("A profile for this user already exists.");
      }
    }
    throw error;
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    // console.log("Fetching profile for userId:", userId);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID as string,
      [Query.equal("userId", userId)]
    );
    // console.log("Profile fetch response:", response);

    if (response.documents.length === 0) {
      // console.log("No profile found for userId:", userId);
      return null;
    }

    return response.documents[0];
  } catch (error) {
    // console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getLinksByUserId = async (userId: string) => {
  try {
    // console.log("Fetching links for userId:", userId);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [Query.equal("userId", userId)]
    );
    // console.log("Links fetch response:", response);

    return response.documents;
  } catch (error) {
    // console.error("Error fetching links:", error);
    throw error;
  }
};

export const updateProfileDocument = async (
  profileId: string,
  profileData: {
    profileImage: string | null;
    firstName: string;
    lastName: string;
    email: string;
  }
) => {
  try {
    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID as string,
      profileId,
      profileData
    );
    console.log("Profile document updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating profile document:", error);
    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        throw new Error(
          "User is not authorized. Please check login status and permissions."
        );
      }
    }
    throw error;
  }
};
