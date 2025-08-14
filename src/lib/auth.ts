import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  await signInWithPopup(auth, provider);
  console.log("User signed in with Google.");
}

export async function logout() {
  await signOut(auth);
  console.log("User signed out.");
}
