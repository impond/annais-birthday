// Array of messages (replace these with your actual messages)
const messages = [
    { date: '2024-10-30', message: 'Bringing amazing people together', format: 'Stream of Consciousness Video' },
    { date: '2024-11-11', message: 'Your curiosity', format: 'Haiku' },
    // Add all your messages here...
    { date: '2025-10-10', message: 'Your playfulness', format: 'Dance Video' }
];

// On October 26th (for testing), show the special message page
function goToMessages() {
    document.getElementById('first-message-container').style.display = 'none';
    document.getElementById('messages-container').style.display = 'block';
    showMessage();
}

// Function to display the current message
function showMessage() {
    const index = getCurrentMessageIndex();
    console.log("Calculated Index:", index); // Log the index for debugging

    if (index < 0 || index >= messages.length) {
        console.error("Invalid index:", index);
        document.getElementById('message-content').textContent = "No message available.";
        return;
    }

    const message = messages[index];
    if (!message) {
        console.error("Message not found for index:", index);
        document.getElementById('message-content').textContent = "No message available.";
        return;
    }

    // Update the message content
    const messageElement = document.getElementById('message-content');
    messageElement.textContent = `${message.message} - Format: ${message.format}`;
}

// Calculate the index based on the current date
function getCurrentMessageIndex() {
    const startDate = new Date(messages[0].date);
    const today = new Date();

    // Ensure that today is not before the start date
    if (today < startDate) {
        console.warn("Today's date is before the start date.");
        return 0; // Default to first message
    }

    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    console.log("Difference in Days:", diffInDays); // Debugging log

    // Calculate the index based on 12-day intervals
    let index = Math.floor(diffInDays / 12);

    // Wrap around using modulo and validate index
    index = index % messages.length;
    return index;
}

// Show the full-screen overlay with previous messages
function showPreviousMessages() {
    const previousMessagesOverlay = document.getElementById('previous-messages-overlay');
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // Clear existing messages

    // Loop through all messages before the current index and add to the list
    const currentIndex = getCurrentMessageIndex();
    for (let i = 0; i < currentIndex; i++) {
        const messageItem = document.createElement('li');
        messageItem.textContent = `${messages[i].message} - ${messages[i].format}`;
        messageItem.onclick = () => {
            document.getElementById('message-content').textContent = `${messages[i].message} - Format: ${messages[i].format}`;
            closePreviousMessages(); // Close the overlay on selecting a message
        };
        messageList.appendChild(messageItem);
    }

    // Show the overlay with a smooth transition
    previousMessagesOverlay.classList.add('show');
}

// Close the previous messages overlay
function closePreviousMessages() {
    const previousMessagesOverlay = document.getElementById('previous-messages-overlay');
    previousMessagesOverlay.classList.remove('show');
}

// On page load, check if today is October 29th (for testing)
window.onload = () => {
    // Simulate loading time for the loader effect
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        const today = new Date();
        const isSpecialDay = today.toISOString().slice(0, 10) === "2024-10-29"; // Switch date to October 29th for testing

        if (isSpecialDay) {
            document.getElementById('first-message-container').style.display = 'block';
            document.getElementById('messages-container').style.display = 'none';
        } else {
            document.getElementById('first-message-container').style.display = 'none';
            document.getElementById('messages-container').style.display = 'block';
            showMessage();
        }
    }, 3000); // Duration of the loading screen (3 seconds for effect)
};