import { useAppSelector } from '@/store/hooks.ts';
import Auth from '@/components/auth/Auth.tsx';

const JoinTournament = () => {
  const { user } = useAppSelector(state => state.user);

  // TODO Guard with router
  if (!user) return <Auth />;

  return (
    <div className="text-center min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-xl mb-2">Join Tournament</h2>
      <div className="join">
        <input id="tournamentId" type="text" placeholder="Tournament ID" className="input input-md input-bordered w-full max-w-xs join-item" />
        <button className="btn btn-primary join-item rounded-r-full">Join</button>
      </div>
      <div className="divider w-2/4 mx-auto">OR</div>
      <button className="btn btn-primary">Create a Tournament</button>
    </div>
  );
};
export default JoinTournament;
