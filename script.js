// Навигация между страницами
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a, .btn[data-page], .footer-links a');
    const pages = document.querySelectorAll('.page');
    
    // Функция переключения страниц
    function showPage(pageId) {
        // Скрываем все страницы
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Показываем выбранную страницу
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }
        
        // Обновляем активную ссылку в навигации
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Прокручиваем к верху страницы
        window.scrollTo(0, 0);
        
        // Обновляем URL в адресной строке (без перезагрузки страницы)
        history.pushState(null, null, `#${pageId}`);
    }
    
    // Обработчики кликов по навигационным ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });
    
    // Обработчик формы обратной связи
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // В реальном приложении здесь был бы код для отправки данных на сервер
            // Для демонстрации просто показываем сообщение
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами по адресу ${email} в ближайшее время.`);
            
            // Очищаем форму
            feedbackForm.reset();
        });
    }
    
    // Обработка изменения хэша в URL (для прямых ссылок на страницы)
    window.addEventListener('hashchange', function() {
        const pageId = window.location.hash.substring(1) || 'home';
        showPage(pageId);
    });
    
    // Инициализация - показываем главную страницу или страницу из URL
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
});