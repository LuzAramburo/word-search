import { auth } from '@/libs/firebase.ts';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInAnonymously
} from 'firebase/auth';
import { setIsRedirected, setLoading } from '@/store/userSlice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@/assets/icons/PersonIcon.tsx';
import GoogleIcon from '@/assets/icons/google.tsx';

const Auth = () => {
  const dispatch = useAppDispatch();
  const redirectedFrom = useAppSelector(state => state.user.redirectedFrom);
  const navigate = useNavigate();

  const signInAnon = async() => {
    try {
      await signInAnonymously(auth)
        .then(handleRedirectUser);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    dispatch(setLoading(true));
    const provider = new GoogleAuthProvider();

    await setPersistence(auth, browserLocalPersistence);

    await signInWithPopup(auth, provider)
      .then(handleRedirectUser);
  };

  const handleRedirectUser = () => {
    dispatch(setLoading(false));

    if (redirectedFrom) {
      const navigateTo = redirectedFrom;
      dispatch(setIsRedirected(null));
      navigate(navigateTo);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Log in</h1>

      <button className="btn btn-primary mb-1" onClick={signInAnon}><PersonIcon /> Sign in as Anonymous user
      </button>
      <small className="mb-5 text-gray-600">You can later create a permanent user</small>
      <button className="btn btn-primary" onClick={signInWithGoogle}><GoogleIcon/> Sign in with Google</button>
    </div>
  );
};

export default Auth;
