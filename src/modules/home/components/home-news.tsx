import { fetchNews } from "@/lib/actions";
import { MainSection } from "./main-section";
import { MoreNews } from "./more-news";

export const HomeNews = async () => {
  const newsData = await fetchNews();

  return (
    <>
      <MainSection newsData={newsData} />
      <MoreNews newsData={newsData} />
    </>
  );
};
