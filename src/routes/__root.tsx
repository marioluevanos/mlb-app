import { Outlet, createRootRoute } from '@tanstack/react-router';
import { PlayerProfile } from '@/components/PlayerProfile/PlayerProfile';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <PlayerProfile />
    </>
  ),
});
