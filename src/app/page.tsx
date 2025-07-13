export const dynamic = "force-dynamic";

import { socialLinks } from "@/constants/social-media";
import { HomeNewsSkeleton } from "@home/skeletons";
import { Banner, Footer, Header, HomeNews } from "@home/components";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header logo="/logodos.png" />

      <main className="w-full px-5 lg:px-10 flex-grow">
        <div className="max-w-7xl mx-auto lg:mb-10">
          <Banner />
        </div>
        <Suspense fallback={<HomeNewsSkeleton />}>
          <HomeNews />
        </Suspense>
      </main>

      <Footer logo="/logodos.png" socialLinks={socialLinks} />
    </div>
  );
}
