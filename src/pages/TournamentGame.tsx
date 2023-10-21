import Game from '@/pages/Game.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { TournamentLobby } from '@/components/Tournament/TournamentLobby.tsx';

export const TournamentGame = () => {
  const tournament = useAppSelector(state => state.user.tournament);

  if (!tournament?.started) return (
    <TournamentLobby />
  );

  return (
    <Game />
  );
};
