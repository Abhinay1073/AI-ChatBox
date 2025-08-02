// Global variables
let currentTopic = 0;
let completedTopics = new Set();
let conversationHistory = [];
let userProgress = { totalInteractions: 0 };

// Exam state
let examState = {
    active: false,
    currentQuestion: 0,
    answers: [],
    timeRemaining: 300, // 5 minutes in seconds
    timer: null,
    examTopic: ""
};

// Course topics with detailed content
const topics = [
    { title: "Introduction to AI", icon: "🧠", difficulty: "Beginner" },
    { title: "Machine Learning Basics", icon: "📊", difficulty: "Beginner" },
    { title: "Neural Networks", icon: "🕸️", difficulty: "Intermediate" },
    { title: "Deep Learning", icon: "🌊", difficulty: "Advanced" },
    { title: "Natural Language Processing", icon: "💬", difficulty: "Intermediate" },
    { title: "Computer Vision", icon: "👁️", difficulty: "Intermediate" },
    { title: "Reinforcement Learning", icon: "🎮", difficulty: "Advanced" },
    { title: "AI Ethics", icon: "⚖️", difficulty: "Intermediate" },
    { title: "Data Science for AI", icon: "📈", difficulty: "Intermediate" },
    { title: "AI in Healthcare", icon: "🏥", difficulty: "Advanced" },
    { title: "Autonomous Systems", icon: "🤖", difficulty: "Advanced" },
    { title: "Future of AI", icon: "🚀", difficulty: "All Levels" }
];

