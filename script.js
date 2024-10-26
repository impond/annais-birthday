// JavaScript to handle dynamic message display

// Array of messages (replace these with your actual messages)
const messages = [
    { date: '2024-10-30', message: 'Bringing amazing people together', format: 'Stream of Consciousness Video' },
    { date: '2024-11-11', message: 'Your curiosity', format: 'Haiku' },
    // Add all your messages here...
    { date: '2025-10-10', message: 'Your playfulness', format: 'Dance Video' }
];

// Helper function to calculate the current message index based on today's date
function getCurrentMessageIndex() {
    const startDate = new Date(messages[0].date);  // First message date
    const today = new Date();
    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    // Calculate the index based on 12-day intervals and wrap around using modulo
    return Math.floor(diffInDays / 12) % messages.length;
}

// Function to display the current message
function showMessage() {
    const index = getCurrentMessageIndex();
    const messageElement = document.getElementById('message-content');
    const message = messages[index];

    // Display message content
    messageElement.textContent = `${message.message} - Format: ${message.format}`;
}

// Show message on page load
window.onload = showMessage;