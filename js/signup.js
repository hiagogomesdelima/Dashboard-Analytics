import { supabase } from '../supabase.js';

const form = document.getElementById('primeiro-acesso-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const uuid = document.getElementById('uuid').value;
  const nome = document.getElementById('nome').value;
  const data_nascimento = document.getElementById('data_nascimento').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }

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

    if (userData.senha) {
      alert('Senha já cadastrada. Faça login.');
      window.location.href = 'index.html';
      return;
    }

    // Atualiza os dados do usuário
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({
        nome: nome,
        data_nascimento: data_nascimento,
        senha: password
      })
      .eq('random_id', uuid);

    if (updateError) {
      alert('Erro ao criar senha. Tente novamente.');
      return;
    }

    alert('Conta criada com sucesso! Faça login.');
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    alert('Erro no processo de primeiro acesso.');
  }
});
