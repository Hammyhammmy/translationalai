document.addEventListener('DOMContentLoaded', function () {
    const urologistsContainer = document.getElementById('urologists-container');
    
    if (!urologistsContainer) {
        console.warn('Urologists container not found');
        return;
    }

    // Load urologists from JSON file
    fetch('urologists.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load urologists data');
            }
            return response.json();
        })
        .then(data => {
            if (data.urologists && Array.isArray(data.urologists)) {
                displayUrologists(data.urologists);
            } else {
                throw new Error('Invalid data format');
            }
        })
        .catch(error => {
            console.error('Error loading urologists:', error);
            urologistsContainer.innerHTML = '<p style="color: var(--text-gray);">Unable to load urologist information at this time.</p>';
        });

    function displayUrologists(urologists) {
        // Filter out empty urologists (where name is empty)
        const validUrologists = urologists.filter(u => u.name && u.name.trim() !== '');
        
        if (validUrologists.length === 0) {
            urologistsContainer.innerHTML = '<p style="color: var(--text-gray);">Urologist information will be available soon.</p>';
            return;
        }

        const urologistsHtml = `
            <div class="urologists-grid">
                ${validUrologists.map(urologist => `
                    <div class="urologist-card">
                        ${urologist.image ? `<div class="urologist-image"><img src="${urologist.image}" alt="${urologist.name}" loading="lazy"></div>` : ''}
                        <div class="urologist-info">
                            <h3 class="urologist-name">${escapeHtml(urologist.name)}</h3>
                            ${urologist.title && urologist.title.trim() ? `<p class="urologist-title">${escapeHtml(urologist.title)}</p>` : ''}
                            ${urologist.specialization && urologist.specialization.trim() ? `<p class="urologist-specialization"><strong>Specialization:</strong> ${escapeHtml(urologist.specialization)}</p>` : ''}
                            ${urologist.bio && urologist.bio.trim() ? `<p class="urologist-bio">${escapeHtml(urologist.bio)}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        urologistsContainer.innerHTML = urologistsHtml;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

