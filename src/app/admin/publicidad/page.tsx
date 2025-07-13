import { obtenerPublicidad } from "@/lib/actions";
import { Publicidad } from "@/types/publicidad";
import { PublicidadPage } from "@admin/pages";

const AdminPublicidad = async () => {
  const { data } = await obtenerPublicidad();
  const formateadas: Publicidad[] = data.map((item) => ({
    id: item.id,
    imagen: item.imagen,
    nombre_anunciante: item.nombre_anunciante,
    fecha_expiracion: item.fecha_expiracion
  }));

  return <PublicidadPage publicidades={formateadas} />;
};

export default AdminPublicidad;
