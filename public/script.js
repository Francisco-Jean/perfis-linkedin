const socket = io(); // Conecta ao servidor WebSocket
const form = document.getElementById('profileForm');
const profilesDiv = document.getElementById('profiles');
const profileNameInput = document.getElementById('profileName');
const charCount = document.getElementById('charCount');

function adjustProfileCardSize(profiles) {
    const profileCards = document.querySelectorAll('.profile-card');
    let sizeClass = 'medium'; // Tamanho padrão

    if (profiles.length > 2) {
        sizeClass = 'small';
    } else if (profiles.length > 1) {
        sizeClass = 'medium';
    } else {
        sizeClass = 'large';
    }

    profileCards.forEach(card => {
        card.classList.remove('small', 'medium', 'large');
        card.classList.add(sizeClass);
    });
}

profileNameInput.addEventListener('input', () => {
    const currentLength = profileNameInput.value.length;
    charCount.textContent = `${currentLength}/18`;
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const linkedinUrl = document.getElementById('linkedinUrl').value;
    const profileName = document.getElementById('profileName').value;

    await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkedinUrl, name: profileName })
    });
    form.reset();
});

socket.on('updateProfiles', (profiles) => {
    profilesDiv.innerHTML = '';
    profiles.forEach(profile => {
        const profileCard = `
            <div class="profile-card">
                <h3>${profile.name}</h3>
                <a href="${profile.url}" target="_blank">
                    <img src="${profile.qrCode}" alt="QR Code">
                </a>
            </div>
        `;
        profilesDiv.innerHTML += profileCard;
    });

    adjustProfileCardSize(profiles);
});
