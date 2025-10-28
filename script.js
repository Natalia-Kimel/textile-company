document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('nav__icon-toggle');
    const navbarCollapse = document.getElementById('navbar-collapse');
    const body = document.body;

    // Переключение меню-бургера
    toggleButton.addEventListener('click', function() {
        navbarCollapse.classList.toggle('collapse');
        body.classList.toggle('no-scroll');
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !expanded);
    });

    // Закрытие меню-бургера при нажатии на элементы меню
    const menuLinks = document.querySelectorAll('.nav__menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const dropdown = this.closest('.nav__dropdown');
            const trigger = dropdown ? dropdown.querySelector('.nav__dropdown-trigger') : null;

            // Проверяем, есть ли у родительского элемента .nav__dropdown .nav__dropdown-trigger
            if (!trigger) {
                navbarCollapse.classList.add('collapse');
                body.classList.remove('no-scroll');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Переключение выпадающего меню
    const dropdownTriggers = document.querySelectorAll('.nav__dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.stopPropagation(); // Останавливаем всплытие события
            const dropdownMenu = this.nextElementSibling;

            // Проверяем, существует ли dropdownMenu
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show'); // Добавьте класс 'show' для отображения
                const expanded = this.getAttribute('aria-expanded') === 'true' || false;
                this.setAttribute('aria-expanded', !expanded);
            }
        });
    });

    // Добавляем обработчик на всю ссылку для открытия выпадающего меню
    const dropdownLinks = document.querySelectorAll('.nav__dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const dropdown = this.closest('.nav__dropdown');
            const trigger = dropdown ? dropdown.querySelector('.nav__dropdown-trigger') : null;
            const dropdownMenu = dropdown ? dropdown.querySelector('.nav__dropdown-menu') : null;

            // Если есть триггер, открываем/закрываем меню
            if (trigger && dropdownMenu) {
                event.preventDefault(); // Предотвращаем переход по ссылке
                dropdownMenu.classList.toggle('show'); // Переключаем видимость меню
                const expanded = trigger.getAttribute('aria-expanded') === 'true' || false;
                trigger.setAttribute('aria-expanded', !expanded);
            }
        });
    });

    // Закрытие меню при нажатии вне его
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !toggleButton.contains(event.target)) {
            navbarCollapse.classList.add('collapse');
            body.classList.remove('no-scroll');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});