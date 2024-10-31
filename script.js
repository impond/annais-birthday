$(document).ready(function() {
    // Define the special date for Annai's birthday and message interval in days
    const specialDate = new Date(2024, 9, 30); // October 30, 2024 (0-based month index)
    const intervalDays = 12;

    // Array of appreciation messages with media
    const messages = [
        {
            title: "Your drive to bring amazing people together",
            format: "Stream of Consciousness Video",
            body: "I really appreciate your ability to bring together people that are kind, thoughtful, and caring. I think it shows throughout our relationship how much I have also benefitted from that (literally living with 2 of them right now). I believe it’s due to two things: Your ability to spot these people, looking for kindness, dedication to life and beauty, and ability to match your energy. And your ability to sustain and maintain these relationships. The second part also says a lot about you, because I believe it’s your authentic energy that also attracts these people in the first place. Something that is difficult to reach and nurture. I know we’ll meet many more great people together and build long and deep relationships with them and people who already are in our lifes",
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
            this.echo("Available commands:", { typing: true, delay: 50 });
            this.echo(" - help: Show available commands", { typing: true, delay: 50 });
            this.echo(" - clear: Clear the terminal window", { typing: true, delay: 50 });
            this.echo(" - hello: Display a greeting message", { typing: true, delay: 50 });
            this.echo(" - latest: Show the latest appreciation message", { typing: true, delay: 50 });
            this.echo(" - previous: Show all available messages until today", { typing: true, delay: 50 });
            this.echo(" - cd [message title]: Load a previous message by its title", { typing: true, delay: 50 });
        } else if (cmd === 'hello') {
            this.echo("Hello, my love! I hope your appreciation box brings you joy and makes you feel loved.", { typing: true, delay: 50 });
        } else if (cmd === 'clear') {
            this.clear();
        } else if (cmd === 'latest') {
            showCurrentMessage(this);
        } else if (cmd === 'previous') {
            showPreviousMessages(this);
        } else if (cmd.startsWith('cd ')) {
            const title = command.slice(3).trim();
            gotoMessage(this, title);
        } else if (isSpecialDay()) {
            displaySpecialMessage(this);
        } else {
            this.echo(`Unknown command: ${command}`, { typing: true, delay: 50 });
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

    // Helper function to delay execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to display the special birthday message with typing animation in the correct order
    function displaySpecialMessage(terminal) {
        const messageLines = [
            "Hello my love,",
            "",
            "I wish you all the best for your 30th birthday from the bottom of my heart!",
            "",
            "It’s a special occasion to turn 30 and I’m glad we’re celebrating it together and proper,",
            "here with friends, in a beautiful part of the world.",
            "",
            "Despite our recent hard conversations, I am hopeful for us and for you.",
            "Maybe it's because we’re holding these conversations in an increasingly mature and emotionally strong way,",
            "maybe it’s the fact that we can talk openly and surely about so many topics of deep dedication, like marriage and kids.",
            "In any case, I feel lots of empathy and commitment through our conversations and know however we decide,",
            "there’s a foundation of love that will hold us.",
            "",
            "For your birthday I want to gift you appreciation. I don’t think you need any physical token, so it’s not.",
            "I also knew that it would be more enjoyable for you if it’s a regular thing instead of a one time shower.",
            "",
            "So I want to gift you your own Appreciation Box.",
            "It’s a place where a new message of appreciation becomes available every 12 days, for a total of 30 messages in the next year.",
            "To make them fun, the messages are created in 30 different formats.",
            "Today, you’ll have access to the first of them.",
            "You can always go back to the old messages when you feel like it’s a good time to re-read them.",
            "",
            "I hope you’ll feel the love that I feel, when I made them and it brings you close to me.",
            "",
            "Much love,",
            "Joaquin",
            "",
            "<Type help to see all commands>",
        ];

        // Helper function to print each line sequentially
        let index = 0;
        function printNextLine() {
            if (index < messageLines.length) {
                // Print the current line
                terminal.echo(messageLines[index], { typing: false, delay: 50 });
                // Move to the next line after a small delay
                index++;
                setTimeout(printNextLine, 100); // Adjust the delay as needed
            } else {
                // Add the ASCII art after all lines are printed
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
                `, { typing: false, delay: 10 });
            }
        }

        // Start printing lines from the first one
        printNextLine();
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
                                                                                                            v1.0.3` ;
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
            terminal.echo("No messages available yet.", { typing: true, delay: 50 });
            return;
        }

        const message = messages[index];
        terminal.echo(`Todays' Title (I love...):  ${message.title}`, { typing: false, delay: 50 });
        terminal.echo(`Todays' Format: ${message.format}`, { typing: false, delay: 50 });
        terminal.echo(`\n${message.body}`, { typing: false, delay: 50 });

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
                    { raw: true, typing: true, delay: 50 }
                );
            } else {
                // Display image
                terminal.echo(
                    `<img src="${message.media}" style="max-width: 80%; display: block; margin: 10px auto;">`,
                    { raw: true, typing: true, delay: 50 }
                );
            }
        }
    }

    // Function to show all previous messages up to today
    function showPreviousMessages(terminal) {
        const latestIndex = getLatestMessageIndex();
        if (latestIndex < 0) {
            terminal.echo("No previous messages available yet.", { typing: true, delay: 50 });
            return;
        }

        terminal.echo("Available messages:", { typing: true, delay: 50 });
        for (let i = 0; i <= latestIndex && i < messages.length; i++) {
            terminal.echo(`- ${messages[i].title}`, { typing: true, delay: 50 });
        }
    }

    // Function to go to a specific message by title
    function gotoMessage(terminal, title) {
        const message = messages.find(msg => msg.title.toLowerCase() === title.toLowerCase());
        if (!message) {
            terminal.error("Message not found.", { typing: true, delay: 50 });
            return;
        }

        terminal.echo(`Title: ${message.title}`, { typing: true, delay: 50 });
        terminal.echo(`Format: ${message.format}`, { typing: true, delay: 50 });
        terminal.echo(`\n${message.body}`, { typing: true, delay: 50 });

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
                    { raw: true, typing: true, delay: 50 }
                );
            } else {
                // Display image
                terminal.echo(
                    `<img src="${message.media}" style="max-width: 80%; display: block; margin: 10px auto;">`,
                    { raw: true, typing: true, delay: 50 }
                );
            }
        }
    }

    // Initial special message check
    if (isSpecialDay()) {
        term.echo("Today is a special day, Annais. Type any command to get started.", { typing: true, delay: 50 });
    }
});