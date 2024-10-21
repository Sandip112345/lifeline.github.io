// JavaScript for Emergency Exit button
document.getElementById('emergency-exit').addEventListener('click', function() {
    if (confirm("Are you sure you want to exit? This will redirect you to Google.")) {
        window.location.href = 'https://www.google.com';
    }
});


// Resource library searching functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const loadingIndicator = document.getElementById('loading');
    const videoResources = document.getElementById('video-resources');
    const articleResources = document.getElementById('article-resources');

    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        loadingIndicator.style.display = 'block';

        searchTimeout = setTimeout(function() {
            const searchTerm = searchInput.value.toLowerCase();
            searchResources(searchTerm);
        }, 300); // 300ms delay to reduce number of searches while typing
    });

    function searchResources(searchTerm) {
        // Search videos
        const videoItems = videoResources.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Search articles (assuming you have article items with class 'article-item')
        const articleItems = articleResources.querySelectorAll('.article-item');
        articleItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }
});



// Chat functionality and appointment booking

document.addEventListener('DOMContentLoaded', (event) => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const appointmentForm = document.getElementById('appointment-form');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, false);
            }, 1000);
        }
    });

    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Here you would typically send this data to your server
        console.log(`Appointment booked for ${name} (${email}) on ${date} at ${time}`);

        // Show a confirmation message in the chat
        const confirmationMessage = `Great! I've booked your appointment. Here are the details:
        Name: ${name}
        Email: ${email}
        Date: ${date}
        Time: ${time}
        
        A confirmation email will be sent to you shortly. Is there anything else I can help you with?`;
        addMessage(confirmationMessage, false);

        // Reset the form
        appointmentForm.reset();
    });

    function addMessage(message, isUser) {
        const messageElement = document.createElement('p');
        messageElement.textContent = isUser ? `You: ${message}` : `Bot: ${message}`;
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('help')) {
            return "I'm here to help. What kind of support do you need?";
        } else if (lowerMessage.includes('emergency')) {
            return "If this is an emergency, please call your local emergency number immediately.";
        } else if (lowerMessage.includes('talk to someone')) {
            return "I can connect you with a counselor. Would you like me to do that?";
        } else if (lowerMessage.includes('resources')) {
            return "We have various resources available. You can find them in our Resource Library section.";
        } else if (lowerMessage.includes('book appointment') || lowerMessage.includes('schedule')) {
            return "Certainly! You can book an appointment using the form on this page.";
        } else {
            return "I didn't quite understand that. Could you please rephrase or ask a different question?";
        }
    }
});


// Community forum

document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('new-discussion-modal');
    const btn = document.querySelector('.new-discussion-btn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('new-discussion-form');

    
    btn.onclick = function() {
        modal.style.display = "block";
    }

    
    span.onclick = function() {
        modal.style.display = "none";
    }

    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const title = document.getElementById('discussion-title').value;
        const category = document.getElementById('discussion-category').value;
        const content = document.getElementById('discussion-content').value;

        
        const newThread = document.createElement('div');
        newThread.className = 'thread';
        newThread.innerHTML = `
            <h3><a href="#">${title}</a></h3>
            <p class="thread-info">Started by Anonymous, just now</p>
            <p class="thread-preview">${content.substring(0, 100)}...</p>
        `;

        
        const categorySection = document.querySelector(`.forum-category h2:contains('${category}')`).closest('.forum-category');
        categorySection.querySelector('.thread-list').prepend(newThread);

        
        modal.style.display = "none";
        form.reset();
    }
});


Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
}


