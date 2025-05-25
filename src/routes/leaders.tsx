import './leaders.css';
import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/ui/Header/Header';

export const Route = createFileRoute('/leaders')({
  loader: async (loader) => {
    const { params: _ } = loader;
    const leadersAPI = 'https://statsapi.mlb.com/api/v1/stats/leaders';
    const searchParams = `?leaderCategories=inningsPitched&sportId=1&limit=10&statGroup=pitching`;
    const URL = `${leadersAPI}${searchParams}`;
    const response = await fetch(URL);
    const leaders = await response.json();

    return {
      leaders,
    };
  },
  component: function Live() {
    const data = Route.useLoaderData();

    return (
      <main id="leaders">
        <Header></Header>
        {JSON.stringify(data, null, 2)}
      </main>
    );
  },
});
