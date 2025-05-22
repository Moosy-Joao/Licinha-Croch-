/**
 * Licinha Crochê - Script principal
 * Responsável pela interatividade e animações do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navbar = document.getElementById('navbar');
    const menuButton = document.getElementById('menuButton');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    // Toggle do menu mobile
    menuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Alterna o ícone do botão de menu
        const icon = menuButton.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha o menu ao clicar em um link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Efeito de scroll no navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Destaca o item de menu ativo com base na seção visível
        highlightActiveSection();
    });
    
    // Função para destacar o item de menu ativo
    function highlightActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Animação de entrada para elementos quando ficam visíveis
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .about-image, .about-content');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Adiciona classe para animação inicial
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        animateOnScroll();
    });
    
    // Executa animação ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
