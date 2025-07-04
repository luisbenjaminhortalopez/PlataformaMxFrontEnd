import { fetchNews } from "@/actions/news";
import HomePage from "@/modules/home/pages/home-page";

export default async function Home() {
  const newsData = await fetchNews();
  console.log("News Data:", newsData);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HomePage newsData={newsData} />
    </main>
  );
}
