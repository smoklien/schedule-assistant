document.addEventListener('DOMContentLoaded', () => {
    const messenger = new Messenger();
    messenger.init();
});

class Messenger {
    constructor() {
        this.userId = this.getUserId();
        this.page = 1;
        this.limit = 10;

        // Cache DOM elements
        this.messageForm = document.getElementById('messageForm');
        this.messageInput = document.getElementById('messageInput');
        this.messagesDiv = document.getElementById('messages');
        this.loadMoreButton = document.getElementById('loadMore');
        this.deleteHistoryButton = document.getElementById('deleteHistory');
    }

    init() {
        this.loadChatHistory(this.limit, this.page);

        this.messageForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.loadMoreButton.addEventListener('click', () => this.handleLoadMore());
        this.deleteHistoryButton.addEventListener('click', () => this.handleDeleteHistory());
    }

    getUserId() {
        let userId = localStorage.getItem('userId');

        if (!userId) {
            // Replace with dynamic generation logic
            userId = '670d4ae706063cf7e2d579f1';
            localStorage.setItem('userId', userId);
        }

        return userId;
    }

    appendMessageToUI(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;

        this.messagesDiv.appendChild(messageElement);
        this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
    }

    prependMessagesToUI(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;

        const currentScrollHeight = this.messagesDiv.scrollHeight;
        this.messagesDiv.insertBefore(messageElement, this.loadMoreButton.nextSibling);

        this.messagesDiv.scrollTop += this.messagesDiv.scrollHeight - currentScrollHeight;
    }

    async fetchServerResponse(userMessage) {
        const response = await fetch('/api/messenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage, userId: this.userId }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching server response: ${response.statusText}`);
        }

        return response.json();
    }

    async fetchOlderMessages(limit, page) {
        const response = await fetch(`/api/messenger/?userId=${this.userId}&limit=${this.limit}&page=${this.page}`);

        if (!response.ok) {
            throw new Error(`Error loading chat history: ${response.statusText}`);
        }

        return response.json();
    }

    async deleteChatHistory() {
        const response = await fetch(`/api/messenger/delete/${this.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting chat history: ${response.statusText}`);
        }

        return response.json();
    }

    async loadChatHistory(limit, page) {
        try {
            const data = await this.fetchOlderMessages(limit, page);
            const { dialogs } = data;

            dialogs.forEach(message => {
                this.prependMessagesToUI(message.llmReply, 'from-server');
                this.prependMessagesToUI(message.userMessage, 'from-user');
            });
        } catch (e) {
            console.error('Error loading chat history:', e);
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const userMessage = this.messageInput.value.trim();

        if (!userMessage) {
            return;
        }

        this.messageInput.value = '';
        this.appendMessageToUI(userMessage, 'from-user');

        try {
            const { llmReply } = await this.fetchServerResponse(userMessage);
            this.appendMessageToUI(llmReply, 'from-server');
        } catch (error) {
            console.error('Error fetching server response:', error);
            this.appendMessageToUI('Error fetching server response.', 'from-server');
        }
    }

    handleLoadMore() {
        this.page++;
        this.loadChatHistory(this.limit, this.page);
    }

    handleDeleteHistory() {
        this.messagesDiv.innerHTML = '';
        this.deleteChatHistory();
    }
}
