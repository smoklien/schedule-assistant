document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    // const maxCharacters = 5000;

    // Replace this with dynamic retrieval logic if needed
    // Could be located in LocalStorage or Cache
    const userID = 'exampleUserID';

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const promt = messageInput.value.trim();

        if (!promt) {
            return alert('Please enter a message.');
        }

        // // Should potentially move it to the backend
        // if (promt.length > maxCharacters) {
        //     return alert(`Message is too long (max ${maxCharacters} characters).`);
        // }

        messageInput.value = '';
        addMessageToUI(promt, 'from-user');

        try {
            const reply = await fetchServerResponse(promt, userID);
            addMessageToUI(reply, 'from-server');
        } catch (error) {
            console.error('Error:', error);
            addMessageToUI('Error sending message.', 'from-server');
        }
    });

    function addMessageToUI(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    async function fetchServerResponse(promt, userID) {
        const response = await fetch('/api/messenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promt, userID }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.reply;
    }
});
