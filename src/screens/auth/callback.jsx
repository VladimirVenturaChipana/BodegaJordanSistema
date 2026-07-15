import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../hooks/servicesStore';

export default function AuthCallback() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {

      // Si no hay sesión → redirigir al home sin hacer nada
      if (!session) {
        navigate('/');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/sync-google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:  session.user.email,
            nombre: session.user.user_metadata.full_name || '',
          })
        });

        const clienteData = await res.json();

        if (!res.ok) {
          // No tiene cuenta → cerrar sesión y redirigir al registro
          await supabase.auth.signOut();
          navigate('/registerCustomer', {
            state: { error: clienteData.error, email: session.user.email }
          });
          return;
        }

        // Tiene cuenta → iniciar sesión
        login({ ...clienteData, token: session.access_token });
        localStorage.setItem('cliente', JSON.stringify({
          ...clienteData,
          token: session.access_token
        }));
        navigate('/');

      } catch (err) {
        console.error('Error en callback:', err);
        navigate('/');
      }
    });
  }, []);

  return <div>Cargando...</div>;
}