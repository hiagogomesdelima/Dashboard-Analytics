import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const uuid = document.getElementById('uuid').value;
  const password = document.getElementById('password').value;

  try {
    // Buscar o usuário pelo random_id
    const { data: userData, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('random_id', uuid)
      .single();

    if (error || !userData) {
      alert('ID inválido.');
      return;
    }

    // Verificar se a senha confere
    if (userData.senha !== password) {  // ⚠️ em produção, use hash!
      alert('Senha incorreta.');
      return;
    }

    // Login válido: salvar UUID no localStorage
    localStorage.setItem('userId', userData.random_id);

    // Redirecionar para o dashboard
    window.location.href = 'dashboard.html';

  } catch (err) {
    console.error('Erro no login', err);
    alert('Erro no login. Tente novamente.');
  }
});
