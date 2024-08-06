import { RouterProvider } from 'react-router-dom';
import { router } from '@/router.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
