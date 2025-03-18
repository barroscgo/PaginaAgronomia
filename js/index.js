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
    
    // Fecha  sidebar ao clicar fora dela
    mainContent.addEventListener('click', function() {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            header.classList.remove('sidebar-open');
            mainContent.classList.remove('sidebar-open');
            footer.classList.remove('sidebar-open');
        }
    });
});