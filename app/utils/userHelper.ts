import prisma from "@/prisma/prisma";

/**
 * Finds a user by their Google ID (email).
 * @param {string} google_id - The Google ID (email) of the user.
 * @returns {Promise<object|null>} - The user object if found, otherwise null.
 */
export async function findUserByGoogleId(google_id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { google_id },
    });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw new Error("Error finding user");
  }
}
