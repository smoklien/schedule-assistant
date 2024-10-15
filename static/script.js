const isOnRelease = false;

document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    // I am unsure how should look userId logic 
    //
    // Replace this with dynamic retrieval logic if needed
    // Could be located in LocalStorage or Cache
    const userId =  !isOnRelease ? '670d4ae706063cf7e2d579f1' : getUserId() || 'exampleUserID'; 

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();

        messageInput.value = '';
        addMessageToUI(userMessage, 'from-user');

        try {
            const reply = await fetchServerResponse(userMessage, userId);
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

    async function fetchServerResponse(userMessage, userId) {
        const response = await fetch('/api/messenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage, userId }),
        });

        if (!response.ok) {
            console.log(response);

            throw new Error(`Error fetching server response: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
});
