// Controle de responsividade da sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    
    // Toggle da sidebar ao clicar no botão
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        header.classList.toggle('sidebar-open');
        mainContent.classList.toggle('sidebar-open');
        footer.classList.toggle('sidebar-open');
    });
    
    // Fecha sidebar ao clicar em um link 
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                header.classList.remove('sidebar-open');
                mainContent.classList.remove('sidebar-open');
                footer.classList.remove('sidebar-open');
            }
        });
    });
    
    // Fecha sidebar ao clicar fora dela
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            header.classList.remove('sidebar-open');
            mainContent.classList.remove('sidebar-open');
            footer.classList.remove('sidebar-open');
        }
    });

    /**
     * API BASICA PARA ENVIO DE DADOS AO BASEROW, UTILIZADO PARA TESTES DE AUTOMAÇÃO COM N8N
     */
    
    // Adicionar elemento para mensagens de feedback
    const mainContentElement = document.querySelector('.main-content .container-fluid');
    if (mainContentElement) {
        const mensagemElement = document.createElement('div');
        mensagemElement.id = 'mensagem';
        mensagemElement.className = 'alert';
        mensagemElement.style.display = 'none';
        mensagemElement.style.marginBottom = '20px';
        mainContentElement.insertBefore(mensagemElement, mainContentElement.firstChild);
    }
    
    // Configurar handler para o formulário de Informações Pessoais
    const pessoalForm = document.querySelector('#cadastroForm');
    const contatoForms = document.querySelector('#contatoForm');
    if (pessoalForm) {
        pessoalForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que a página recarregue ao enviar o formulário
            
            // Captura os dados do formulário
            const nome = document.getElementById("nomeCompleto").value;
            const sexo = document.getElementById("sexo").value;
            
            /* ID da tabela no Baserow*/
            const tableId = 477654;  
            const apiUrl = `https://api.baserow.io/api/database/rows/table/${tableId}/`;
            
            // Token de API do Baserow  
            const apiToken = "nHSTGnCaqORYepadchHXS0F8UFIpuKFu";
            
            // Dados no formato correto para o Baserow
             
            const dados = {
                "field_3754522": nome,            // Substitua pelo ID correto do campo 'Nome' no Baserow
                "field_3754523": sexo,            // Substitua pelo ID correto do campo 'Sexo' no Baserow
                 
            };
            
            // Mostrar mensagem de carregamento
            const mensagemEl = document.getElementById("mensagem");
            if (mensagemEl) {
                mensagemEl.innerText = "Enviando dados...";
                mensagemEl.className = "alert alert-info";
                mensagemEl.style.display = "block";
            }
            
            // Console log para debug
            console.log("Enviando dados para Baserow:", dados);
            console.log("URL:", apiUrl);
            
            // Requisição para a API do Baserow
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${apiToken}`
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                console.log("Status da resposta:", response.status);
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Resposta de erro:", text);
                        throw new Error(`Erro de API: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Resposta de sucesso:", data);
                if (mensagemEl) {
                    mensagemEl.innerText = "Cadastro realizado com sucesso!";
                    mensagemEl.className = "alert alert-success";
                }
                pessoalForm.reset(); // Limpa o formulário
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
                if (mensagemEl) {
                    mensagemEl.innerText = `Erro ao cadastrar: ${error.message}`;
                    mensagemEl.className = "alert alert-danger";
                }
            });
        });
    }
    if (contatoForms) {
        contatoForms.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que a página recarregue ao enviar o formulário
            
            // Capturar informações de contato se existirem
            const email = document.getElementById("email").value;
            const celular = document.getElementById("celular").value;
            
            /* ID da tabela no Baserow*/
            const tableId = 477654;  
            const apiUrl = `https://api.baserow.io/api/database/rows/table/${tableId}/`;
            
            // Token de API do Baserow  
            const apiToken = "nHSTGnCaqORYepadchHXS0F8UFIpuKFu";
            
            // Dados no formato correto para o Baserow
             
            const dados = {
                "field_3754531": email,           // Substitua pelo ID correto do campo 'Email' no Baserow
                "field_3754524": celular          // Substitua pelo ID correto do campo 'Celular' no Baserow
            };
            
            // Mostrar mensagem de carregamento
            const mensagemEl = document.getElementById("mensagem");
            if (mensagemEl) {
                mensagemEl.innerText = "Enviando dados...";
                mensagemEl.className = "alert alert-info";
                mensagemEl.style.display = "block";
            }
            
            // Console log para debug
            console.log("Enviando dados de contato para Baserow:", dados);
            console.log("URL:", apiUrl);
            
            // Requisição para a API do Baserow
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${apiToken}`
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                console.log("Status da resposta de contato:", response.status);
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Resposta de erro:", text);
                        throw new Error(`Erro de API: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Resposta de sucesso:", data);
                if (mensagemEl) {
                    mensagemEl.innerText = "Cadastro realizado com sucesso!";
                    mensagemEl.className = "alert alert-success";
                }
                pessoalForm.reset(); // Limpa o formulário
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
                if (mensagemEl) {
                    mensagemEl.innerText = `Erro ao cadastrar: ${error.message}`;
                    mensagemEl.className = "alert alert-danger";
                }
            });
        });
    }
});