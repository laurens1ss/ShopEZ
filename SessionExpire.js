let idleTime = 0;
window.onload = resetIdleTime;
document.onmousemove = resetIdleTime;
document.onkeypress = resetIdleTime;

function resetIdleTime() {
    idleTime = 0;
}

setInterval(() => {
    idleTime++;
    if (idleTime >= 30) {  // 30 minutes of inactivity
        alert('Session expired due to inactivity.');
        window.location.href = '/logout';  // Redirect to logout
    }
}, 60000);  // Check every minute
