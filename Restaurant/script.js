document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const telegramBotToken = '7837892143:AAF1HeDGBfo-QQFO-eMwabAgOByifRrBQJc';
        const telegramChatId = '6204382478';

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
});


