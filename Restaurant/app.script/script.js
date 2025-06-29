document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const telegramBotToken = '7880855637:AAF4yVqZ8NSatFdPK6XbPt7MBjkUsKob-Nw';
        const telegramChatId = '2136745360';

        const statusMessage = document.getElementById('statusMessage');

        try {
            const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
                })
            });

            if (response.ok) {
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.className = 'visible success';
            } else {
                throw new Error('Message not sent');
            }
        } catch (error) {
            statusMessage.textContent = 'Failed to send message.';
            statusMessage.className = 'visible error';
        }

        setTimeout(() => {
            statusMessage.className = 'hidden';
        }, 3000);
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });
});

