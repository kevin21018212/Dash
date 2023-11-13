import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./SigninButton.module.css";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className={styles.flexContainer}>
        <p className={styles.userName}>{session.user.name}</p>
        <button onClick={() => signOut()} className={styles.signOutButton}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className={styles.signInButton}>
      Sign In
    </button>
  );
};

export default SigninButton;
