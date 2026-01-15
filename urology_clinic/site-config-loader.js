document.addEventListener('DOMContentLoaded', function () {
    // Load site configuration from single source of truth
    fetch('site-config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load site configuration');
            }
            return response.json();
        })
        .then(config => {
            applySiteConfig(config);
        })
        .catch(error => {
            console.warn('Error loading site config:', error);
            // Fallback to default if config fails to load
            applySiteConfig({ location: 'Toronto', clinicName: 'Rapid Toronto Urology' });
        });

    function applySiteConfig(config) {
        // Update any elements with class 'location-placeholder' (for future use)
        document.querySelectorAll('.location-placeholder').forEach(element => {
            element.textContent = config.location;
        });

        // Update any elements with data-location attribute (for future use)
        document.querySelectorAll('[data-location]').forEach(element => {
            const originalText = element.getAttribute('data-original') || element.textContent;
            element.setAttribute('data-original', originalText);
            element.textContent = originalText.replace('{{LOCATION}}', config.location);
        });

        // Ensure meta description includes location if it exists
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && !metaDescription.content.includes(config.location)) {
            // Only update if it mentions urology but not the location
            if (metaDescription.content.toLowerCase().includes('urology')) {
                metaDescription.content = metaDescription.content.replace(
                    /(urology)/i,
                    config.location + ' $1'
                );
            }
        }
    }
});

