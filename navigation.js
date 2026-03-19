const burger = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
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
                const submenu = item.querySelector('ul');

                if (submenu) {
                    submenu.style.maxHeight = '0';
                }

                item.classList.remove('open');
            }
        });

        parentLi.classList.toggle('open');
    });
});



// Обработчик для пунктов меню внутри .columns
document.addEventListener('DOMContentLoaded', function() {
    // Функция для расчета высоты подменю
    function calculateSubmenuHeights() {
        const submenus = document.querySelectorAll('.columns ul li ul');
        
        submenus.forEach(submenu => {
            // Сохраняем оригинальные стили
            const originalDisplay = submenu.style.display;
            const originalMaxHeight = submenu.style.maxHeight;
            const originalVisibility = submenu.style.visibility;
            
            // Временно показываем для расчета
            submenu.style.display = 'block';
            submenu.style.maxHeight = 'none';
            submenu.style.visibility = 'hidden';
            submenu.style.position = 'absolute';
            
            // Получаем реальную высоту
            const height = submenu.scrollHeight;
            
            // Сохраняем в dataset
            submenu.dataset.fullHeight = height + 'px';
            
            // Восстанавливаем стили
            submenu.style.display = originalDisplay;
            submenu.style.maxHeight = originalMaxHeight;
            submenu.style.visibility = originalVisibility;
            submenu.style.position = '';
        });
    }
    
    // Функция для открытия подменю
    function openSubmenu(submenu) {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
    }
    
    // Функция для закрытия подменю
    function closeSubmenu(submenu) {
        submenu.style.maxHeight = '0';
    }
    
    // Расчет высот после загрузки
    calculateSubmenuHeights();
    
    // Обработчик кликов
    document.querySelectorAll('.columns ul li > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector('ul');

            if (!submenu) return;

            e.preventDefault();

            if (parentLi.classList.contains('open')) {
                closeSubmenu(submenu);

                setTimeout(() => {
                    parentLi.classList.remove('open');
                }, 300);

            } else {
                parentLi.classList.add('open');
                openSubmenu(submenu);
            }
        });
    });
    
    // Пересчет при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            calculateSubmenuHeights();
            
            // Обновляем высоты открытых меню
            document.querySelectorAll('.columns ul li.open ul').forEach(openSubmenu => {
                openSubmenu.style.maxHeight = openSubmenu.dataset.fullHeight || '500px';
            });
        }, 250);
    });
});



// Закрытие всех открытых пунктов меню при клике вне их
document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.menu-item > li.open').forEach(item => {
            item.classList.remove('open');
        });
        
        document.querySelectorAll('.columns ul li.open').forEach(item => {
            const submenu = item.querySelector('ul');

            if (submenu) {
                submenu.style.maxHeight = '0';
            }

            item.classList.remove('open');
        });
    }
});