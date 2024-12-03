if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    });
}


// Push Notification Feature
if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Welcome to PWA!', {
                    body: 'Thanks for enabling notifications.',
                    icon: '/images/icons/icon-192x192.png'
                });
            });
        }
    });
}
