setTimeout(() => {
    if (confirm('Your session will expire soon. Click OK to stay logged in.')) {
        // Extend session by making an AJAX request to the server
        fetch('/extend-session');
    } else {
        window.location.href = '/logout';
    }
}, 28 * 60 * 1000);  // 28 minutes before the 30-minute timeout
