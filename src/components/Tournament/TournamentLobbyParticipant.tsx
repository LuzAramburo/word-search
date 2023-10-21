import { useAppSelector } from '@/store/hooks.ts';

export const TournamentLobbyParticipant = () => {
  const tournament = useAppSelector(state => state.user.tournament);
  return (
    <>
      <p>Waiting for host to start the game</p>
      <div className="form-control">
        <label className="label inline text-center">
          <span className="label-text">Tournament ID</span>
        </label>
        <input value={tournament?.id} type="text" className="input input-bordered" readOnly disabled />
      </div>
    </>
  );
};
