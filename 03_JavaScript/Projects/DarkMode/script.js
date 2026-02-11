const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// 1. Check LocalStorage on Load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.getElementById('mode-label').textContent = 'Dark Mode On';
    }
}

// 2. Switch Theme Function
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('mode-label').textContent = 'Dark Mode On';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.getElementById('mode-label').textContent = 'Enable Dark Mode!';
    }
}

// 3. Add Event Listener
toggleSwitch.addEventListener('change', switchTheme, false);
