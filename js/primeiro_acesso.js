import { supabase } from '../supabase.js';

const form = document.getElementById('primeiro-acesso-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;
  const nome = document.getElementById('nome').value;
  const data_nascimento = document.getElementById('data_nascimento').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem.');
    return;
  }

  try {
    // Criar usuário no Auth
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    // Criar registro extra na tabela usuarios
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([{
        id: userData.user.id,
        nome: nome,
        data_nascimento: data_nascimento
      }]);

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert('Conta criada com sucesso! Confirme seu email e faça login.');
    window.location.href = 'index.html';

  } catch (err) {
    console.error(err);
    alert('Erro no cadastro.');
  }
});

const { data: userData, error } = await supabase.auth.signUp({
  email: 'teste@teste.com',
  password: '123456'
});