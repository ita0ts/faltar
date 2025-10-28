const API_BASE = "https://api.cotemig.com.br/v1";

async function obterToken(usuario, senha) {
  const credenciais = btoa(`${usuario}:${senha}`); // base64
  
  const resposta = await fetch(`${API_BASE}/autenticacao`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credenciais}`,
      "Accept": "application/json"
    }
  });

  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error(`Erro na autenticação (${resposta.status}): ${texto}`);
  }

  const dados = await resposta.json();
  console.log("Token recebido:", dados.token);
  return dados.token;
}

async function getPerfil(token) {
  const resposta = await fetch(`${API_BASE}/perfil`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error(`Erro ao acessar /perfil (${resposta.status}): ${texto}`);
  }

  const dados = await resposta.json();
  console.log("Perfil do usuário:", dados);
}

async function getBoletim(token) {
    const resposta = await fetch(`${API_BASE}/boletim`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
  
    if (!resposta.ok) {
      const texto = await resposta.text();
      throw new Error(`Erro ao acessar /perfil (${resposta.status}): ${texto}`);
    }
  
    const dados = await resposta.json();
    console.log("Perfil do usuário:", dados);
  }

// Exemplo: usar tudo junto
(async () => {
  try {
    const usuario = prompt("Usuário:");
    const senha = prompt("Senha:");
    const token = await obterToken(usuario, senha);
    await getPerfil(token);
    await getBoletim(token);
  } catch (e) {
    console.error(e);
  }
})();
