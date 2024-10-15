const isOnRelease = false;

document.addEventListener('DOMContentLoaded', async () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    // I am unsure how should look userId logic 
    //
    // Replace this with dynamic retrieval logic if needed
    // Could be located in LocalStorage or Cache
    const userId = !isOnRelease ? '670d4ae706063cf7e2d579f1' : foo() || 'exampleUserID';

    const addMessageToUI = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    const fetchServerResponse = async (userMessage, userId) => {
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
        return data;
    }

    const fetchUserHistory = async (userId) => {
        const response = await fetch(`/api/messenger/history?userId=${userId}`);
    
        if (!response.ok) {
            throw new Error(`Error loading chat history: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
    }

    // Load chat history on page load
    try {
        const history = await fetchUserHistory(userId);
        history.forEach(message => {
            addMessageToUI(message.userMessage, 'from-user');
            addMessageToUI(message.llmReply, 'from-server');
        });
    } catch (error) {
        console.error('Error loading chat history:', error);
    }

    // Form submission logic
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();

        if (!userMessage) return;

        messageInput.value = '';
        addMessageToUI(userMessage, 'from-user');

        try {
            const reply = await fetchServerResponse(userMessage, userId);
            addMessageToUI(reply, 'from-server');
        } catch (error) {
            console.error('Error:', error);
            addMessageToUI('Error fetching server response.', 'from-server');
        }
    });
});
