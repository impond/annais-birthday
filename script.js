$(document).ready(function() {
    // Define the special date for Annais' birthday and message interval in days
    const specialDate = new Date(2024, 9, 29); // October 29, 2024 (0-based month index)
    const intervalDays = 12;

    // Array of appreciation messages
    const messages = [
        { title: "Bringing amazing people together", format: "Stream of Consciousness Video", body: "You have a unique gift for creating connections between people who share values and dreams. I admire how you effortlessly build bonds that last." },
        { title: "Your curiosity", format: "Haiku", body: "Your endless curiosity inspires me every day. The way you dive into new subjects and seek to understand the world around you is truly remarkable." },
        { title: "Your playfulness", format: "Dance Video", body: "Your playful spirit brings joy and lightness to our lives. It's one of the things I love most about you—how you can turn even the smallest moments into laughter." },
        // Add more messages here as needed...
    ];

    // Terminal initialization
    const term = $('#terminal').terminal(function(command) {
        const cmd = command.trim().toLowerCase();

        if (cmd === 'help') {
            this.echo("Available commands:");
            this.echo(" - help: Show available commands");
            this.echo(" - clear: Clear the terminal window");
            this.echo(" - hello: Display a greeting message");
            this.echo(" - current: Show the latest appreciation message");
            this.echo(" - showprevious: Show all available messages until today");
            this.echo(" - goto [message title]: Load a previous message by its title");
        } else if (cmd === 'hello') {
            this.echo("Hello, my love! I hope your appreciation box brings you joy.");
        } else if (cmd === 'clear') {
            this.clear();
        } else if (cmd === 'current') {
            showCurrentMessage(this);
        } else if (cmd === 'showprevious') {
            showPreviousMessages(this);
        } else if (cmd.startsWith('goto ')) {
            const title = command.slice(5).trim();
            gotoMessage(this, title);
        } else if (isSpecialDay()) {
            displaySpecialMessage(this);
        } else {
            this.echo(`Unknown command: ${command}`);
        }
    }, {
        greetings: getGreetingMessage(),
        prompt: '> ',
    });

    // Function to check if today is the special day
    function isSpecialDay() {
        const today = new Date();
        return today.getFullYear() === specialDate.getFullYear() &&
               today.getMonth() === specialDate.getMonth() &&
               today.getDate() === specialDate.getDate();
    }

    // Function to display the special birthday message
    function displaySpecialMessage(terminal) {
        terminal.echo("Today marks a special milestone, Annais!");
        terminal.echo("Over the next year, you'll receive 30 messages,");
        terminal.echo("each one reflecting a different thing I love about you.");
        terminal.echo("These 30 messages are a celebration of your 30th birthday and all that makes you special.");
        terminal.echo("\nType 'help' to see more commands.");
    }

    // ASCII Art for the welcome greeting
    function getGreetingMessage() {
        return `
     _                      _     _      _                              _       _   _               ____            
    / \\   _ __  _ __   __ _(_)___( )    / \\   _ __  _ __  _ __ ___  ___(_) __ _| |_(_) ___  _ __   | __ )  _____  __
   / _ \\ | '_ \\| '_ \\ / _\` | / __|/    / _ \\ | '_ \\| '_ \\| '__/ _ \\/ __| |/ _\` | __| |/ _ \\| '_ \\  |  _ \\ / _ \\ \\/ /
  / ___ \\| | | | | | | (_| | \\__ \\    / ___ \\| |_) | |_) | | |  __/ (__| | (_| | |_| | (_) | | | | | |_) | (_) >  < 
 /_/   \\_\\_| |_|_| |_|\\__,_|_|___/   /_/   \\_\\ .__/| .__/|_|  \\___|\\___|_|\\__,_|\\__|_|\\___/|_| |_| |____/ \\___/_/\\_\\
                                             |_|   |_|                                                              
        `;
    }

    // Function to calculate the latest message index based on the interval
    function getLatestMessageIndex() {
        const today = new Date();
        const diffInDays = Math.floor((today - specialDate) / (1000 * 60 * 60 * 24));
        return Math.floor(diffInDays / intervalDays);
    }

    // Function to show the latest message
    function showCurrentMessage(terminal) {
        const index = getLatestMessageIndex();
        if (index < 0 || index >= messages.length) {
            terminal.echo("No messages available yet.");
            return;
        }

        const message = messages[index];
        terminal.echo(`Title: ${message.title}`);
        terminal.echo(`Format: ${message.format}`);
        terminal.echo(`\n${message.body}`);
    }

    // Function to show all previous messages up to today
    function showPreviousMessages(terminal) {
        const latestIndex = getLatestMessageIndex();
        if (latestIndex < 0) {
            terminal.echo("No previous messages available yet.");
            return;
        }

        terminal.echo("Available messages:");
        for (let i = 0; i <= latestIndex && i < messages.length; i++) {
            terminal.echo(`- ${messages[i].title}`);
        }
    }

    // Function to go to a specific message by title
    function gotoMessage(terminal, title) {
        const message = messages.find(msg => msg.title.toLowerCase() === title.toLowerCase());
        if (!message) {
            terminal.error("Message not found.");
            return;
        }

        terminal.echo(`Title: ${message.title}`);
        terminal.echo(`Format: ${message.format}`);
        terminal.echo(`\n${message.body}`);
    }

    // Initial special message check
    if (isSpecialDay()) {
        term.echo("Today is a special day, Annais. Type any command to get started.");
    }
});