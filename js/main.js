document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1500);
    }
    
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
     // Hero Slider
     const slides = document.querySelectorAll('.slide');
     const dots = document.querySelectorAll('.dot');
     let currentSlide = 0;
     
     if (slides.length > 0 && dots.length > 0) {
         function showSlide(index) {
             slides.forEach(slide => slide.classList.remove('active'));
             dots.forEach(dot => dot.classList.remove('active'));
             
             slides[index].classList.add('active');
             dots[index].classList.add('active');
             currentSlide = index;
         }
         
         dots.forEach((dot, index) => {
             dot.addEventListener('click', () => showSlide(index));
         });
         
         const sliderPrev = document.querySelector('.slider-prev');
         const sliderNext = document.querySelector('.slider-next');
         
         if (sliderPrev && sliderNext) {
             sliderPrev.addEventListener('click', function() {
                 let newIndex = currentSlide - 1;
                 if (newIndex < 0) newIndex = slides.length - 1;
                 showSlide(newIndex);
             });
             
             sliderNext.addEventListener('click', function() {
                 let newIndex = currentSlide + 1;
                 if (newIndex >= slides.length) newIndex = 0;
                 showSlide(newIndex);
             });
             
             // Auto slide change
             setInterval(() => {
                 let newIndex = currentSlide + 1;
                 if (newIndex >= slides.length) newIndex = 0;
                 showSlide(newIndex);
             }, 5000);
         }
     }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                submitBtn.textContent = 'Mensagem Enviada!';
                
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(function() {
                button.textContent = 'Inscrito!';
                input.value = '';
                
                setTimeout(function() {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
    
    // FAQ toggle
    document.querySelectorAll('.duvida-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '1rem 0';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '1.5rem 0';
        }
    });
    
    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .pacote-card, .blog-card, .beneficio-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(251, 85, 3, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(251, 85, 3, 0.5)';
            });
        });
    }
});