const form = document.getElementById('form-producto');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const imagenFile = document.getElementById('imagen').files[0];

  let imagen_url = null;

  // Subir imagen (si hay)
  if (imagenFile) {
    const filePath = `${Date.now()}-${imagenFile.name}`;
    const { error: uploadError } = await supabase
      .storage
      .from('imagenes-productos')
      .upload(filePath, imagenFile);

    if (uploadError) {
      console.error('❌ Error al subir imagen:', uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('imagenes-productos')
      .getPublicUrl(filePath);

    imagen_url = publicUrlData.publicUrl;
  }

  // Insertar producto en Supabase
  const { data, error } = await supabase
    .from('productos')
    .insert([{ nombre, descripcion, precio, imagen_url }]);

  if (error) {
    console.error('❌ Error al insertar producto:', error.message);
  } else {
    console.log('✅ Producto agregado:', data);
    form.reset();
  }
});

console.log(insertData);