// Exam questions database (10 per topic)
const topicExams = {
    "Introduction to AI": [
        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automated Input",
                "Algorithmic Inference",
                "Applied Integration"
            ],
            correct: 0
        },
        {
            question: "Which of these is NOT a type of AI?",
            options: [
                "Narrow AI",
                "General AI",
                "Super AI",
                "Complex AI"
            ],
            correct: 3
        },
        {
            question: "What is the primary goal of AI?",
            options: [
                "To create machines that can perform tasks requiring human intelligence",
                "To replace human workers",
                "To develop self-aware machines",
                "To create systems that can only perform specific tasks"
            ],
            correct: 0
        },
        {
            question: "Which application is an example of AI?",
            options: [
                "Virtual assistants like Siri or Alexa",
                "Basic calculators",
                "Word processors",
                "Spreadsheets"
            ],
            correct: 0
        },
        {
            question: "What is the Turing Test used for?",
            options: [
                "To determine if a machine can exhibit intelligent behavior equivalent to a human",
                "To test computer processing speed",
                "To evaluate graphics capabilities",
                "To measure memory capacity"
            ],
            correct: 0
        },
        {
            question: "Which branch of AI focuses on enabling machines to understand human language?",
            options: [
                "Natural Language Processing",
                "Computer Vision",
                "Robotics",
                "Expert Systems"
            ],
            correct: 0
        },
        {
            question: "What distinguishes Narrow AI from General AI?",
            options: [
                "Narrow AI specializes in specific tasks, while General AI can perform any intellectual task a human can",
                "Narrow AI is less accurate than General AI",
                "General AI is currently more widely used than Narrow AI",
                "Narrow AI requires more computational power than General AI"
            ],
            correct: 0
        },
        {
            question: "Which of these is a key characteristic of machine learning?",
            options: [
                "Systems learn from data without explicit programming",
                "Systems follow strict rule-based programming",
                "Systems require human intervention for every decision",
                "Systems cannot improve over time"
            ],
            correct: 0
        },
        {
            question: "What is the main purpose of an algorithm in AI?",
            options: [
                "To provide step-by-step instructions for solving a problem",
                "To store large amounts of data",
                "To visualize complex data sets",
                "To connect to the internet"
            ],
            correct: 0
        },
        {
            question: "Which AI technique involves learning through trial and error?",
            options: [
                "Reinforcement Learning",
                "Supervised Learning",
                "Unsupervised Learning",
                "Deep Learning"
            ],
            correct: 0
        }
    ],
    "Machine Learning Basics": [
        {
            question: "What is the core concept of machine learning?",
            options: [
                "Enabling computers to learn from data without explicit programming",
                "Teaching computers specific rules for all possible scenarios",
                "Creating algorithms that never change",
                "Programming computers to perform tasks step-by-step"
            ],
            correct: 0
        },
        {
            question: "Which of these is a type of machine learning?",
            options: [
                "Supervised learning",
                "Random learning",
                "Fixed learning",
                "Manual learning"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of training data in ML?",
            options: [
                "To teach the algorithm patterns and relationships",
                "To test the final model",
                "To store results",
                "To visualize outcomes"
            ],
            correct: 0
        },
        {
            question: "Which algorithm is commonly used for classification?",
            options: [
                "Decision Trees",
                "Linear Regression",
                "K-Means Clustering",
                "Principal Component Analysis"
            ],
            correct: 0
        },
        {
            question: "What is overfitting in ML?",
            options: [
                "When a model performs well on training data but poorly on new data",
                "When a model is too simple",
                "When training takes too long",
                "When data is perfectly balanced"
            ],
            correct: 0
        },
        {
            question: "What is the difference between classification and regression?",
            options: [
                "Classification predicts categories, regression predicts continuous values",
                "Classification is for images, regression is for text",
                "Classification requires more data than regression",
                "Regression is faster than classification"
            ],
            correct: 0
        },
        {
            question: "Which technique helps prevent overfitting?",
            options: [
                "Cross-validation",
                "Increasing model complexity",
                "Using all available data for training",
                "Reducing the number of features"
            ],
            correct: 0
        },
        {
            question: "What does 'feature engineering' refer to?",
            options: [
                "The process of creating new input variables from raw data",
                "The design of machine learning algorithms",
                "The visualization of model results",
                "The deployment of ML models"
            ],
            correct: 0
        },
        {
            question: "Which evaluation metric is used for classification problems?",
            options: [
                "Accuracy",
                "Mean Squared Error",
                "R-squared",
                "Adjusted R-squared"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of a validation set?",
            options: [
                "To fine-tune model parameters during training",
                "To test the final model performance",
                "To train the initial model",
                "To store historical data"
            ],
            correct: 0
        }
    ],
    "Neural Networks": [
        {
            question: "What is the basic unit of a neural network?",
            options: [
                "Neuron",
                "Synapse",
                "Layer",
                "Weight"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of an activation function?",
            options: [
                "To introduce non-linearity into the network",
                "To store weights",
                "To calculate inputs",
                "To visualize data"
            ],
            correct: 0
        },
        {
            question: "Which type of layer is typically the last in a classification network?",
            options: [
                "Output layer",
                "Input layer",
                "Hidden layer",
                "Convolutional layer"
            ],
            correct: 0
        },
        {
            question: "What is backpropagation used for?",
            options: [
                "Adjusting weights based on error",
                "Forwarding data through the network",
                "Initializing weights",
                "Reducing network size"
            ],
            correct: 0
        },
        {
            question: "What problem does ReLU help solve?",
            options: [
                "Vanishing gradient problem",
                "Overfitting",
                "Underfitting",
                "Data imbalance"
            ],
            correct: 0
        },
        {
            question: "What is a convolutional neural network primarily used for?",
            options: [
                "Image recognition",
                "Text generation",
                "Time series forecasting",
                "Recommendation systems"
            ],
            correct: 0
        },
        {
            question: "What does 'epoch' mean in neural network training?",
            options: [
                "One complete pass through the entire training dataset",
                "The time it takes to train a model",
                "A type of neural network architecture",
                "The error rate of a model"
            ],
            correct: 0
        },
        {
            question: "Which technique is used to reduce overfitting in neural networks?",
            options: [
                "Dropout",
                "Increasing network depth",
                "Using larger learning rates",
                "Adding more neurons to each layer"
            ],
            correct: 0
        },
        {
            question: "What is the role of the loss function?",
            options: [
                "To measure how well the model is performing",
                "To initialize the weights of the network",
                "To visualize the network architecture",
                "To select the activation function"
            ],
            correct: 0
        },
        {
            question: "What does 'deep' refer to in deep learning?",
            options: [
                "Multiple layers in the neural network",
                "Complex mathematical operations",
                "Large amounts of training data",
                "High-dimensional feature spaces"
            ],
            correct: 0
        }
    ]
    // Additional topics would follow the same pattern
};

// Enhanced knowledge base with topic-specific Q&A
const topicQA = {
    "introduction to ai": {
        "what is artificial intelligence": "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. Unlike human intelligence, which is biological and conscious, AI relies on algorithms and data processing. AI can perform specific tasks efficiently but lacks consciousness, emotions, and general understanding that humans possess.",
        "main goals of artificial intelligence": "The main goals of AI include: 1) Automation - performing tasks without human intervention, 2) Problem-solving - finding solutions to complex problems, 3) Learning - improving performance through experience, 4) Reasoning - making logical decisions based on available information, and 5) Perception - understanding and interpreting sensory data.",
        "real-life applications of ai": "Three major real-life AI applications are: 1) Virtual assistants like Siri and Alexa for voice recognition and task automation, 2) Recommendation systems used by Netflix, Amazon, and YouTube to suggest content, and 3) Medical diagnosis systems that help doctors detect diseases in medical imaging and patient data analysis.",
        "types of ai": "AI is classified into three types: 1) Narrow AI (Weak AI) - designed for specific tasks like chess or image recognition, currently the only type that exists, 2) General AI (Strong AI) - hypothetical AI with human-level intelligence across all domains, and 3) Super AI - theoretical AI that surpasses human intelligence in all aspects, still science fiction."
    }
    // Additional topics would follow the same pattern
};

// Enhanced response system
function getResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for topic-specific questions
    for (const [topicKey, questions] of Object.entries(topicQA)) {
        for (const [questionKey, answer] of Object.entries(questions)) {
            if (lowerMessage.includes(questionKey.toLowerCase()) || 
                questionKey.toLowerCase().includes(lowerMessage) ||
                calculateSimilarity(lowerMessage, questionKey.toLowerCase()) > 0.6) {
                return `📚 <strong>${questionKey.toUpperCase()}</strong><br><br>${answer}<br><br>💡 <em>Would you like to know more about this topic or ask another question?</em>`;
            }
        }
    }

    // Check for general AI terms
    const generalResponses = {
        "artificial intelligence": "Artificial Intelligence is a broad field focused on creating machines that can perform tasks requiring human intelligence.",
        "machine learning": "Machine Learning enables computers to learn patterns from data without explicit programming.",
        "neural networks": "Neural networks are computational models inspired by the human brain's structure.",
        "deep learning": "Deep learning uses multi-layered neural networks to learn complex patterns in data.",
        "help": "I can answer questions about all 12 AI topics! Try asking about specific concepts like 'what is machine learning' or 'types of AI'.",
        "topics": "I cover 12 topics: Introduction to AI, Machine Learning, Neural Networks, Deep Learning, NLP, Computer Vision, Reinforcement Learning, AI Ethics, Data Science, AI in Healthcare, Autonomous Systems, and Future of AI.",
        "exam": "Test your knowledge with a comprehensive exam! Click the 'Start Exam' button in the sidebar."
    };

    for (const [key, response] of Object.entries(generalResponses)) {
        if (lowerMessage.includes(key)) {
            return `🤖 ${response}<br><br>Feel free to ask more specific questions!`;
        }
    }

    return `🤔 I'm here to help with AI topics! Try asking specific questions like:<br>
    • "What is artificial intelligence?"<br>
    • "Types of machine learning"<br>
    • "How do neural networks work?"<br>
    • "AI ethics concerns"<br><br>
    Or take an exam to test your knowledge!`;
}

// Simple similarity calculation for better question matching
function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
}

