import { MainSectionSkeleton } from "./main-section-skeleton";
import { MoreNewsSkeleton } from "./more-news-skeleton";

export const HomeNewsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <MainSectionSkeleton />
      <MoreNewsSkeleton />
    </div>
  );
};
