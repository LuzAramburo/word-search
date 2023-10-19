import { auth } from '@/firebase.ts';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Auth = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl">Join Tournament</h1>
      <h2 className="mb-6">You need an account to create and join tournaments</h2>
      <button className="btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
