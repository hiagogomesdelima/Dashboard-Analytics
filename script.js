import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Substitua com as suas credenciais do Supabase
const supabaseUrl = 'postgresql://postgres:A8oO1Ymvnf569xlH@db.yvrelweiqqqmsbafanda.supabase.co:5432/postgres';  // Substitua pelo seu URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cmVsd2VpcXFxbXNiYWZhbmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTE1NjAsImV4cCI6MjA3MjU2NzU2MH0.p5fglDoG-K9PpnQT7K1mUkLmj5m_zGJYzZxKsj48leM';  // Substitua pela sua chave anon pública
const supabase = createClient(supabaseUrl, supabaseKey);

// Função de login
async function login() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Por favor, insira um e-mail.");
        return;
    }

    // Tente fazer login com o Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'senha_aqui',  // Senha fictícia para teste
    });

    if (error) {
        alert('Erro no login: ' + error.message);
    } else {
        // Quando logado, o usuário é redirecionado para o dashboard
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').textContent = data.user.email;
        loadDashboard();
    }
}

// Função de logout
async function logout() {
    await supabase.auth.signOut();
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Carregar o dashboard com dados do banco
async function loadDashboard() {
    const user = supabase.auth.user();
    
    // Se o usuário não estiver autenticado
    if (!user) {
        alert("Você precisa estar logado!");
        return;
    }

    // Buscar sites associados ao usuário
    const { data: sites, error: sitesError } = await supabase
        .from('sites')
        .select('id, domain')
        .eq('user_id', user.id); // Usando o id do usuário logado para buscar os sites

    if (sitesError) {
        console.error('Erro ao carregar sites:', sitesError);
    } else {
        const sitesList = document.getElementById('sites-list');
        sitesList.innerHTML = sites
            .map(site => `<li>${site.domain} (ID: ${site.id})</li>`)
            .join('');
    }

    // Buscar eventos recentes
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('event_type, page_url, created_at')
        .in('site_id', sites.map(site => site.id))  // Pegando eventos de todos os sites do usuário
        .limit(5)
        .order('created_at', { ascending: false });

    if (eventsError) {
        console.error('Erro ao carregar eventos:', eventsError);
    } else {
        const eventsPre = document.getElementById('events');
        eventsPre.textContent = JSON.stringify(events, null, 2);
    }
}
