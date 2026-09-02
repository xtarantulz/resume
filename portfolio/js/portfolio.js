document.addEventListener("DOMContentLoaded", function () {
    const portfolioContainer = document.getElementById("portfolio-container");

    if (portfolioContainer) {
        // Визначаємо мову на основі імені файлу сторінки (наприклад, ua.html -> ua)
        const path = window.location.pathname;
        let lang = 'uk'; // за замовчуванням українська

        if (path.includes('ru.html')) {
            lang = 'ru';
        } else if (path.includes('en.html')) {
            lang = 'en';
        }

        // Динамічний шлях до файлу портфоліо залежно від мови
        const fetchUrl = `../blocks/${lang}/portfolio.html`;

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не вдалося завантажити файл портфоліо');
                }
                return response.text();
            })
            .then(html => {
                // Виправляємо шляхи до картинок, оскільки сторінка в папці /portfolio/
                const fixedHtml = html
                    .replace(/src="img\//g, 'src="../img/')
                    .replace(/href="img\//g, 'href="../img/');

                // Вставляємо виправлений HTML у контейнер
                portfolioContainer.innerHTML = fixedHtml;

                // Ініціалізуємо слайдери та Fancybox
                initPortfolioFeatures();
            })
            .catch(error => {
                console.error('Помилка:', error);
                portfolioContainer.innerHTML = '<p>Помилка завантаження портфоліо.</p>';
            });
    }
});

function initPortfolioFeatures() {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {});
    }

    const sliders = document.querySelectorAll(".portfolio-slider");

    sliders.forEach(slider => {
        const images = slider.querySelectorAll("a");
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? "block" : "none";
            });
        }

        showImage(currentIndex);

        if (prevBtn && nextBtn && images.length > 0) {
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });

            prevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });
        }
    });
}