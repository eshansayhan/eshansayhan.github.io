// BURAYA GOOGLE APPS SCRIPT WEB APP URL'NİZİ YAPIŞTIRACAKSINIZ
const GOOGLE_SCRIPT_URL = "BURAYA_URL_GELECEK";

document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (GOOGLE_SCRIPT_URL === "BURAYA_URL_GELECEK") {
        showStatus('Lütfen app.js dosyasına Google Apps Script URL\'sini ekleyin.', 'error');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const name = document.getElementById('name').value;
    const website = document.getElementById('website').value;
    const comment = document.getElementById('comment').value;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    showStatus('', '');

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            // Google Apps Script requires no-cors sometimes, but to read response we might need proper CORS setup in GAS.
            // Using text/plain prevents preflight requests and makes GAS happy for simple POSTs
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                name: name,
                website: website,
                comment: comment
            })
        });

        if (response.ok) {
            showStatus('Yorumunuz alındı! Profiliniz 1-3 dakika içinde oluşturulacak. Lütfen daha sonra sayfayı yenileyin.', 'success');
            document.getElementById('commentForm').reset();
        } else {
            throw new Error('Ağ hatası');
        }
    } catch (error) {
        showStatus('Bir hata oluştu: ' + error.message, 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = 'status-message';
    if (type) {
        statusEl.classList.add(type);
    }
}
