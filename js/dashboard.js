import { supabase } from '../supabase.js';

const userId = localStorage.getItem('userId');

if (!userId) {
  window.location.href = 'index.html';
} else {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    alert('Erro ao carregar dashboard');
  } else {
    // Exibe informações
    document.getElementById('user-info').innerHTML = `
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Data de nascimento:</strong> ${data.data_nascimento}</p>
    `;
  }
}