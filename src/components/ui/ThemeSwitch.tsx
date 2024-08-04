import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider.tsx';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log(newTheme);
    setTheme(newTheme);
  };

  if (theme === 'dark') return (<Moon className="cursor-pointer" onClick={handleClick}/>);

  return(<Sun className="cursor-pointer" onClick={handleClick}/>);
}
