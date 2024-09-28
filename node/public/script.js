document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text === '') return;

        // Додавання повідомлення користувача до інтерфейсу
        addMessage(text, 'user');

        // Очищення поля вводу
        messageInput.value = '';

        try {
            // Відправка POST-запиту до бекенду
            const response = await fetch('/api/messager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Помилка: ${response.statusText}`);
            }

            const data = await response.json();

            // Додавання відповіді сервера до інтерфейсу
            addMessage(data.reply, 'server');
        } catch (error) {
            console.error('Error:', error);
            addMessage('Сталася помилка при відправці повідомлення.', 'server');
        }
    });

    // Функція для додавання повідомлень до інтерфейсу
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});
