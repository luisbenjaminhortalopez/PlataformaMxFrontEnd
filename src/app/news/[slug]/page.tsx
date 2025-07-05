import { fetchNewsDetail, loadRelatedNews } from "@/actions";
import { extraerIdDeSlug } from "@/modules/admin/utils/slugUtils";
import {
  Banner,
  Footer,
  Header,
  NewsDetail,
  RelatedNews
} from "@/modules/home/components";

type Props = {
  params: {
    slug: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const { slug } = await params;

  const id = extraerIdDeSlug(slug);
  const newsDetail = await fetchNewsDetail(id);
  const relatedNews = await loadRelatedNews(id);

  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61573717705519",
    instagram:
      "https://www.instagram.com/_plataformanews?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  };

  if (!newsDetail || !id) {
    return (
      <>
        <Header logo="/logodos.png" />
        <div className="text-center text-red-500 py-10">
          {"Noticia no encontrada"}
        </div>
        <Footer logo="/logodos.png" socialLinks={socialLinks} />
      </>
    );
  }

  return (
    <>
      <Header logo="/logodos.png" />

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-20 md:space-y-10 max-w-7xl mx-auto">
        <Banner />

        <section className="mb-4 md:mb-6 bg-gray-100 rounded-xl md:rounded-3xl p-5 md:p-11">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-snug md:leading-tight">
            {newsDetail.title}
          </h2>
        </section>

        <section className="mb-6 flex flex-col md:flex-row gap-6 md:gap-10">
          <NewsDetail newsDetail={newsDetail} />

          <RelatedNews relatedNews={relatedNews} />
        </section>
      </main>

      <Footer logo="/logodos.png" socialLinks={socialLinks} />
    </>
  );
};

export default DetailPage;
