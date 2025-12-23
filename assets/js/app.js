/**
 * SuratBunga App Logic
 */

// ==========================================
// KONFIGURASI PERSONAL (Ubah Di Sini)
// ==========================================
const CONFIG = {
    // Foto & Wallpaper
    wallpaper: "assets/img/wallpaper.png", // Wallpaper background
    profilePhoto: "assets/img/profil.png",  // Foto profil (tanpa background)

    // Musik (Taruh file Lagu.mp3 di folder SuratBunga/)
    musicUrl: "assets/music/Lagu.mp3", // Ganti nama file sesuai lagu kamu

    // Firebase Config
    firebase: {
        apiKey: "AIzaSyBXPHZqgRLj8CJ9oxVwDUBJVTzI8NnYUtU",
        authDomain: "sahabat-nanad.firebaseapp.com",
        databaseURL: "https://sahabat-nanad-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "sahabat-nanad",
        storageBucket: "sahabat-nanad.firebasestorage.app",
        messagingSenderId: "687349638894",
        appId: "1:687349638894:web:08f93e766424717acdb5ff"
    }
};

// --- Apply Configurations ---
document.getElementById('intro-wallpaper').src = CONFIG.wallpaper;
document.getElementById('small-photo').src = CONFIG.profilePhoto;
document.querySelector('#bg-music source').src = CONFIG.musicUrl;
document.getElementById('bg-music').load(); // Reload audio source

// --- Firebase Init ---
const isConfigured = CONFIG.firebase.apiKey !== "YOUR_API_KEY_HERE";
if (isConfigured) firebase.initializeApp(CONFIG.firebase);

let database, messagesRef;
if (isConfigured) {
    database = firebase.database();
    messagesRef = database.ref('messages');
}

// --- Random Flower Colors (15 Beautiful Variations) ---
const flowerColorSets = [
    // Pastel & Soft
    { primary: '#a7ffee', secondary: '#54b8aa', glow: '#6bf0ff', name: 'Cyan' },
    { primary: '#ffb3d9', secondary: '#ff69b4', glow: '#ff91c7', name: 'Pink' },
    { primary: '#ffe066', secondary: '#ffcc00', glow: '#ffd633', name: 'Yellow' },
    { primary: '#c4b5fd', secondary: '#a78bfa', glow: '#ddd6fe', name: 'Lavender' },
    { primary: '#fca5a5', secondary: '#f87171', glow: '#fecaca', name: 'Coral' },
    { primary: '#86efac', secondary: '#4ade80', glow: '#bbf7d0', name: 'Mint' },
    { primary: '#93c5fd', secondary: '#60a5fa', glow: '#bfdbfe', name: 'Sky Blue' },
    { primary: '#fdba74', secondary: '#fb923c', glow: '#fed7aa', name: 'Peach' },

    // Vibrant & Bold
    { primary: '#f472b6', secondary: '#ec4899', glow: '#f9a8d4', name: 'Hot Pink' },
    { primary: '#a78bfa', secondary: '#8b5cf6', glow: '#c4b5fd', name: 'Purple' },
    { primary: '#fb7185', secondary: '#f43f5e', glow: '#fda4af', name: 'Rose' },
    { primary: '#34d399', secondary: '#10b981', glow: '#6ee7b7', name: 'Emerald' },
    { primary: '#38bdf8', secondary: '#0ea5e9', glow: '#7dd3fc', name: 'Ocean' },

    // Elegant & Unique
    { primary: '#fbbf24', secondary: '#f59e0b', glow: '#fcd34d', name: 'Gold' },
    { primary: '#e879f9', secondary: '#d946ef', glow: '#f0abfc', name: 'Magenta' },
];

function applyRandomFlowerColors() {
    const colorSet = flowerColorSets[Math.floor(Math.random() * flowerColorSets.length)];

    // Apply dynamic CSS
    const style = document.createElement('style');
    style.id = 'flower-colors';
    style.textContent = `
        .flower__leaf {
            background-color: ${colorSet.primary} !important;
            background-image: linear-gradient(to top, ${colorSet.secondary}, ${colorSet.primary}) !important;
        }
        .flower__leafs::after {
            background-color: ${colorSet.glow} !important;
        }
        .flower__white-circle {
            background: radial-gradient(${colorSet.primary}, ${colorSet.secondary} 60%) !important;
        }
        .flower__light {
            background-color: ${colorSet.glow} !important;
        }
    `;
    document.head.appendChild(style);

    console.log('🌸 Flower color:', colorSet.name);
}

