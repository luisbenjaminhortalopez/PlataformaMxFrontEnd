import { Banner, Footer, Header, HomeNews } from "@home/components";
import { Suspense } from "react";

export default async function Home() {
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61573717705519",
    instagram:
      "https://www.instagram.com/_plataformanews?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header logo="/logodos.png" />

      <main className="w-full px-5 lg:px-10 flex-grow">
        <div className="max-w-7xl mx-auto lg:mb-10">
          <Banner />
        </div>
        <Suspense
          fallback={
            <div className="text-center py-10">Cargando noticias...</div>
          }
        >
          <HomeNews />
        </Suspense>
      </main>

      <Footer logo="/logodos.png" socialLinks={socialLinks} />
    </div>
  );
}
