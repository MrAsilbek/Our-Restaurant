document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const addressLine1 = document.getElementById('address-line1').value;
    const addressLine2 = document.getElementById('address-line2').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const quantity = document.getElementById('quantity').value;

    const message = `
        Ism: ${name}
        Telefon raqam: ${phone}
        Email: ${email}
        Manzil: ${addressLine1}, ${addressLine2}, ${city}, ${postalCode}
        Miqdor: ${quantity}
    `;

    const telegramBotToken = '7880855637:AAF4yVqZ8NSatFdPK6XbPt7MBjkUsKob-Nw';
    const telegramChatId = '2136745360';
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Buyurtmangiz qabul qilindi!');
        } else {
            alert('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    });
});