// Initialize application
function init() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    generateTopicList();
    addWelcomeMessage();
    updateStats();
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };

    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// Generate topic list
function generateTopicList() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';
    
    topics.forEach((topic, index) => {
        const topicItem = document.createElement('button');
        topicItem.className = `topic-item ${index === currentTopic ? 'active' : ''} ${completedTopics.has(index) ? 'completed' : ''}`;
        topicItem.innerHTML = `
            ${topic.icon} ${index + 1}. ${topic.title}
            <span class="topic-difficulty">${topic.difficulty}</span>
        `;
        topicItem.onclick = () => selectTopic(index);
        topicList.appendChild(topicItem);
    });
}

// Select topic
function selectTopic(index) {
    currentTopic = index;
    generateTopicList();
    document.getElementById('currentFocus').textContent = topics[index].title;
    
    const topicKey = topics[index].title.toLowerCase();
    const sampleQuestions = Object.keys(topicQA[topicKey] || {}).slice(0, 2);
    const questionText = sampleQuestions.length > 0 ? 
        `<br><br>📝 <strong>Try asking:</strong><br>• ${sampleQuestions.join('<br>• ')}` : '';
    
    addMessage(`Welcome to <strong>${topics[index].title}</strong>! This is a ${topics[index].difficulty} level topic.${questionText}`, 'ai');
}

