document.addEventListener("DOMContentLoaded", function () {
    // Setup variables
    const questions = document.querySelectorAll(".question");
    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let quizStarted = false;
    let quizSubmitted = false;

    // Timer setup - 30 minutes
    let timeLeft = 3 * 60 * 60;  // 3 hours in seconds
    const timerElement = document.getElementById("timer");

    // Navigation buttons
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");

    // Question navigation panel
    const rightBox = document.querySelector(".right.box");

    // Correct answers
    const correctAnswers = {
        q1: "A", // A problem where solutions must meet constraints
        q2: "A", // Scheduling
        q3: "A", // Variables, Domains, Constraints
        q4: "A", // An entity needing a value
        q5: "A", // Set of possible values for a variable
        q6: "A", // Involves one variable
        q7: "A", // Sudoku
        q8: "A", // Place queens without attacking each other
        q9: "A", // Backtracking
        q10: "A", // Tries values and retreats on failure
        q11: "A", // Reducing domains by constraints
        q12: "A", // Removes inconsistent values after assignment
        q13: "A", // Adjacent regions different colors
        q14: "A", // Deciding order of variable assignment
        q15: "A", // Minimum Remaining Values
        q16: "A", // Grid cells
        q17: "A", // Game playing decisions
        q18: "A", // Aims to maximize score
        q19: "A", // Nodes as states, edges as moves
        q20: "A", // Cuts unnecessary branches
        q21: "A", // Best max choice so far
        q22: "A", // Best min choice so far
        q23: "A", // No full solution exists
        q24: "A", // Reduces search space early
        q25: "A", // Constraints on two variables
        q26: "A", // Relationships restricting variable values
        q27: "A", // Adjacent regions ≠ colors in map coloring
        q28: "A", // Triple (X, D, C)
        q29: "A", // |Qi – Qj| ≠ |i-j|
        q30: "A", // After choosing value, check constraints
        q31: "A", // AllDifferent in Sudoku row
        q32: "A", // Values without support in connected domain
        q33: "A", // Relax constraints
        q34: "A", // Removes values from unassigned domains early
        q35: "A", // 3 (from example)
        q36: "A", // Fixed before search
        q37: "A", // Variable with most constraints
        q38: "A", // Unique in row, column, subgrid
        q39: "A", // Remove value from row/column/block domains
        q40: "A", // Opponent plays optimally
        q41: "A", // Game-ending with utility
        q42: "A", // DFS to leaves
        q43: "A", // Alpha >= Beta
        q44: "A", // Max player
        q45: "A", // Variables/constraints change over time
        q46: "A", // Degrees of satisfaction
        q47: "A", // {1,3,5,2,4}
        q48: "A", // Hill Climbing, etc., iterative improvement
        q49: "A", // Constraints on 3+ variables
        q50: "A", // Local consistency
        q51: "A", // All variables assigned without violation
        q52: "A", // X removes 3 if no support
        q53: "A", // Violable with cost
        q54: "A", // Jumps to conflict source
        q55: "A", // Smallest domain/degree ratio
        q56: "A", // Assign and propagate
        q57: "A", // Max chooses max, Min chooses min
        q58: "A", // Alpha(5) >= Beta(3)
        q59: "A", // Max of children mins
        q60: "A", // Product recommendation with preferences
        q61: "A", // Q2(2,1) attacks Q1(1,1) same column
        q62: "A", // Maximize high-weight satisfaction
        q63: "A", // Adaptive scheduling in logistics
        q64: "A", // Win/loss/draw utilities
        q65: "A", // -∞ / +∞
        q66: "A", // Prunes sub-trees not affecting decision
        q67: "A", // Least Constraining Value (LCV)
        q68: "A", // Constraint conversion techniques
        q69: "A", // Simplifies but not completely
        q70: "A", // 15 steps as per example
        q71: "A", // No constraints (no borders)
        q72: "A", // Min/Max of children utilities
        q73: "A", // Condition-action pair
        q74: "A", // Depth-first
        q75: "A", // Adversarial search like Minimax
        q76: "A", // At C, Alpha(3) >= Beta(1) after F=1
        q77: "A", // Max of mins of maxes
        q78: "A", // Relax classroom prefs in scheduling
        q79: "A", // Remove X=3
        q80: "A", // Prevents diagonal attacks
        q81: "A", // Still needs backtrack if domain empty
        q82: "A", // Var1 (2/3 < 3/2)
        q83: "A", // Remove 1 from A and B, assign if single left
        q84: "A", // Node values, not alpha/beta
        q85: "A", // Satisfaction degrees, not binary
        q86: "A", // Q1=1 col1, diagonal attacks
        q87: "A", // Deadline higher than overtime
        q88: "A", // Constraint graph nodes=vars, edges=constraints
        q89: "A", // Recurse to depth, evaluate heuristic if cutoff
        q90: "A", // To bound search, but value is actual min/max
        q91: "A", // Allow violations, minimize cost iteratively
        q92: "A", // Add hidden variables for pairs
        q93: "A", // Inconsistent, no solution
        q94: "A", // Q not adjacent V, NSW adjacent V but green≠red
        q95: "A", // Avoid exploring branches where better already found elsewhere
        q96: "A", // Max(min(5,7)=5, min(4,6,3)=3, min(2)=2)=5
        q97: "A", // Highest degree
        q98: "A", // Remove 2,5 from other row cells
        q99: "A", // Assumes rational opponent, finds best against worst-case
        q100: "A", // 3
        q101: "A", // Alpha=-∞, Beta=3; to explore next successor
        q102: "A", // X1 {1,2}, X2 {2,3} then higher-order removes X1=2,X2=3 if not sum=3
        q103: "A", // Meet deadline (higher weight)
        q104: "A", // No same column, diagonal: |5-1|≠|3-1|, |5-3|≠|3-2|
        q105: "A", // Remove red from NT and SA
        q106: "A", // Choose higher degree (most constraining)
        q107: "A", // Remove 1 from A and B, assign if single left
        q108: "A", // Max(4,3,2)=4
        q109: "A", // No prune, but beta=min(beta,3)=2 after
        q110: "A", // Aggregate degrees, e.g., min or weighted sum
        q111: "A", // Q1=1 col1, diagonal attacks
        q112: "A", // Harder, may need more propagation
        q113: "A", // Recurse to depth, evaluate heuristic if cutoff
        q114: "A", // To bound search, but value is actual min/max
        q115: "A", // Allow violations, minimize cost iteratively
        q116: "A", // Add hidden variables for pairs
        q117: "A", // Inconsistent, no solution
        q118: "A", // Q not adjacent V, NSW adjacent V but green≠red
        q119: "A", // Avoid exploring branches where better already found elsewhere
        q120: "A", // Max(min(5,7)=5, min(4,6,3)=3, min(2)=2)=5
        q121: "A", // Highest degree
        q122: "A", // Remove 2,5 from other row cells
        q123: "A", // Assumes rational opponent, finds best against worst-case
        q124: "A", // Max(3 from left,1 from right)=3, pruned don't affect
        q125: "A", // If-then rules for knowledge representation

    };

    // Add CSS for navigation button states
    const navButtonStyles = document.createElement("style");
    navButtonStyles.textContent = `
        .right.box .btn {
            /* Keep original styling but add transitions */
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        /* Not attempted - default state */
        .right.box .btn.not-attempted {
            background-color: #f0f0f0;
            color: #555;
        }
        
        /* Attempted */
        .right.box .btn.answered {
            background-color: #2196F3;
            color: white;
        }
        
        /* Incorrect answer */
        .right.box .btn.incorrect {
            background-color: #FF5252;
            color: white;
        }
        
        /* Correct answer */
        .right.box .btn.correct {
            background-color: #4CAF50;
            color: white;
        }
        
        /* Active question */
        .right.box .btn.active {
            border: 2px solid #000;
            font-weight: bold;
        }
    `;
    document.head.appendChild(navButtonStyles);

    // Initialize question navigation buttons
    for (let i = 1; i <= totalQuestions; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btn", "not-attempted");
        btn.textContent = i;
        btn.addEventListener("click", function () {
            showQuestion(i - 1);
        });
        rightBox.appendChild(btn);
    }

    // Track answer changes
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const questionName = this.name;
            const questionNumber = parseInt(questionName.substring(1)) - 1;
            userAnswers[questionName] = this.value;

            // Update the navigation button to show it's been answered
            const navButton = document.querySelectorAll('.right.box .btn')[questionNumber];
            navButton.classList.remove('not-attempted');
            navButton.classList.add('answered');
        });
    });

    // Function to display a specific question
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? "block" : "none";
        });

        // Update navigation buttons
        if (!quizSubmitted) {
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = "block"; // Always show submit button
        } else {
            // After submission, always show prev/next buttons (except at boundaries)
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = "none";  // Hide submit button after submission
        }

        // Update the active question button
        document.querySelectorAll('.right.box .btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        currentQuestionIndex = index;
    }

    // Initialize timer
    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0 && !quizSubmitted) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else if (!quizSubmitted) {
            // Time's up - auto submit
            submitQuiz();
        }
    }

    // Submit the quiz
    function submitQuiz(violation = false) {
        quizSubmitted = true;
        let score = 0;
        let answeredCount = 0;

        // Calculate score
        for (let key in correctAnswers) {
            if (userAnswers[key]) {
                answeredCount++;
                if (userAnswers[key] === correctAnswers[key]) {
                    score++;
                }
            }
        }

        // Display result
        const timeExpired = timeLeft <= 0;
        resultDiv.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Your Score: ${score}/${totalQuestions}</p>
            <p>Questions Answered: ${answeredCount}/${totalQuestions}</p>
            ${timeExpired ? '<p>Time Expired!</p>' : ''}
            <h3>Question Summary</h3>
            <div id="question-summary"></div>
        `;

        // Create and append question summary
        const summaryDiv = document.getElementById("question-summary");
        for (let i = 1; i <= totalQuestions; i++) {
            const qKey = `q${i}`;
            const userAnswer = userAnswers[qKey] || "Not Attempted";
            const isCorrect = userAnswers[qKey] === correctAnswers[qKey];
            const wasAttempted = userAnswers[qKey] !== undefined;

            let statusClass = "not-attempted";
            let statusText = "Not Attempted";

            if (wasAttempted) {
                if (isCorrect) {
                    statusClass = "correct";
                    statusText = "Correct";
                } else {
                    statusClass = "incorrect";
                    statusText = "Incorrect";
                }
            }

            // Update the navigation button colors based on correctness
            const navButton = document.querySelectorAll('.right.box .btn')[i - 1];
            navButton.classList.remove('not-attempted', 'answered', 'correct', 'incorrect');
            navButton.classList.add(statusClass);

            const questionSummary = document.createElement("div");
            questionSummary.className = `question-result ${statusClass}`;
            questionSummary.innerHTML = `
                <p>Question ${i}: <span class="${statusClass}">${statusText}</span></p>
                <p>Your Answer: ${userAnswer}</p>
                <p>Correct Answer: ${correctAnswers[qKey]}</p>
            `;
            summaryDiv.appendChild(questionSummary);
        }

        // Add styles for the question summary
        const styleEl = document.createElement("style");
        styleEl.textContent = `
            #question-summary {
                max-height: 400px;
                overflow-y: auto;
                margin-top: 20px;
            }
            .question-result {
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            }
            .correct {
                color: green;
                font-weight: bold;
            }
            .incorrect {
                color: red;
                font-weight: bold;
            }
            .not-attempted {
                color: orange;
                font-weight: bold;
            }
        `;
        document.head.appendChild(styleEl);

        resultDiv.style.display = "block";

        // Disable all inputs but keep navigation buttons enabled
        document.querySelectorAll("input[type=radio]").forEach(input => {
            input.disabled = true;
        });

        // Only disable submit button, keep navigation buttons active
        submitBtn.disabled = true;

        // Highlight correct and incorrect answers on the quiz interface
        questions.forEach((question, qIndex) => {
            const qName = `q${qIndex + 1}`;
            const options = question.querySelectorAll("label");
            const userChoice = userAnswers[qName];
            const correctChoice = correctAnswers[qName];

            options.forEach(label => {
                const input = label.querySelector("input");
                const value = input.value;

                // Reset any existing styling
                label.classList.remove("correct-answer", "incorrect-answer", "user-choice");

                // Apply new styling based on correctness
                if (value === correctChoice) {
                    label.classList.add("correct-answer");
                }

                if (userChoice === value && userChoice !== correctChoice) {
                    label.classList.add("incorrect-answer");
                }

                if (userChoice === value) {
                    label.classList.add("user-choice");
                }
            });
        });

        // Add CSS for answer labels
        const quizStyleEl = document.createElement("style");
        quizStyleEl.textContent = `
            .correct-answer {
                background-color: rgba(0, 128, 0, 0.2) !important;
                border-left: 5px solid green !important;
                padding-left: 10px !important;
                font-weight: bold;
                position: relative;
            }
            
            .correct-answer::after {
                content: "✓ Correct Answer";
                position: absolute;
                right: 10px;
                color: green;
                font-weight: bold;
            }
            
            .incorrect-answer {
                background-color: rgba(255, 0, 0, 0.1) !important;
                border-left: 5px solid red !important;
                padding-left: 10px !important;
                text-decoration: line-through;
                color: #777;
                position: relative;
            }
            
            .incorrect-answer::after {
                content: "✗ Incorrect";
                position: absolute;
                right: 10px;
                color: red;
                font-weight: bold;
            }
            
            .user-choice {
                font-weight: bold;
            }
            
            label {
                display: block;
                margin: 10px 0;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ddd;
                transition: all 0.3s ease;
            }
            
            /* Add some spacing between submit button and next/prev buttons */
            #submitBtn {
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                width: 100%;
                padding: 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
            
            #submitBtn:hover {
                background-color: #45a049;
            }
        `;
        document.head.appendChild(quizStyleEl);

        // End quiz state
        quizStarted = false;

        // Update navigation display after submission
        showQuestion(currentQuestionIndex);
    }

    // Event listeners
    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        }
    });

    submitBtn.addEventListener("click", function () { submitQuiz(false); });

    // Initialize the quiz and start timer immediately
    showQuestion(0);
    quizStarted = true;
    updateTimer();
});