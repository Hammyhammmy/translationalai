(function () {
    function forceFullWidth() {
        const container = document.querySelector('.container');
        if (!container) return;
        let parent = container.parentElement;
        while (parent && parent !== document.body) {
            const computedStyle = window.getComputedStyle(parent);
            const maxWidth = computedStyle.maxWidth;
            if (maxWidth && maxWidth !== 'none' && maxWidth !== '100%') {
                parent.style.setProperty('max-width', '100%', 'important');
                parent.style.setProperty('width', '100%', 'important');
            }
            parent = parent.parentElement;
        }
        container.style.setProperty('max-width', '100%', 'important');
        container.style.setProperty('width', '100%', 'important');
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceFullWidth);
    } else {
        forceFullWidth();
    }
})();