// Apply random colors on page load
applyRandomFlowerColors();

// --- App Flow Control ---

// 1. Initial State: Overlay visible, everything else hidden

// 2. Start Button: Fade transition, play music, show intro
document.getElementById('start-overlay').addEventListener('click', function () {
    // Play Music
    const audio = document.getElementById('bg-music');
    audio.play().then(() => {
        console.log("Music Playing");
    }).catch(e => console.log("Audio play failed:", e));

    // Smooth fade out overlay
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
    }, 1500); // Match transition duration
});

// 3. Gift Click -> Show FLOWERS first, then Popups
window.startPopUpSequence = async function () {
    // Hide Intro Layer smoothly
    const introLayer = document.getElementById('intro-layer');
    introLayer.style.opacity = '0';

    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, 1000));
    introLayer.style.display = 'none';

    // STEP 1: Show Flowers FIRST
    revealFlowers();

    // STEP 2: Wait 6 seconds for user to enjoy flowers
    await new Promise(resolve => setTimeout(resolve, 6000));

    // STEP 3: Run Popup Sequence
    await runPopups();

    // STEP 4: After popups, just show flowers with save button
    showSaveOption();
};

function revealFlowers() {
    const flowerContainer = document.getElementById('flower-container');

    // Show flowers
    flowerContainer.style.display = 'block';
    void flowerContainer.offsetWidth; // Trigger reflow
    flowerContainer.style.opacity = '1';

    // Start flower animations
    document.body.classList.remove("not-loaded");
}

async function runPopups() {
    const steps = [
        { title: "Hari buruk mungkin akan datang", img: "Zee Ketusuk.jpg" },
        { title: "Kalau hari itu datang, sini yah kita masi roblox lagi", img: "Zee Ketusuk.jpg" },
        { title: "wkwk liat zee ke gantung", img: "Zee Ketusuk.jpg" },
        { title: "aku turu karena kim si killer brutal jahat", img: "Aku Turu.jpg" },
        { title: "Main horor bareng", img: "Horror Bareng.jpg" },
        { title: "dan masih banyak hal seru lainya..", img: "Di Planet lain.png" },
        { title: "Some people said, people come and go..", img: "Di Planet lain.png" },
        { title: "but for us..", img: "Cute Face.jpg" },
        { title: "go back yah..", img: "Di Planet lain.png" },
    ];

    for (const step of steps) {
        await Swal.fire({
            title: step.title,
            imageUrl: 'assets/img/' + step.img,
            imageWidth: 280,
            imageHeight: 180,
            imageAlt: 'Memory',
            confirmButtonText: 'Lanjut →',
            confirmButtonColor: '#ff4757',
            background: 'rgba(20, 20, 40, 0.95)',
            color: '#fff',
            allowOutsideClick: false
        });
    }

    // After all popups, show guestbook
    await showGuestbook();
}

