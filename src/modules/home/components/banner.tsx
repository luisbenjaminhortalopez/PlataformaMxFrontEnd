import { fetchAdvertisement } from "@/lib/actions";
import { Image } from "./image";

export const Banner = async () => {
  const banner = await fetchAdvertisement();
  if (!banner) return null;

  return (
    <section className="w-full flex justify-center items-center">
      <Image
        src={banner}
        alt="Publicidad"
        className="rounded-3xl w-full max-h-[400px] object-cover mb-10"
      />
    </section>
  );
};
