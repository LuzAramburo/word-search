import { Dialog } from '@/components/ui/Dialog.tsx';
import { useAppSelector } from '@/store/hooks.ts';
type WinnerDialogProps = {
  title: string;
  subtitle: string;
  btnText: string;
  onConfirm: () => void;
}

export const WinnerDialog = ({ title, subtitle, btnText, onConfirm }: WinnerDialogProps) => {
  const { winnerDialog } = useAppSelector(state => state.game);


  return (
    <Dialog open={winnerDialog}>
      <div className="text-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="py-4">{subtitle}</p>
        <button className="btn btn-primary" onClick={onConfirm}>{btnText}</button>
      </div>
    </Dialog>
  );
};