// Guestbook Popup
async function showGuestbook() {
    // First, load existing messages
    let messagesHtml = await loadGuestbookMessages();

    const result = await Swal.fire({
        title: '💌 tulis apapun',
        html: `
            <div style="max-height: 200px; overflow-y: auto; margin-bottom: 15px; text-align: left; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                <p style="font-size: 0.8em; color: #aaa; margin-bottom: 10px;">Pesan dari teman-teman:</p>
                ${messagesHtml}
            </div>
            <input type="text" id="swal-name" class="swal2-input" placeholder="Nama kamu" maxlength="20" style="font-size: 0.9em;">
            <textarea id="swal-message" class="swal2-textarea" placeholder="Tulis pesan atau harapanmu..." maxlength="140" style="font-size: 0.9em;"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: '✨ Kirim Pesan',
        cancelButtonText: 'Lewati →',
        confirmButtonColor: '#ff4757',
        cancelButtonColor: '#666',
        background: 'rgba(20, 20, 40, 0.95)',
        color: '#fff',
        allowOutsideClick: false,
        preConfirm: () => {
            const name = document.getElementById('swal-name').value.trim();
            const message = document.getElementById('swal-message').value.trim();
            if (!name || !message) {
                Swal.showValidationMessage('Isi nama dan pesan ya!');
                return false;
            }
            return { name, message };
        }
    });

    if (result.isConfirmed && result.value) {
        await saveGuestbookMessage(result.value.name, result.value.message);
        await Swal.fire({
            title: 'Terkirim! 💕',
            text: 'Makasih udah nulis pesan~',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: 'rgba(20, 20, 40, 0.95)',
            color: '#fff'
        });
    }
}

// Load messages from Firebase
async function loadGuestbookMessages() {
    if (!isConfigured) {
        return '<div style="color: #888; font-size: 0.8em;">Belum ada pesan (Firebase belum dikonfigurasi)</div>';
    }

    try {
        const snapshot = await messagesRef.orderByChild('timestamp').limitToLast(10).once('value');
        const messages = [];
        snapshot.forEach(child => {
            messages.push(child.val());
        });

        if (messages.length === 0) {
            return '<div style="color: #888; font-size: 0.8em;">Jadilah yang pertama menulis! ✨</div>';
        }

        return messages.reverse().map(m => `
            <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75em; color: #aaa; margin-bottom: 4px;">
                    <span style="color: #ffcad4; font-weight: bold;">${escapeHtml(m.name)}</span>
                    <span>${formatTime(m.timestamp)}</span>
                </div>
                <div style="font-size: 0.85em; color: #f0f0f0;">${escapeHtml(m.text)}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading messages:', error);
        return '<div style="color: #888; font-size: 0.8em;">Gagal memuat pesan</div>';
    }
}

// Save message to Firebase
async function saveGuestbookMessage(name, text) {
    if (!isConfigured) {
        console.log('Demo mode - message not saved');
        return;
    }

    try {
        await messagesRef.push({
            name: escapeHtml(name),
            text: escapeHtml(text),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    } catch (error) {
        console.error('Error saving message:', error);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function formatTime(timestamp) {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showSaveOption() {
    // Show simple UI with just save button
    const uiLayer = document.getElementById('ui-layer');
    uiLayer.style.display = 'flex';
    void uiLayer.offsetWidth;
    uiLayer.style.opacity = '1';
}


// --- Capture Screenshot ---
document.getElementById('capture-btn').addEventListener('click', () => {
    const captureBtn = document.getElementById('capture-btn');
    const viewBtn = document.getElementById('view-messages-btn');
    captureBtn.style.visibility = 'hidden';
    if (viewBtn) viewBtn.style.visibility = 'hidden';

    html2canvas(document.body, {
        backgroundColor: '#000',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        captureBtn.style.visibility = 'visible';
        if (viewBtn) viewBtn.style.visibility = 'visible';
        const link = document.createElement('a');
        link.download = `SuratBunga-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

// --- View All Messages ---
document.getElementById('view-messages-btn').addEventListener('click', async () => {
    let messagesHtml = '<div style="color: #888;">Memuat pesan...</div>';

    if (isConfigured) {
        try {
            const snapshot = await messagesRef.orderByChild('timestamp').limitToLast(50).once('value');
            const messages = [];
            snapshot.forEach(child => {
                messages.push(child.val());
            });

            if (messages.length === 0) {
                messagesHtml = '<div style="text-align: center; padding: 20px; color: #aaa;">Belum ada pesan 💭</div>';
            } else {
                messagesHtml = messages.reverse().map(m => `
                    <div style="background: rgba(255,255,255,0.08); padding: 12px 15px; border-radius: 12px; margin-bottom: 10px; border-left: 3px solid #ff4757;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.8em; color: #aaa; margin-bottom: 6px;">
                            <span style="color: #ffcad4; font-weight: bold;">💕 ${escapeHtml(m.name)}</span>
                            <span>${formatTime(m.timestamp)}</span>
                        </div>
                        <div style="font-size: 0.95em; color: #f0f0f0; line-height: 1.4;">${escapeHtml(m.text)}</div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            messagesHtml = '<div style="color: #f87171;">Gagal memuat pesan 😢</div>';
        }
    } else {
        messagesHtml = '<div style="text-align: center; padding: 20px; color: #aaa;">Firebase belum dikonfigurasi</div>';
    }

    await Swal.fire({
        title: '💌 Pesan dari Teman-Teman',
        html: `
            <div style="max-height: 400px; overflow-y: auto; text-align: left; padding: 5px;">
                ${messagesHtml}
            </div>
        `,
        confirmButtonText: 'Tutup ✨',
        confirmButtonColor: '#ff4757',
        background: 'rgba(20, 20, 40, 0.95)',
        color: '#fff',
        width: '90%',
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        }
    });
});

