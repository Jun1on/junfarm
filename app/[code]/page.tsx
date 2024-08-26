import dynamic from 'next/dynamic';

const GamePage = dynamic(() => import('./GamePage'), { ssr: false });

export default function Home() {
  return <GamePage />;
}
