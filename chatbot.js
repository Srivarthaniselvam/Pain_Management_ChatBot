let painData = [];

function loadPainData() {
    painData = [
        createPainEntry("Headache", "Dehydration, stress, lack of sleep", "Drinking fluids, rest", "Hydration, sleep"),
        createPainEntry("Backpain", "Poor posture", "Rest, ice, pain relievers", "Good posture, exercise"),
        // Add more health issues...
    ];
}

function createPainEntry(pain, vitaminDeficiency, remedies, preventionMethods) {
    return { Pain: pain, "Vitamin deficiency": vitaminDeficiency, Remedies: remedies, "Prevention methods": preventionMethods };
}

function getResponse(userInput) {
    const userInputLower = userInput.toLowerCase().replace(/\s+/g, '');
    for (const painEntry of painData) {
        const painType = painEntry.Pain.toLowerCase().replace(/\s+/g, '');
        if (userInputLower.includes(painType)) {
            return `For ${painType}:\nVitamin deficiency: ${painEntry["Vitamin deficiency"]}\nRemedies: ${painEntry.Remedies}\nPrevention Methods: ${painEntry["Prevention methods"]}`;
        }
    }
    return "I couldn't find information on that issue.";
}

function chatWithBot(userInput) {
    if (userInput.match(/hello|hi/i)) {
        return "Welcome! Please give me your health issues.";
    } else if (userInput.match(/thanks|tq/i)) {
        return "You're welcome!";
    } else if (userInput.match(/exit|goodbye/i)) {
        return "Goodbye!";
    } else {
        return getResponse(userInput);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const voiceButton = document.getElementById("voice-button");

    // Handle text input
    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("user", userMessage);
            const botResponse = chatWithBot(userMessage);
            appendMessage("chatbot", botResponse);
            speakText(botResponse);
            userInput.value = "";
        }
    });

    // Handle voice input
    voiceButton.addEventListener("click", function () {
        startVoiceRecognition();
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${sender}`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Voice recognition using Web Speech API
    function startVoiceRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = function (event) {
            const voiceInput = event.results[0][0].transcript;
            userInput.value = voiceInput;
            sendButton.click();
        };
        recognition.start();
    }

    // Speech synthesis for chatbot response
    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
});

// Initialize the chatbot data
loadPainData();
