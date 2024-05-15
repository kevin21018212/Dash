import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getServerSession} from 'next-auth';

export async function getUserFromSession() {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized: Please sign in');
  }

  // Check for Google account email in session (assuming email is used for Google ID)
  const googleEmail = session?.user?.email as string;
  if (!googleEmail) {
    throw new Error('Missing Google account email in session');
  }

  // Fetch user by Google account email from database (using email for matching)
  const user = await prisma.user.findFirst({
    where: {google_id: googleEmail},
  });

  if (!user) {
    // Handle the case where a user with the Google account email doesn't exist yet (optional: create user)
    throw new Error('User not found with provided Google account email');
  }

  return user.user_id; // Return the user ID
}
