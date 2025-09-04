import { supabase } from '../supabase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const uuid = document.getElementById('uuid').value;
  const password = document.getElementById('password').value;

  try {
    const { data: userData, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('random_id', uuid)
      .single();

    if (error || !userData) {
      alert('ID inválido.');
      return;
    }

    if (!userData.senha) {
      alert('Primeiro acesso necessário. Complete o cadastro.');
      window.location.href = 'primeiro_acesso.html';
      return;
    }

    if (userData.senha !== password) {
      alert('Senha incorreta.');
      return;
    }

    localStorage.setItem('userId', userData.random_id);
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error('Erro no login', err);
    alert('Erro no login. Tente novamente.');
  }
});
