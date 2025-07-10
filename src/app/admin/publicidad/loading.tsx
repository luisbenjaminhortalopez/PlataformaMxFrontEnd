import { LoadingState, PageHeader } from "@admin/components";

const LoadingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <PageHeader
        title="Administrar Publicidad"
        description="Gestiona los anuncios publicitarios de tu plataforma"
      />

      <LoadingState message="Cargando publicidades..." />
    </div>
  );
};

export default LoadingPage;
