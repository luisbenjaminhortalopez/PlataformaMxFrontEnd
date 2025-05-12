
export const formatearFecha = (fechaStr) => {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  return fecha.toISOString().split('T')[0];
};

export const fechaVencida = (fecha) => {
  if (!fecha) return false;
  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
  const hoy = new Date();
  
  hoy.setHours(0, 0, 0, 0);
  fechaObj.setHours(0, 0, 0, 0);
  
  return fechaObj < hoy;
};

export const formatearFechaLegible = (fecha) => {
  if (!fecha) return "";
  
  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
  const opciones = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return fechaObj.toLocaleDateString('es-ES', opciones);
};