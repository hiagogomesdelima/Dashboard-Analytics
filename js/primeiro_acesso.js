// js/primeiro_acesso.js
import { supabase } from './supabase.js';

const form = document.getElementById('primeiro-acesso-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const nome = document.getElementById('nome').value;
  const data_nascimento = document.getElementById('data_nascimento').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm_password').value;

  if (password !== confirm) {
    alert('Senhas não coincidem');
    return;
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Erro ao criar conta: ' + error.message);
    return;
  }

  const user = signUpData.user;

  // Após cadastro, criar entrada na tabela usuarios (caso não use trigger)
  await supabase.from('usuarios').insert({
    id: user.id,
    nome,
    data_nascimento
  });

  alert('Conta criada com sucesso!');
  window.location.href = 'index.html';
});
