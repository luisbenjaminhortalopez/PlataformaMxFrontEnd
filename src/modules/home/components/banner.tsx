import { fetchAdvertisement } from "@/actions";

export const Banner = async () => {
  const banner = await fetchAdvertisement();
  if (!banner) return null;

  return (
    <section className="w-full flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner}
        alt="Publicidad"
        className="rounded-3xl w-full max-h-[400px] object-cover mb-10"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </section>
  );
};
