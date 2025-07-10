import { LoadingState, PageHeader } from "@admin/components";

const LoadingNoticias = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="Administrar Noticias"
        description="Gestiona las noticias y artículos de tu plataforma"
      />

      <LoadingState message="Cargando noticias..." />
    </div>
  );
};

export default LoadingNoticias;
 