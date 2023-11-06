import { auth } from '@/firebase.ts';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setIsRedirected, setLoading, setUser } from '@/store/userSlice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useAppDispatch();
  const redirectedFrom = useAppSelector(state => state.user.redirectedFrom);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((result) => {
      dispatch(setLoading(true));
      const { email, uid, displayName, photoURL } = result.user;
      dispatch(setUser({
        email,
        uid,
        displayName,
        avatar: photoURL,
      }));
      dispatch(setLoading(false));
    });

    if (redirectedFrom) {
      const navigateTo = redirectedFrom;
      dispatch(setIsRedirected(null));
      navigate(navigateTo);
    }
  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Log in</h1>
      <button className="btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