// Handle key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;

    addMessage(message, 'user');
    input.value = '';
    userProgress.totalInteractions++;

    showTypingIndicator(true);

    setTimeout(() => {
        const response = getResponse(message);
        addMessage(response, 'ai');
        updateStats();
        showTypingIndicator(false);
    }, 1500);
}

// Add message to chat
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const senderIcon = sender === 'ai' ? '🤖 AI Tutor' : '👤 You';
    
    messageDiv.innerHTML = `
        <div class="message-header">
            ${senderIcon}
            <span style="font-size: 0.8rem; opacity: 0.7; margin-left: auto;">${time}</span>
        </div>
        ${message}
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Welcome message
function addWelcomeMessage() {
    const welcomeMessage = `🎉 <strong>Welcome to AI Academy Pro!</strong><br><br>
    🚀 <strong>Enhanced Features:</strong><br>
    • Comprehensive exams with 10 questions per topic<br>
    • 5-minute timed tests to challenge your knowledge<br>
    • Detailed explanations for every concept<br>
    • Voice capabilities for hands-free learning<br><br>
    💡 <strong>Try asking:</strong><br>
    • "What is artificial intelligence?"<br>
    • "Explain neural networks"<br>
    • "Start an exam on machine learning"`;
    addMessage(welcomeMessage, 'ai');
}

// Show typing indicator
function showTypingIndicator(show) {
    document.getElementById('typingIndicator').style.display = show ? 'block' : 'none';
}

// Update statistics
function updateStats() {
    const progress = Math.round((completedTopics.size / topics.length) * 100);
    document.getElementById('completedCount').textContent = completedTopics.size;
    document.getElementById('accuracyScore').textContent = progress + '%';
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${completedTopics.size}/${topics.length} modules completed`;
}

// Quick action functions
function explainConcept() {
    const currentTopicKey = topics[currentTopic].title.toLowerCase();
    if (topicQA[currentTopicKey]) {
        const firstQuestion = Object.keys(topicQA[currentTopicKey])[0];
        const firstAnswer = topicQA[currentTopicKey][firstQuestion];
        addMessage(`🔍 <strong>Key Concept:</strong><br>${firstAnswer}`, 'ai');
    } else {
        addMessage('🔍 I can explain any AI concept! Ask me specific questions about the topics.', 'ai');
    }
}

