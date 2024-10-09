document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const promt = messageInput.value.trim();

        if (promt === '') return;

        messageInput.value = '';

        addMessage(promt, 'from-user');

        await sendMessageToServer(promt);
    });

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    async function sendMessageToServer(promt) {
        try {
            const response = await fetch('/api/messenger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ promt }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            addMessage(data.reply, 'from-server');
        } catch (error) {
            console.error('Error:', error);
            addMessage('Error happened while sending a message.', 'from-server');
        }
    }
});
