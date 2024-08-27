import dynamic from "next/dynamic";

const GamePage = dynamic(() => import("./SelectionScreen/GamePage"), {
  ssr: false,
});

export default function Home() {
  return <GamePage />;
}
