import { obtenerNoticias } from "@/lib/actions";
import {
  formatearListadoNoticias,
  ordenarNoticiasPorFecha
} from "@/modules/admin/utils";
import { NoticiasPage } from "@/modules/admin/pages";

const AdminNoticias = async () => {
  const { data } = await obtenerNoticias();
  const noticiasFormateadas = formatearListadoNoticias(data);
  const noticias = ordenarNoticiasPorFecha(noticiasFormateadas);

  return <NoticiasPage noticias={noticias} />;
};

export default AdminNoticias;
