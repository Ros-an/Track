import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <div className="bg-home">
      <h1>This is home, welcome to nextjs! Kya baat 😎 🙌</h1>
      <h2>This is sticky</h2>
    </div>
  );
}
export default Home;
