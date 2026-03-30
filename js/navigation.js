const burger = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-menu');

// открыть
burger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
});

// закрыть по крестику
closeBtn.addEventListener('click', closeMenu);

// закрыть по клику на затемнение
overlay.addEventListener('click', closeMenu);

function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
}


// Обработчик для пунктов меню верхнего уровня
document.querySelectorAll('.menu-item > li > a').forEach(link => {
    link.addEventListener('click', function(e) {
        const parentLi = this.parentElement;
        const submenu = parentLi.querySelector('.columns');

        if (!submenu) return;

        e.preventDefault();

        document.querySelectorAll('.menu-item > li.open').forEach(item => {
            if (item !== parentLi) {
                item.classList.remove('open');
            }
        });

        document.querySelectorAll('.columns ul li.open').forEach(item => {
            if (item !== parentLi) {
                item.classList.remove('open');
            }
        });

        parentLi.classList.toggle('open');
    });
});


document.querySelectorAll('.columns ul li > a').forEach(link => {
    link.addEventListener('click', function(e) {
        const parentLi = this.parentElement;
        const submenu = parentLi.querySelector('ul');

        if (!submenu) return;

        e.preventDefault();

        parentLi.classList.toggle('open');
    });
});


// Закрытие всех открытых пунктов меню при клике вне их
document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.menu-item > li.open').forEach(item => {
            item.classList.remove('open');
        });
        
        document.querySelectorAll('.columns ul li.open').forEach(item => {
            item.classList.remove('open');
        });
    }
});
