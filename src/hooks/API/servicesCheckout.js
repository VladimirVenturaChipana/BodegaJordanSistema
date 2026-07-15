const WSP_NUMBER = import.meta.env.VITE_WSP_NUMBER || '51922113500';
const API_URL = import.meta.env.VITE_API_URL;

export const generarMensajeWsp = (clienteData, items, total) => {
  const fecha = new Date().toLocaleString('es-PE');

  // Volvemos a Unicode. ¡Esto es a prueba de errores de codificación de Windows/Vite!
  const emojiCarrito = '\u{1F6D2}'; // 🛒
  const emojiCliente = '\u{1F464}'; // 👤
  const emojiCelular = '\u{1F4F1}'; // 📱
  const emojiPin = '\u{1F4CD}';     // 📍
  const emojiPaquete = '\u{1F4E6}'; // 📦
  const emojiDinero = '\u{1F4B0}';  // 💰
  const emojiFecha = '\u{1F4C5}';   // 📅

  let mensaje = `${emojiCarrito} *NUEVO PEDIDO - BODEGA J.A*\n\n`;

  mensaje += `${emojiCliente} *Cliente:* ${clienteData.nombre} ${clienteData.apellido || ''}\n`;
  mensaje += `${emojiCelular} *Teléfono:* ${clienteData.celular}\n`;
  mensaje += `${emojiPin} *Dirección:* ${clienteData.direccion || 'No especificada'}\n\n`;
  mensaje += `${emojiPaquete} *PRODUCTOS:*\n`;
  mensaje += `─────────────────\n`;

  items.forEach(item => {
    const subtotalItem = (Number(item.finalPrice) * item.quantity).toFixed(2);
    mensaje += `• ${item.title}\n`;
    mensaje += `  Cant: ${item.quantity} x S/. ${item.finalPrice} = S/. ${subtotalItem}\n`;
  });

  mensaje += `─────────────────\n`;
  mensaje += `${emojiDinero} *TOTAL: S/. ${total.toFixed(2)}*\n\n`;
  mensaje += `${emojiFecha} ${fecha}\n`;
  mensaje += `\n_Enviado desde Bodega J.A_`;

  return mensaje;
};

export const enviarPedido = async (clienteData, {
  items,
  total,
  setLoading,
  setError,
  clearCart,
  navigate
}) => {
  setLoading(true);
  setError('');

  try {
    if (items.length === 0) {
      setError('Selecciona al menos un producto');
      setLoading(false);
      return;
    }

    // 1. Registrar cliente si no tiene cuenta
    let clienteFinal = clienteData;
    if (!clienteData.idcliente) {
      const resCliente = await fetch(`${API_URL}/api/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
      clienteFinal = await resCliente.json();
    }

    // 2. Registrar factura en BD
    await fetch(`${API_URL}/api/facturas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idcliente: clienteFinal.idcliente,
        idpago: 1,
        productos: items.map(item => ({
          idproducto: item.id,
          cantidad: item.quantity
        }))
      })
    });

    // 3. Generar mensaje y abrir WhatsApp (Usando la API más estable)
    const mensaje = generarMensajeWsp(clienteFinal, items, total);
    const wspUrl = `https://api.whatsapp.com/send?phone=${WSP_NUMBER}&text=${encodeURIComponent(mensaje)}`;
    window.open(wspUrl, '_blank');

    // 4. Limpiar carrito y redirigir
    clearCart();
    navigate('/confirmation');

  } catch (err) {
    setError('Error al procesar el pedido. Intenta de nuevo.');
  } finally {
    setLoading(false);
  }
};