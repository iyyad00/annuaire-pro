const profiles = [
    {
        name: "Marie Dupont",
        profession: "Architecte",
        category: "architecte",
        description: "Spécialiste en conception de bâtiments écologiques et durables. Passionnée par l'architecture moderne et respectueuse de l'environnement.",
        link: "profil-marie.html"
    },
    {
        name: "Jean Lefebvre",
        profession: "Développeur Python",
        category: "developpeur",
        description: "Expert en applications web et en automatisation de scripts. Spécialisé dans Django, Flask et l'intelligence artificielle.",
        link: "profil-jean.html"
    },
    {
        name: "Sophie Martin",
        profession: "Designer UX/UI",
        category: "design",
        description: "Créatrice d'expériences utilisateur mémorables. Expertise en design d'interfaces mobiles et web avec Figma et Adobe XD.",
        link: "#"
    },
    {
        name: "Thomas Bernard",
        profession: "Consultant Marketing",
        category: "marketing",
        description: "Stratège digital spécialisé en SEO et marketing de contenu. Aide les entreprises à développer leur présence en ligne.",
        link: "#"
    },
    {
        name: "Emma Rousseau",
        profession: "Développeur Full-Stack",
        category: "developpeur",
        description: "Développeuse passionnée par les technologies JavaScript modernes (React, Node.js, Next.js). Création d'applications web performantes.",
        link: "#"
    },
    {
        name: "Lucas Moreau",
        profession: "Architecte d'Intérieur",
        category: "architecte",
        description: "Transformation d'espaces en lieux uniques et fonctionnels. Spécialiste de la rénovation et de l'aménagement sur-mesure.",
        link: "#"
    }
];

let currentFilter = 'tous';
let currentSearch = '';

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function renderProfiles() {
    const grid = document.getElementById('profilesGrid');
    const noResults = document.getElementById('noResults');
    
    const filtered = profiles.filter(profile => {
        const matchesFilter = currentFilter === 'tous' || profile.category === currentFilter;
        const matchesSearch = currentSearch === '' || 
            profile.name.toLowerCase().includes(currentSearch) ||
            profile.profession.toLowerCase().includes(currentSearch) ||
            profile.description.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = filtered.map(profile => `
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-avatar">${getInitials(profile.name)}</div>
                <div class="profile-info">
                    <h3>${profile.name}</h3>
                    <span class="profession-badge">${profile.profession}</span>
                </div>
            </div>
            <p class="profile-description">${profile.description}</p>
            <a href="${profile.link}" class="profile-link">
                Voir le profil complet →
            </a>
        </div>
    `).join('');
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProfiles();
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderProfiles();
});

// Initial render
renderProfiles();
