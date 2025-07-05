import { socialLinks } from "@/constants/social-media";
import { Footer, Header } from "@/modules/home/components";

const Loading = () => {
  return (
    <>
      <Header logo="/logodos.png" />
      <div className="text-center py-10">Cargando...</div>
      <Footer logo="/logodos.png" socialLinks={socialLinks} />
    </>
  );
};

export default Loading;
