import { Footer, Header } from "@/modules/home/components";

const Loading = () => {
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=61573717705519",
    instagram:
      "https://www.instagram.com/_plataformanews?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  };

  return (
    <>
      <Header logo="/logodos.png" />
      <div className="text-center py-10">Cargando...</div>
      <Footer logo="/logodos.png" socialLinks={socialLinks} />
    </>
  );
};

export default Loading;
