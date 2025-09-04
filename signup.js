import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://<SEU_SUPABASE_URL>'
const supabaseKey = '<SEU_SUPABASE_KEY>'
const supabase = createClient(supabaseUrl, supabaseKey)

const signupForm = document.getElementById('signup-form')

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const uuid = document.getElementById('uuid').value
  const nome = document.getElementById('nome').value
  const data_nascimento = document.getElementById('data_nascimento').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirm-password').value

  if (password !== confirmPassword) {
    alert('As senhas não coincidem.')
    return
  }

  try {
    // Verificar se o uuid existe e ainda não tem senha
    const { data: userData, error: fetchError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('random_id', uuid)
      .is('senha', null)
      .single()

    if (fetchError || !userData) {
      alert('ID inválido ou já cadastrado.')
      return
    }

    // Atualizar dados do usuário
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({
        nome,
        data_nascimento,
        senha: password // ou hash para mais segurança
      })
      .eq('random_id', uuid)

    if (updateError) {
      throw updateError
    }

    alert('Conta criada com sucesso!')
    window.location.href = 'login.html'

  } catch (error) {
    console.error('Erro ao criar conta', error)
    alert('Erro ao criar conta. Tente novamente.')
  }
})
