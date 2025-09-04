// js/dashboard.js
import { supabase } from './supabase.js';

const userInfoDiv = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');
const metricasDiv = document.getElementById('metricas');

async function loadDashboard() {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Buscar dados do usuário
  const { data: usuario, error: userDataError } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', user.id)
    .single();

  userInfoDiv.innerHTML = `
    <p><strong>Nome:</strong> ${usuario?.nome || 'Não informado'}</p>
    <p><strong>Email:</strong> ${user.email}</p>
  `;

  // Buscar sites do usuário
  const { data: sites, error: siteError } = await supabase
    .from('sites')
    .select('id, nome, dominio')
    .eq('usuario_id', user.id);

  if (siteError || !sites || sites.length === 0) {
    metricasDiv.innerHTML = '<p>Nenhum site encontrado para este usuário.</p>';
    return;
  }

  // Buscar eventos dos sites
  const siteIds = sites.map(s => s.id);

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .in('site_id', siteIds);

  if (eventsError) {
    metricasDiv.innerHTML = '<p>Erro ao carregar eventos.</p>';
    return;
  }

  // Agrupar por tipo
  const contagem = {};
  events.forEach(event => {
    contagem[event.event_type] = (contagem[event.event_type] || 0) + 1;
  });

  // Mostrar métricas
  metricasDiv.innerHTML = `
    <h2>Métricas</h2>
    ${Object.entries(contagem)
      .map(([tipo, qtd]) => `<p><strong>${tipo}:</strong> ${qtd}</p>`)
      .join('')}
  `;
}

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
});

loadDashboard();
