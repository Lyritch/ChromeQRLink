document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      const qrCodeImg = document.getElementById('qr-code');
      const currentUrl = document.getElementById('current-url');
      const copyTooltip = document.getElementById('copy-tooltip');
      
      // QR kod oluştur
      qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=150x150`;
      
      // URL'yi göster
      currentUrl.textContent = url;

      // QR kodu indirme fonksiyonu
      document.getElementById('download-qr').addEventListener('click', async () => {
        try {
          const response = await fetch(qrCodeImg.src);
          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'qr-code.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          console.error('QR kod indirilirken hata oluştu:', error);
        }
      });

      // URL kopyalama fonksiyonu
      document.getElementById('copy-url').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        } catch (error) {
          console.error('URL kopyalanırken hata oluştu:', error);
        }
      });
    });
    
  });
