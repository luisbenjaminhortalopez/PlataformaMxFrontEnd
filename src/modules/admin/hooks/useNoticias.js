import { useState, useCallback } from "react";
import {
  agregarNoticia,
  actualizarNoticia,
  eliminarNoticia,
} from "../services";
import {
  obtenerDetalleNoticia,
  obtenerNoticias
} from "../../config";
import { formatearListadoNoticias, ordenarNoticiasPorFecha, formatearFecha } from "../utils";
import { crearSlugConId } from "../utils/slugUtils";

export const useNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNoticias = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await obtenerNoticias();

      const noticiasFormateadas = formatearListadoNoticias(data);
      setNoticias(ordenarNoticiasPorFecha(noticiasFormateadas));
    } catch (error) {
      console.error("Error al obtener noticias:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerDetalleCompleto = async (id) => {
    const { data } = await obtenerDetalleNoticia(id);
    const detalle = data[0];
    
    return {
      id: detalle.id,
      titulo: detalle.titulo,
      autor: detalle.autor,
      fecha_publicacion: formatearFecha(detalle.fecha_publicacion),
      fecha_vencimiento: formatearFecha(detalle.fecha_vencimiento),
      imagen_portada: detalle.imagen_portada,
      imagen_portada_url: detalle.imagen_portada,
      categoria_id: detalle.categoria_id,
      seccion01: detalle.seccion01,
      imagen01: detalle.imagen01,
      imagen01_url: detalle.imagen01,
      seccion02: detalle.seccion02 || "",
      imagen02: detalle.imagen02,
      imagen02_url: detalle.imagen02,
      slug: crearSlugConId(detalle.titulo, detalle.id)
    };
  };

  const agregarNuevaNoticia = async (data) => {
    const response = await agregarNoticia(data);
    const { id, imagenes } = response.data;

    const nuevaNoticia = {
      id,
      title: data.titulo,
      image: imagenes.imagen_portada,
      fechaPublicacion: data.fecha_publicacion,
      fechaVencimiento: data.fecha_vencimiento || null,
      slug: crearSlugConId(data.titulo, id)
    };

    setNoticias((prev) => ordenarNoticiasPorFecha([...prev, nuevaNoticia]));
    return id;
  };

  const actualizarNoticiaExistente = async (data) => {
    await actualizarNoticia(data.id, data);
    await fetchNoticias(); 
  };

  const eliminarNoticiaById = async (id) => {
    await eliminarNoticia(id);
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  const hoy = new Date();
  
  const noticiasActivas = noticias.filter(
    (n) => !n.fechaVencimiento || new Date(n.fechaVencimiento) >= hoy
  );
  
  const noticiasVencidas = noticias.filter(
    (n) => n.fechaVencimiento && new Date(n.fechaVencimiento) < hoy
  );

  return {
    noticias,
    loading,
    noticiasActivas,
    noticiasVencidas,
    fetchNoticias,
    obtenerDetalleCompleto,
    agregarNuevaNoticia,
    actualizarNoticiaExistente,
    eliminarNoticiaById
  };
};