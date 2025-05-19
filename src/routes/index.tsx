import { createFileRoute } from '@tanstack/react-router';
import { GamePreviews } from '@/components/GamePreviews/GamePreviews';

export const Route = createFileRoute('/')({
  component: function App() {
    return <GamePreviews />;
  },
});
