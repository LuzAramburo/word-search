import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider.tsx';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return(
    <button className="hover:bg-zinc-300 rounded-lg p-2 cursor-pointer" onClick={handleClick}>
      {theme ==='dark' ? <Moon/> : <Sun/>}
    </button>
  );
}
