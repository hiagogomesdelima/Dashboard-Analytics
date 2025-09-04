import { supabase } from 'supabase/supabase.js';

const userId = localStorage.getItem('userId');

if (!userId) {
  alert('Você não está autenticado. Faça login.');
  window.location.href = 'index.html';
} else {
  const getUserInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('random_id', userId)
        .single();

      if (error || !data) throw error;

      if (!data.senha) {
        window.location.href = 'primeiro_acesso.html';
        return;
      }

      const userInfo = document.getElementById('user-info');
      userInfo.innerHTML = `
        <p><strong>ID:</strong> ${data.random_id}</p>
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Data de nascimento:</strong> ${data.data_nascimento}</p>
        <p><strong>Data de criação:</strong> ${data.created_at}</p>
      `;
    } catch (err) {
      console.error('Erro ao buscar dados do usuário', err);
      alert('Erro ao carregar o dashboard. Tente novamente.');
    }
  };

  getUserInfo();

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
  });
}
