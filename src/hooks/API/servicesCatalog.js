import { supabase } from '../supabaseClient';

// Obtener todas las marcas
export const getMarcas = async () => {
  const { data, error } = await supabase
    .from('marca')
    .select('*')
    .order('idmarca', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

// Insertar una nueva marca
export const createMarca = async (descripcion) => {
  const { data, error } = await supabase
    .from('marca')
    .insert([{ descripcion }])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// Obtener todas las unidades
export const getUnidades = async () => {
  const { data, error } = await supabase
    .from('unidades')
    .select('*')
    .order('idunidad', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

// Insertar una nueva unidad
export const createUnidad = async (descripcion) => {
  const { data, error } = await supabase
    .from('unidades')
    .insert([{ descripcion }])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// Obtener todas las categorías
export const getCategorias = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('idcategoria', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

// Insertar una nueva categoría
export const createCategoria = async (descripcion) => {
  const { data, error } = await supabase
    .from('categorias')
    .insert([{ descripcion }])
    .select();

  if (error) throw new Error(error.message);
  return data;
};