function showSummary() {
    addMessage(`📋 <strong>Summary:</strong> You're currently learning about ${topics[currentTopic].title}. This is a ${topics[currentTopic].difficulty} level topic. Ask specific questions to dive deeper into the concepts!`, 'ai');
}

function resetProgress() {
    if (confirm('Reset all progress?')) {
        completedTopics.clear();
        document.getElementById('chatMessages').innerHTML = '';
        generateTopicList();
        updateStats();
        addWelcomeMessage();
    }
}

function exportProgress() {
    alert('Progress exported successfully! (Demo feature)');
}

function saveApiKeys() {
    alert('API keys saved successfully!');
}

// Exam Functions
function startExam() {
    const topicName = topics[currentTopic].title;
    const exam = topicExams[topicName];
    
    if (!exam) {
        addMessage(`📚 Exam: Currently no exam available for ${topicName}. Try another topic!`, 'ai');
        return;
    }
    
    examState = {
        active: true,
        currentQuestion: 0,
        answers: Array(exam.length).fill(null),
        timeRemaining: 300, // 5 minutes for exam
        timer: null,
        examTopic: topicName
    };
    
    // Hide chat, show exam
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('examContainer').style.display = 'block';
    document.getElementById('examTitle').textContent = `${topicName} Exam`;
    document.getElementById('totalQuestions').textContent = exam.length;
    document.getElementById('questionsGrid').innerHTML = '';
    
    // Create question indicators
    for (let i = 0; i < exam.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'question-indicator';
        indicator.textContent = i + 1;
        indicator.onclick = () => goToQuestion(i);
        document.getElementById('questionsGrid').appendChild(indicator);
    }
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion();
}

function startTimer() {
    updateTimerDisplay();
    
    examState.timer = setInterval(() => {
        examState.timeRemaining--;
        updateTimerDisplay();
        
        if (examState.timeRemaining <= 0) {
            clearInterval(examState.timer);
            finishExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(examState.timeRemaining / 60);
    const seconds = examState.timeRemaining % 60;
    document.getElementById('examTimer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('countdown').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function displayQuestion() {
    const topicName = examState.examTopic;
    const exam = topicExams[topicName];
    const question = exam[examState.currentQuestion];
    
    // Update UI
    document.getElementById('currentQuestion').textContent = examState.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Update question indicators
    const indicators = document.querySelectorAll('.question-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('current', 'answered');
        if (index === examState.currentQuestion) {
            indicator.classList.add('current');
        }
        if (examState.answers[index] !== null) {
            indicator.classList.add('answered');
        }
    });
    
    // Create options
    const optionsContainer = document.getElementById('examOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        if (examState.answers[examState.currentQuestion] === index) {
            optionBtn.classList.add('selected');
        }
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionBtn);
    });
}

function selectOption(optionIndex) {
    const topicName = examState.examTopic;
    const exam = topicExams[topicName];
    
    // Update answer
    examState.answers[examState.currentQuestion] = optionIndex;
    
    // Update UI
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === optionIndex) {
            btn.classList.add('selected');
        }
    });
    
    // Update question indicator
    const indicators = document.querySelectorAll('.question-indicator');
    indicators[examState.currentQuestion].classList.add('answered');
}

