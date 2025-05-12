import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/Logo.svg";
import { obtenerDetalleNoticia } from "../../config";


export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setLoading(true);
        const { data } = await obtenerDetalleNoticia(id);
        setNoticia(data);
      } catch (err) {
        setError("No se pudo cargar la noticia.");
        console.error("Error al obtener detalle de noticia:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
  };

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!noticia) return <div className="text-center">Noticia no encontrada</div>;

  return (
    <>
      <header className="bg-black py-7 text-center mb-8">
        <img
          src={logo}
          alt="Logo PlataformaMX"
          className="max-h-[70px] md:max-h-[100px] lg:max-h-[65px] mx-auto"
        />
      </header>

      <main className="w-full px-5 md:px-20 space-y-10">
        {/* Título */}
        <section className="mb-4 bg-gray-100 rounded-3xl p-6 md:p-11">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-6xl leading-snug">
            {noticia.titulo}
          </h2>
        </section>

        {/* Detalle */}
        <section className="mb-6 flex flex-col md:flex-row gap-10">
          <article className="md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <p className="text-sm md:text-xl font-light">
                Por {noticia.autor} |{" "}
                {new Date(noticia.fecha_publicacion).toLocaleDateString("es-MX")}
              </p>
              <p className="text-xl font-bold text-purple-700">
                Publicado
              </p>
            </div>

            {/* Imagen portada */}
            <img
              src={noticia.imagen_portada}
              alt="Imagen portada"
              onError={handleImageError}
              className="w-full h-auto min-h-[300px] object-cover rounded-xl mb-6"
            />

            {/* Sección 1 */}
            <p className="text-lg md:text-2xl leading-relaxed mb-6">
              {noticia.seccion01}
            </p>

            {/* Imagen 1 */}
            {noticia.imagen01 && (
              <img
                src={noticia.imagen01}
                alt="Imagen adicional 1"
                onError={handleImageError}
                className="w-full h-auto min-h-[300px] object-cover rounded-xl mb-6"
              />
            )}

            {/* Sección 2 */}
            {noticia.seccion02 && (
              <p className="text-lg md:text-2xl leading-relaxed mb-6">
                {noticia.seccion02}
              </p>
            )}

            {/* Imagen 2 */}
            {noticia.imagen02 && (
              <img
                src={noticia.imagen02}
                alt="Imagen adicional 2"
                onError={handleImageError}
                className="w-full h-auto min-h-[300px] object-cover rounded-xl mb-6"
              />
            )}
          </article>

          {/* Sidebar de ejemplo (puedes adaptar o eliminar) */}
          <aside className="md:w-1/3 my-10">
            <div className="bg-gray-200 rounded-xl p-3 mb-10 text-left text-2xl font-semibold text-gray-700">
              Leer más:
            </div>
            <div className="text-sm text-gray-600">
              Aquí puedes mostrar artículos relacionados o destacados más adelante.
            </div>
          </aside>
        </section>
      </main>

      <footer className="bg-black py-16 px-6 mt-10 text-center text-white">
        <p>© {new Date().getFullYear()} PlataformaMX - Todos los derechos reservados.</p>
      </footer>
    </>
  );
};