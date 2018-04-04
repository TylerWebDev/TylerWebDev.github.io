(() => {
    document.querySelector('.js-scroll-down-button')
        .addEventListener(
            'click',
            () => {
                window.scroll({
                    top: window.innerHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        );
})();