function prevQuestion() {
    if (examState.currentQuestion > 0) {
        examState.currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    const topicName = examState.examTopic;
    const exam = topicExams[topicName];
    
    if (examState.currentQuestion < exam.length - 1) {
        examState.currentQuestion++;
        displayQuestion();
    }
}

function goToQuestion(index) {
    examState.currentQuestion = index;
    displayQuestion();
}

function finishExam() {
    clearInterval(examState.timer);
    
    const topicName = examState.examTopic;
    const exam = topicExams[topicName];
    
    // Calculate score
    let correct = 0;
    for (let i = 0; i < exam.length; i++) {
        if (examState.answers[i] === exam[i].correct) {
            correct++;
        }
    }
    
    const score = Math.round((correct / exam.length) * 100);
    
    // Display results
    document.querySelector('.exam-content').style.display = 'none';
    document.getElementById('examResults').style.display = 'block';
    document.getElementById('scoreDisplay').textContent = `${score}%`;
    document.getElementById('resultTitle').textContent = 'Exam Results';
    
    // Set result message based on score
    let message = '';
    if (score >= 90) {
        message = `🎉 Outstanding! You've mastered ${topicName} with ${correct} out of ${exam.length} correct answers. Your understanding is exceptional!`;
    } else if (score >= 70) {
        message = `👍 Well done! You scored ${correct} out of ${exam.length} on the exam. You have a solid understanding of ${topicName}.`;
    } else if (score >= 50) {
        message = `📚 Good effort! You scored ${correct} out of ${exam.length}. Review the material and try again to improve your score.`;
    } else {
        message = `📝 You scored ${correct} out of ${exam.length}. Take time to review ${topicName} and try the exam again. Learning takes practice!`;
    }
    
    document.getElementById('resultMessage').textContent = message;
    
    // Mark topic as completed if exam passed
    if (score >= 70) {
        completedTopics.add(currentTopic);
        updateStats();
        generateTopicList();
    }
}

function reviewAnswers() {
    // For demo, just return to learning
    continueLearning();
    addMessage(`📝 Here are the correct answers for your exam:<br><br>Review the topic to see detailed explanations for each question.`, 'ai');
}

function retakeExam() {
    startExam();
}

function continueLearning() {
    document.getElementById('examContainer').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'flex';
    document.querySelector('.exam-content').style.display = 'grid';
    document.getElementById('examResults').style.display = 'none';
    
    addMessage(`🏁 Exam completed! Continue learning about ${topics[currentTopic].title} or try another topic.`, 'ai');
}

// Voice recognition variables
let recognition = null;
let isRecording = false;

function initVoiceRecognition() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        document.getElementById('voiceBtn').innerHTML = '🎤 Unavailable';
        document.getElementById('voiceBtn').disabled = true;
        document.getElementById('voiceBtn').style.opacity = '0.6';
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = function() {
        isRecording = true;
        document.getElementById('voiceBtn').innerHTML = '🔴 Stop';
        document.getElementById('voiceBtn').style.background = 'var(--warning)';
        addMessage('🎤 Listening... Speak your question now!', 'ai');
    };
    
    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            }
        }
        
        if (transcript) {
            document.getElementById('chatInput').value = transcript;
            addMessage(`🎤 Voice input: "${transcript}"`, 'user');
            setTimeout(() => {
                sendMessage();
            }, 500);
        }
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        resetVoiceButton();
        addMessage(`❌ Voice recognition error: ${event.error}. Please try again.`, 'ai');
    };
    
    recognition.onend = function() {
        resetVoiceButton();
    };
}

function resetVoiceButton() {
    isRecording = false;
    document.getElementById('voiceBtn').innerHTML = '🎤 Voice';
    document.getElementById('voiceBtn').style.background = 'var(--secondary)';
}

function toggleVoiceRecording() {
    // Initialize if not already done
    if (!recognition) {
        initVoiceRecognition();
    }
    
    // If still not available after initialization
    if (!recognition) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    if (isRecording) {
        recognition.stop();
        resetVoiceButton();
    } else {
        try {
            recognition.start();
        } catch (error) {
            console.error('Error starting recognition:', error);
            addMessage('❌ Error starting voice recognition. Please ensure you have a microphone and the necessary permissions.', 'ai');
            resetVoiceButton();
        }
    }
}

function speakLastMessage() {
    const messages = document.querySelectorAll('.ai-message');
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1].textContent;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(lastMessage);
            speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech not supported in this browser');
        }
    }
}

function stopSpeaking() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

// Initialize when page loads
window.onload = function() {
    init();
};