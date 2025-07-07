import { fetchNewsDetail, loadRelatedNews } from "@/actions";
import { socialLinks } from "@/constants/social-media";
import { extraerIdDeSlug } from "@/modules/admin/utils/slugUtils";
import {
  Banner,
  Footer,
  Header,
  NewsDetail,
  RelatedNews
} from "@/modules/home/components";
import { Metadata } from "next";
import { headers } from "next/headers";

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

export async function generateMetadata({
  params
}: Props): Promise<Metadata | null> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const { slug } = await params;

  const id = extraerIdDeSlug(slug);
  const newsDetail = await fetchNewsDetail(id);

  if (!newsDetail || !id) {
    return null;
  }

  return {
    title: newsDetail.title,
    description: `${newsDetail.content
      .join(" ")
      .substring(0, 160)
      .trimEnd()}...`,
    openGraph: {
      title: newsDetail.title,
      description: `${newsDetail.content
        .join(" ")
        .substring(0, 160)
        .trimEnd()}...`,
      url: `${baseUrl}/news/${slug}`,
      siteName: "Plataforma News",
      images: newsDetail.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: newsDetail.title
      })),
      locale: "es_MX",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: newsDetail.title,
      description: `${newsDetail.content
        .join(" ")
        .substring(0, 160)
        .trimEnd()}...`,
      images: newsDetail.images
    }
  };
}

export default DetailPage;
