// Custom language definition for Squirrel (nut) for Prism.js
Prism.languages.squirrel = {
    'comment': { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)|(^|[^\\:])\/\/.*/, lookbehind: true },
    'string': { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:""|[^"])*"/, greedy: true },
    'class-name': { pattern: /(\b(?:class|extends)\s+)\w+/i, lookbehind: true },
    'keyword': /\b(?:break|case|catch|class|clone|continue|const|default|delegate|delete|do|else|enum|extends|for|foreach|function|if|in|local|resume|return|switch|this|throw|try|typeof|while|yield|constructor|instanceof|static|true|false|null|vargc|vargv)\b/,
    'function': /\b\w+(?=\s*\()/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /<-|->|!=|==|<=|>=|&&|\|\||\+\+|--|[<>+\-*/%&|^~!=?]/,
    'punctuation': /[{}[\];(),.:]/
};
Prism.languages.nut = Prism.languages.squirrel;

document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // THE BOOK DATA
    // =================================================================================
    const bookData = [
        {
            id: 'welcome', part: 'Welcome', title: 'Introduction', file: 'chapters/welcome.html'
        },
        {
            id: 'what-is-a-script', part: 'Part 0: The Language of Logic', title: 'What is a Script?', file: 'chapters/chapter0/ch01_what_is_a_script.html'
        },
        {
            id: 'variables-data-types', part: 'Part 0: The Language of Logic', title: 'Variables & Data Types', file: 'chapters/chapter0/ch02_variables.html',
            quiz: [
                { question: "You want to create a variable to track the time remaining in a puzzle, starting at 90.5 seconds. Which line of code is correct?", options: [ "<code>local timeRemaining = 90.5</code>", "<code>local time_remaining = \"90.5\"</code>", "<code>var timeRemaining = 90.5</code>", "<code>local time = 90,5</code>" ], answer: 0, explanation: "This correctly uses the `local` keyword and a float value. Option B is a string, C uses an invalid keyword for Squirrel, and D uses a comma instead of a decimal point." },
                { question: "A script contains the line <code>local turretIsActive = true;</code>. What data type is <code>turretIsActive</code>?", options: ["String", "Integer", "Float", "Bool"], answer: 3, explanation: "The value `true` is one of the two possible Boolean values (`true` or `false`), making the data type Bool." },
                { question: "Which of the following is a <strong>String</strong>?", options: ["<code>GLaDOS</code>", "<code>\"12345\"</code>", "<code>false</code>", "<code>20.0</code>"], answer: 1, explanation: "Even though it contains numbers, the double quotes `\"\"` make it a string. The other options are an invalid variable name (without quotes), a bool, and a float." }
            ]
        },
        {
            id: 'operators', part: 'Part 0: The Language of Logic', title: 'Operators', file: 'chapters/chapter0/ch03_operators.html',
             quiz: [
                { question: "Given <code>local powerActive = true;</code> and <code>local waterIsToxic = true;</code>, what is the result of the expression <code>powerActive == true && waterIsToxic == false</code>?", options: ["<code>true</code>", "<code>false</code>", "<code>null</code>", "It will cause an error."], answer: 1, explanation: "For `&&` (AND) to be true, both sides must be true. Since `waterIsToxic == false` is false, the entire expression becomes false." },
                { question: "A door should open if the player presses a button (<code>buttonPressed</code> is <code>true</code>) OR if the player has a keycard (<code>hasKeycard</code> is <code>true</code>). Which <code>if</code> statement correctly represents this logic?", options: ["<code>if (buttonPressed && hasKeycard)</code>", "<code>if (buttonPressed || hasKeycard)</code>", "<code>if (!buttonPressed)</code>", "<code>if (buttonPressed != hasKeycard)</code>"], answer: 1, explanation: "The `||` (OR) operator is the correct choice for a condition that should be met if one *or* the other (or both) are true." }
            ]
        },
        {
            id: 'if-else-viz', part: 'Part 0: The Language of Logic', title: 'Making Decisions', file: 'chapters/chapter0/ch04_if_else.html'
        },
        {
            id: 'loops-detailed', part: 'Part 0: The Language of Logic', title: 'Repeating with Loops', file: 'chapters/chapter0/ch05_loops.html',
            quiz: [
                { question: "How many times will the message \"Testing...\" be printed by this loop? <br><code>for (local i = 1; i <= 3; i++) { printl(\"Testing...\") }</code>", options: ["2 times", "3 times", "4 times", "It will loop forever."], answer: 1, explanation: "The loop runs for `i = 1`, `i = 2`, and `i = 3`. When `i` becomes 4, the condition `4 <= 3` is false, and the loop terminates." },
                { question: "Look at this <code>while</code> loop. What is the potential problem?<br><pre><code class='language-squirrel'>local timer = 10\nwhile (timer > 0)\n{\n    printl(\"Time left: \" + timer)\n}</code></pre>", options: ["There is no problem.", "It will run 10 times and stop.", "It will cause an infinite loop.", "It will not run at all."], answer: 2, explanation: "The variable `timer` is never changed inside the loop. Since it starts at 10, the condition `timer > 0` will *always* be true, and the loop will never end. You would need to add `timer--` inside the loop to fix it." }
            ]
        },
        {
            id: 'functions-first-class', part: 'Part 0: The Language of Logic', title: 'Organizing with Functions', file: 'chapters/chapter0/ch06_functions.html',
            quiz: [
                { question: "Which keyword is used to send a value back from a function to the code that called it?", options: [ "<code>output</code>", "<code>send</code>", "<code>return</code>", "<code>yield</code>" ], answer: 2, explanation: "`return` is the correct keyword. It immediately stops the function and sends the specified value back." },
                { question: "Given the function below, what will be printed to the console?<br><pre><code class='language-squirrel'>function Greet(name) { printl(\"Welcome, \" + name) }\nGreet(\"Chell\")</code></pre>", options: ["Welcome, name", "Welcome, Chell", "An error will occur.", "Greet(\"Chell\")"], answer: 1, explanation: "The string \"Chell\" is passed as an argument and assigned to the 'name' parameter inside the function, which is then used by the `printl` command." },
                { question: "A function is stored in a table like this: <code>MyActions.OpenDoor <- function() { ... }</code>. How do you correctly call this function?", options: ["<code>call MyActions.OpenDoor</code>", "<code>MyActions.OpenDoor()</code>", "<code>run MyActions.OpenDoor()</code>", "<code>MyActions.OpenDoor</code>"], answer: 1, explanation: "To execute or 'call' a function, you use its full name followed by parentheses `()`, even if it's stored inside a table." }
            ]
        },
        {
            id: 'squirrel-tables', part: 'Part 1: Data Structures in Squirrel', title: 'The Heart of Squirrel: Tables', file: 'chapters/chapter1/ch01_tables.html',
            quiz: [
                { question: "You have a table <code>local portalGun = {}</code>. Which line of code correctly adds a new slot to track that it's the `blue` portal?", options: [ "<code>portalGun.color = \"blue\"</code>", "<code>local portalGun.color <- \"blue\"</code>", "<code>portalGun.color <- \"blue\"</code>", "<code>portalGun[\"color\"] = \"blue\"</code>" ], answer: 2, explanation: "The `<-` operator is used to create a new slot. A and D use `=`, which would cause an error because the 'color' slot doesn't exist yet. B uses incorrect syntax." },
                { question: "Given the code below, what will be printed to the console?<br><pre><code class='language-squirrel'>local frankenTurret = {}\nfrankenTurret.type <- \"Cube-Turret Hybrid\"\nfrankenTurret.type = \"Defective Turret\"\nprintl(frankenTurret.type)</code></pre>", options: ["Cube-Turret Hybrid", "Defective Turret", "An error will occur.", "null"], answer: 1, explanation: "The `<-` creates the slot. The `=` then successfully modifies the value of the existing slot." }
            ]
        },
        {
            id: 'squirrel-arrays', part: 'Part 1: Data Structures in Squirrel', title: 'Ordered Data: Arrays', file: 'chapters/chapter1/ch02_arrays.html'
        },
        {
            id: 'connecting-logic-script', part: 'Part 2: Connecting to the World', title: 'The `logic_script` Entity', file: 'chapters/chapter2/ch01_logic_script.html'
        },
        {
            id: 'connecting-scope', part: 'Part 2: Connecting to the World', title: 'Understanding Scope', file: 'chapters/chapter2/ch02_scope.html',
            quiz: [
                { question: "Script 'a.nut' runs `myVar <- 10`. Script 'b.nut' runs `myVar <- 20`. Afterwards, what is the value of `myVar` inside script 'a.nut'?", options: ["10", "20", "null", "It will cause an error."], answer: 0, explanation: "Each script has its own separate scope. Changing `myVar` in script 'b.nut' does not affect the completely separate variable with the same name in script 'a.nut'." },
                { question: "Script 'a.nut' runs `::globalStatus <- \"Active\"`. Script 'b.nut' then runs `printl(::globalStatus)`. What will be printed?", options: ["null", "\"Active\"", "An error will occur.", "globalStatus"], answer: 1, explanation: "The `::` operator places the variable in the global root table, which is a shared space. Script 'b.nut' can correctly access it using the same `::` operator." }
            ]
        },
        {
            id: 'connecting-entity-scripts', part: 'Part 2: Connecting to the World', title: 'Entity Scripts', file: 'chapters/chapter2/ch03_entity_scripts.html'
        },
        {
            id: 'connecting-entity-io', part: 'Part 2: Connecting to the World', title: 'Entity I/O & The Actors', file: 'chapters/chapter2/ch04_entity_io.html',
            quiz: [
                { question: "A player presses a button, which fires an input to a door with a script. Inside the door's script function, what does the `caller` variable refer to?", options: ["The door", "The player", "The button", "null"], answer: 2, explanation: "`self` is the door, `activator` is the player, and `caller` is the entity that fired the input directly, which is the button." }
            ]
        },
        {
            id: 'connecting-timers', part: 'Part 2: Connecting to the World', title: 'Controlling Time', file: 'chapters/chapter2/ch05_timers.html'
        },
        {
            id: 'creator-vectors', part: 'Part 3: Becoming a Creator', title: 'Math & Vectors', file: 'chapters/chapter3/ch01_vectors.html'
        },
        {
            id: 'creator-finding-advanced', part: 'Part 3: Becoming a Creator', title: 'Finding Entities', file: 'chapters/chapter3/ch02_finding.html'
        },
        {
            id: 'creator-hooks-example', part: 'Part 3: Becoming a Creator', title: 'Hooks & Think Functions', file: 'chapters/chapter3/ch03_hooks.html',
            quiz: [
                { question: "What is the primary purpose of a Think function in VScript?", options: ["To run code in response to a specific player input.", "To run code repeatedly at a regular interval.", "To run code only once when the map starts.", "To stop an entity from moving."], answer: 1, explanation: "Think functions are designed for continuous or periodic checks and actions, like a security camera constantly watching an area or a hazard damaging a player over time." },
                { question: "Inside a Think function named `MyThink`, how do you make it run again in exactly 0.5 seconds?", options: ["<code>self.ThinkNext(0.5)</code>", "<code>yield 0.5</code>", "<code>return 0.5</code>", "<code>return false</code>"], answer: 2, explanation: "Returning a positive float value from a Think function tells the engine to schedule the next think for that many seconds in the future. `yield` is for PCapture-Lib's scheduler, and returning `false` or a negative number would disable the think." },
                { question: "You have a door with an Input Hook called <code>InputLock</code>. What must this function do to PREVENT the door from locking?", options: ["<code>return true</code>", "<code>return null</code>", "<code>return false</code>", "Nothing, the function just needs to exist."], answer: 2, explanation: "Returning `false` from an Input Hook function tells the engine to cancel the original input, effectively blocking it." }
            ]
        },
        {
            id: 'creator-debug', part: 'Part 3: Becoming a Creator', title: 'Debugging Your Scripts', file: 'chapters/chapter3/ch04_debug.html'
        },
        {
            id: 'organizing-tables-as-objects', part: 'Part 4: Writing Clean & Creative Code', title: 'Organizing with Tables', file: 'chapters/chapter4/ch01_data_organization.html'
        },
        {
            id: 'organizing-libraries', part: 'Part 4: Writing Clean & Creative Code', title: 'Reusable Code: Libraries', file: 'chapters/chapter4/ch02_libraries.html'
        },
        {
            id: 'organizing-traceline', part: 'Part 4: Writing Clean & Creative Code', title: 'Seeing the World: TraceLine', file: 'chapters/chapter4/ch03_traceline.html'
        },
        {
            id: 'organizing-hacks', part: 'Part 4: Writing Clean & Creative Code', title: 'Hacking the Engine', file: 'chapters/chapter4/ch04_engine_hacks.html'
        },
        {
            id: 'pcap-intro', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'Intro to PCapture-Lib', file: 'chapters/chapter5/ch01_pcap_intro.html'
        },
        {
            id: 'pcap-smarter-entities', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'Smarter Entities: pcapEntity', file: 'chapters/chapter5/ch02_pcap_entity.html'
        },
        {
            id: 'pcap-scheduler', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'Perfect Timing: ActionScheduler', file: 'chapters/chapter5/ch03_pcap_scheduler.html'
        },
        {
            id: 'pcap-traceplus', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The Ultimate Tool: TracePlus', file: 'chapters/chapter5/ch04_pcap_traceplus.html'
        },
        {
            id: 'pcap-animations', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The Animations Module', file: 'chapters/chapter5/ch05_pcap_animations.html'
        },
        {
            id: 'pcap-hud', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The HUD Module', file: 'chapters/chapter5/ch06_pcap_hud.html'
        },
        {
            id: 'pcap-scriptevents', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The ScriptEvents Module', file: 'chapters/chapter5/ch07_pcap_scriptevents.html',
            quiz: [
                { question: "You need a script to perform a sequence: 1. A panel moves up. 2. Wait 2 seconds. 3. A sound plays. Which PCapture-Lib module is *best* for managing this timing?", options: [ "<code>Animations</code>", "<code>TracePlus</code>", "<code>ActionScheduler</code>", "<code>HUD</code>" ], answer: 2, explanation: "The `ActionScheduler` with `yield 2.0` is the perfect tool for creating timed sequences of events in a clean, readable way." },
                { question: "You want to make a cube slowly move from its current position to a point 256 units above it over 4 seconds. Which function is ideal for this?", options: [ "<code>pcapEntity.SetOrigin()</code> inside a <code>for</code> loop.", "<code>animate.PositionTransitionByTime()</code>", "<code>ScheduleEvent.Add()</code> with a <code>yield</code>.", "<code>TracePlus.PortalBbox()</code>" ], answer: 1, explanation: "The `animate.PositionTransitionByTime()` function from the Animations module is specifically designed to handle smooth movement between two points over a set duration." }
            ]
        },
        {
            id: 'conclusion', part: 'Conclusion', title: 'Where to Go From Here', file: 'chapters/conclusion.html'
        }
    ];
    
    // =================================================================================
    // SITE LOGIC
    // =================================================================================
    let currentChapterIndex = 0;
    let currentQuizState = {};
    let quizResults = {};

    const savedResults = localStorage.getItem('vscript-book-quiz-results');
    if (savedResults) {
        try {
            quizResults = JSON.parse(savedResults);
        } catch (e) {
            console.error("Could not parse saved quiz results:", e);
            quizResults = {}; // Reset to empty if data is corrupted
        }
    }

    const tocElement = document.getElementById('toc');
    const chapterContainer = document.getElementById('chapter-container');
    const prevArrow = document.getElementById('prev-chapter-arrow');
    const nextArrow = document.getElementById('next-chapter-arrow');
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const quizModal = document.getElementById('quiz-modal');
    const quizContent = document.getElementById('quiz-content');
    const quizActionBtn = document.getElementById('quiz-action-btn');
    const quizCloseXBtn = document.getElementById('quiz-close-x-btn');
    const quizCounter = document.getElementById('quiz-counter');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const whyFullscreenLink = document.getElementById('why-fullscreen-link');
    const whyFullscreenText = document.getElementById('why-fullscreen-text');
    
    function buildTOC() {
        let currentPart = '';
        const tocHTML = bookData.map((chapter, index) => {
            let partHeader = '';
            if (chapter.part !== currentPart) {
                currentPart = chapter.part;
                partHeader = `<li class="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600"><strong class="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">${currentPart}</strong></li>`;
            }
            return `${partHeader}<li><a href="#" data-index="${index}" class="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">${chapter.title}</a></li>`;
        }).join('');
        tocElement.innerHTML = tocHTML;
    }

    function loadChapter(index) {
        currentChapterIndex = index;
        const chapterData = bookData[index];
        
        fetch(chapterData.file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load chapter: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                chapterContainer.innerHTML = `<div id="chapter-${chapterData.id}" class="chapter-content">${html}</div>`;
                Prism.highlightAllUnder(chapterContainer);
                
                // Update URL and Title
                history.pushState({index: index}, chapterData.title, '#' + chapterData.id);
                document.title = `${chapterData.title} - The VScript Book`;

                updateUI();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                chapterContainer.innerHTML = `<div class="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded-r-lg"><p class="font-bold">Error loading chapter content.</p><p>${error}</p></div>`;
                updateUI();
            });
    }
    
    function updateUI() {
        prevArrow.classList.toggle('hidden', currentChapterIndex === 0);
        nextArrow.classList.toggle('hidden', currentChapterIndex === bookData.length - 1);

        document.querySelectorAll('#toc a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`#toc a[data-index="${currentChapterIndex}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        const chapterData = bookData[currentChapterIndex];
        const currentChapterElement = chapterContainer.querySelector(`#chapter-${chapterData.id}`);

        if (chapterData.quiz && chapterData.quiz.length > 0 && currentChapterElement) {
            let quizBtn = currentChapterElement.querySelector('#start-quiz-btn');
            if (!quizBtn) {
                quizBtn = document.createElement('button');
                quizBtn.id = 'start-quiz-btn';
                quizBtn.className = 'not-prose mt-12 w-full py-3 rounded-lg font-bold transition-colors';
                currentChapterElement.appendChild(quizBtn);
                quizBtn.addEventListener('click', startQuiz);
            }
            
            const result = quizResults[chapterData.id];
            if (result) {
                quizBtn.textContent = `${result.passed ? 'Quiz Passed' : 'Quiz Failed - Retry'} (${result.score}/${result.total})`;
                quizBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700', 'bg-green-600', 'hover:bg-green-700', 'bg-red-600', 'hover:bg-red-700');
                if (result.passed) {
                    quizBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
                } else {
                    quizBtn.classList.add('bg-red-600', 'hover:bg-red-700', 'text-white');
                }
            } else {
                quizBtn.textContent = 'Test Your Knowledge';
                quizBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'bg-red-600', 'hover:bg-red-700');
                quizBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700', 'text-white');
            }
        }
    }

    function startQuiz() {
        const chapter = bookData[currentChapterIndex];
        currentQuizState = {
            questionIndex: 0,
            correctCount: 0,
            answers: {}
        };
        quizModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderCurrentQuestion();
    }

    function closeQuiz() {
        quizModal.classList.add('hidden');
        document.body.style.overflow = '';
        updateUI(); // Refresh the button state on the main page
    }

    function renderCurrentQuestion() {
        const chapter = bookData[currentChapterIndex];
        const q = chapter.quiz[currentQuizState.questionIndex];
        quizCounter.textContent = `Question ${currentQuizState.questionIndex + 1} / ${chapter.quiz.length}`;

        quizContent.innerHTML = `
            <div class="quiz-question" data-qindex="${currentQuizState.questionIndex}">
                <p class="font-semibold mb-3">${q.question}</p>
                <div class="space-y-2">
                    ${q.options.map((opt, oIndex) => `
                        <div class="quiz-option border-2 border-gray-300 dark:border-gray-600 p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all" data-oindex="${oIndex}">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
                <div class="explanation mt-3 text-sm hidden p-3 rounded-md"></div>
            </div>
        `;
        
        quizActionBtn.textContent = "Check Answer";
        quizActionBtn.disabled = true;
    }

    function handleQuizAction() {
        const state = quizActionBtn.textContent;
        const chapter = bookData[currentChapterIndex];

        if (state === "Check Answer") {
            const q = chapter.quiz[currentQuizState.questionIndex];
            const questionDiv = quizContent.querySelector(`.quiz-question[data-qindex="${currentQuizState.questionIndex}"]`);
            const selectedOptionIndex = currentQuizState.answers[currentQuizState.questionIndex];
            const explanationDiv = questionDiv.querySelector('.explanation');
            
            questionDiv.querySelectorAll('.quiz-option').forEach(opt => opt.style.pointerEvents = 'none');
            
            if (selectedOptionIndex === q.answer) {
                currentQuizState.correctCount++;
            }

            const selectedOptionDiv = questionDiv.querySelector(`.quiz-option[data-oindex="${selectedOptionIndex}"]`);
            if (selectedOptionDiv && selectedOptionIndex !== q.answer) {
                selectedOptionDiv.classList.add('incorrect');
            }

            const correctOptionDiv = questionDiv.querySelector(`.quiz-option[data-oindex="${q.answer}"]`);
            correctOptionDiv.classList.add('correct');

            if (q.explanation) {
                explanationDiv.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
                explanationDiv.classList.remove('hidden');
                explanationDiv.classList.add('bg-gray-100', 'dark:bg-gray-800');
            }

            if (currentQuizState.questionIndex < chapter.quiz.length - 1) {
                quizActionBtn.textContent = "Next Question";
            } else {
                quizActionBtn.textContent = "Finish";
            }
            quizActionBtn.disabled = false;

        } else if (state === "Next Question") {
            currentQuizState.questionIndex++;
            renderCurrentQuestion();
        } else if (state === "Finish") {
            const chapterId = chapter.id;
            const total = chapter.quiz.length;
            const score = currentQuizState.correctCount;
            quizResults[chapterId] = {
                score: score,
                total: total,
                passed: (score / total) >= 0.5 // Pass if 50% or more are correct
            };

            try {
                localStorage.setItem('vscript-book-quiz-results', JSON.stringify(quizResults));
            } catch (e) {
                console.error("Failed to save quiz results:", e);
            }
            
            closeQuiz();
        }
    }

    function applyTheme(isDark) {
        const prismLink = document.querySelector('link[href*="prism"]');
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
            if (prismLink) prismLink.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css";
        } else {
            document.documentElement.classList.remove('dark');
            themeIconLight.classList.remove('hidden');
            themeIconDark.classList.add('hidden');
            if (prismLink) prismLink.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
        }
    }
    
    // --- EVENT LISTENERS ---
    tocElement.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.dataset.index) {
            loadChapter(parseInt(link.dataset.index));
        }
    });

    prevArrow.addEventListener('click', (e) => { 
        e.preventDefault();
        if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1); 
    });
    nextArrow.addEventListener('click', (e) => { 
        e.preventDefault();
        if (currentChapterIndex < bookData.length - 1) loadChapter(currentChapterIndex + 1); 
    });

    themeSwitcher.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem('vscript-book-theme', isDark ? 'dark' : 'light');
        applyTheme(isDark);
    });

    quizCloseXBtn.addEventListener('click', closeQuiz);
    quizActionBtn.addEventListener('click', handleQuizAction);

    quizContent.addEventListener('click', (e) => {
        const option = e.target.closest('.quiz-option');
        if (option && quizActionBtn.textContent === "Check Answer") {
            const questionDiv = option.closest('.quiz-question');
            const qIndex = parseInt(questionDiv.dataset.qindex);
            const oIndex = parseInt(option.dataset.oindex);
            currentQuizState.answers[qIndex] = oIndex;
            questionDiv.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            quizActionBtn.disabled = false;
        }
    });

    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('sidebar-hidden');
    });
    
    whyFullscreenLink.addEventListener('click', (e) => {
        e.preventDefault();
        whyFullscreenText.classList.toggle('hidden');
    });

    // --- INITIALIZATION ---
    buildTOC();
    
    // --- Initial load from URL hash ---
    const initialHash = window.location.hash.substring(1);
    let initialChapterIndex = 0;
    if (initialHash) {
        const foundIndex = bookData.findIndex(chapter => chapter.id === initialHash);
        if (foundIndex !== -1) {
            initialChapterIndex = foundIndex;
        }
    }
    loadChapter(initialChapterIndex);
    
    const savedTheme = localStorage.getItem('vscript-book-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
});