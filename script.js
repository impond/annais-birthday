$(document).ready(function() {
    // Define the special date for Annai's birthday and message interval in days
    const specialDate = new Date(2024, 9, 29); // October 29, 2024 (0-based month index)
    const intervalDays = 12;

    // Array of appreciation messages with media
    const messages = [
        {
            title: "Your drive to bring amazing people together",
            format: "Stream of Consciousness Video",
            body: "You have a unique gift for creating connections between people who share values and dreams. I admire how you effortlessly build bonds that last. Like the time you brought this group to Costa Rica for your birthday, creating not just a trip, but an experience of a lifetime. You inspire people to connect deeply, share openly, and create memories that stay with them forever.",
            media: "media/1.gif" // Path to image file
        },
        {
            title: "Your curiosity",
            format: "Haiku",
            body: "Your endless curiosity inspires me every day. The way you dive into new subjects and seek to understand the world around you is truly remarkable.",
            media: null // No media for this message
        },
        {
            title: "Your playfulness",
            format: "Dance Video",
            body: "Your playful spirit brings joy and lightness to our lives. It's one of the things I love most about you—how you can turn even the smallest moments into laughter.",
            media: "media/dance_video.mp4" // Path to video file
        },
        // Additional messages...
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
            this.echo(" - previous: Show all available messages until today");
            this.echo(" - goto [message title]: Load a previous message by its title");
        } else if (cmd === 'hello') {
            this.echo("Hello, my love! I hope your appreciation box brings you joy and makes you feel loved.");
        } else if (cmd === 'clear') {
            this.clear();
        } else if (cmd === 'current') {
            showCurrentMessage(this);
        } else if (cmd === 'previous') {
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

    // Ensure terminal input is focused when the user clicks or touches anywhere on the terminal container
    $('#terminal').on('click touchstart', function() {
        term.focus();
    });

    // Focus the terminal input on load (for mobile devices)
    setTimeout(function() {
        term.focus();
    }, 100); // Delay slightly to allow the page to load completely

    // Ensure the terminal input gets focused again on any interaction or input
    $(window).on('resize orientationchange', function() {
        term.focus();
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
        terminal.echo("Happy birthday, my love!");
        terminal.echo("As a present, I want to gift you conscious appreciation.");
        terminal.echo("Over the next year, you'll receive 30 messages in 30 different formats,");
        terminal.echo("each one reflecting a different thing I love and appreciate about you.");
        terminal.echo("These 30 messages are a celebration of you, your 30th birthday, and all that makes you special.");
        terminal.echo("\nType 'help' to see more commands.");

        // Add the ASCII art
        terminal.echo(`
           )
          (.)
          .|.
          l8J
          | |
      _.--| |--._
   .-';  ;\`-'& ; \`&.
  & &  ;  &   ; ;   \\
  \\      ;    &   &_/
   F"""---...---"""J
   | | | | | | | | |
   J | | | | | | | F
    \`---.|.|.|.---'
        `);
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
                                                                                                            v1.0.2` ;
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

        // Display media if available
        if (message.media) {
            if (message.media.endsWith(".mp4")) {
                // Display video
                terminal.echo(
                    `<div style="text-align: center;">
                        <video controls style="max-width: 80%; margin: 10px auto;">
                            <source src="${message.media}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>`,
                    { raw: true }
                );
            } else {
                // Display image
                terminal.echo(`<img src="${message.media}" style="max-width: 80%; display: block; margin: 10px auto;">`, { raw: true });
            }
        }
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

        // Display media if available
        if (message.media) {
            if (message.media.endsWith(".mp4")) {
                // Display video
                terminal.echo(
                    `<div style="text-align: center;">
                        <video controls style="max-width: 80%; margin: 10px auto;">
                            <source src="${message.media}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>`,
                    { raw: true }
                );
            } else {
                // Display image
                terminal.echo(`<img src="${message.media}" style="max-width: 80%; display: block; margin: 10px auto;">`, { raw: true });
            }
        }
    }

    // Initial special message check
    if (isSpecialDay()) {
        term.echo("Today is a special day, Annais. Type any command to get started.");
    }
});