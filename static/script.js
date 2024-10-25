// I am unsure how should look userId logic 
//
// Replace this with dynamic retrieval logic if needed
// Could be located in LocalStorage or Cache
const userId = '670d4ae706063cf7e2d579f1';

let page = 1;
const limit = 10;

document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    const loadMoreButton = document.getElementById('loadMore');
    const deleteHistoryButton = document.getElementById('deleteHistory');


    const appendMessageToUI = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;

        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    const prependMessagesToUI = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;

        const currentScrollHeight = messagesDiv.scrollHeight;
        messagesDiv.insertBefore(messageElement, loadMoreButton.nextSibling);

        messagesDiv.scrollTop += messagesDiv.scrollHeight - currentScrollHeight;
    }

    const fetchServerResponse = async (userMessage) => {
        const response = await fetch('/api/messenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage, userId }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching server response: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    }

    const fetchOlderMessages = async (limit, page) => {
        const response = await fetch(`/api/messenger/?userId=${userId}&limit=${limit}&page=${page}`);

        if (!response.ok) {
            throw new Error(`Error loading chat history: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    }

    const deleteChatHistory = async () => {
        const response = await fetch(`/api/messenger/delete/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting chat history: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    }

    const loadChatHistory = async (limit, page) => {
        try {
            const data = await fetchOlderMessages(limit, page);
            const { dialogs } = data;

            dialogs.forEach(message => {
                prependMessagesToUI(message.llmReply, 'from-server');
                prependMessagesToUI(message.userMessage, 'from-user');
            });
        } catch (e) {
            console.error('Error loading chat history:', e);
        }
    }

    // Load chat history on page load
    loadChatHistory(limit, page);

    // Form submission logic
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userMessage = messageInput.value.trim();

        if (!userMessage) {
            return;
        }

        messageInput.value = '';

        appendMessageToUI(userMessage, 'from-user');

        try {
            const { llmReply } = await fetchServerResponse(userMessage);
            appendMessageToUI(llmReply, 'from-server');
        } catch (error) {
            console.error('Error fetching server response:', error);
            appendMessageToUI('Error fetching server response.', 'from-server');
        }
    });

    // Loading older messages logic
    loadMoreButton.addEventListener('click', () => {
        page++;
        loadChatHistory(limit, page);
    })

    deleteHistoryButton.addEventListener('click', () => {
        messagesDiv.innerHTML = '';
        
        // eslint-disable-next-line no-unused-vars
        const data = deleteChatHistory();
    });
});
