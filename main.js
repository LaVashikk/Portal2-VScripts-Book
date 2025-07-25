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
    // THE BOOK DATA (METADATA AND QUIZZES)
    // Content is now fetched from separate files.
    // =================================================================================
    const bookData = [
        {
            id: 'welcome', part: 'Welcome', title: 'Introduction', file: 'chapters/welcome.html'
        },
        {
            id: 'what-is-a-script', part: 'Part 0: The Language of Logic', title: 'What is a Script?', file: 'chapters/p0_ch1_what_is_a_script.html'
        },
        {
            id: 'variables-data-types', part: 'Part 0: The Language of Logic', title: 'Variables & Data Types', file: 'chapters/p0_ch2_variables.html',
            quiz: [
                { question: "You want to create a variable to track the time remaining in a puzzle, starting at 90.5 seconds. Which line of code is correct?", options: [ "<code>local timeRemaining = 90.5</code>", "<code>local time_remaining = \"90.5\"</code>", "<code>var timeRemaining = 90.5</code>", "<code>local time = 90,5</code>" ], answer: 0, explanation: "This correctly uses the `local` keyword and a float value. Option B is a string, C uses an invalid keyword for Squirrel, and D uses a comma instead of a decimal point." },
                { question: "A script contains the line <code>local turretIsActive = true;</code>. What data type is <code>turretIsActive</code>?", options: ["String", "Integer", "Float", "Bool"], answer: 3, explanation: "The value `true` is one of the two possible Boolean values (`true` or `false`), making the data type Bool." },
                { question: "Which of the following is a <strong>String</strong>?", options: ["<code>GLaDOS</code>", "<code>\"12345\"</code>", "<code>false</code>", "<code>20.0</code>"], answer: 1, explanation: "Even though it contains numbers, the double quotes `\"\"` make it a string. The other options are an invalid variable name (without quotes), a bool, and a float." }
            ]
        },
        {
            id: 'operators', part: 'Part 0: The Language of Logic', title: 'Operators', file: 'chapters/p0_ch3_operators.html',
             quiz: [
                { question: "Given <code>local powerActive = true;</code> and <code>local waterIsToxic = true;</code>, what is the result of the expression <code>powerActive == true && waterIsToxic == false</code>?", options: ["<code>true</code>", "<code>false</code>", "<code>null</code>", "It will cause an error."], answer: 1, explanation: "For `&&` (AND) to be true, both sides must be true. Since `waterIsToxic == false` is false, the entire expression becomes false." },
                { question: "A door should open if the player presses a button (<code>buttonPressed</code> is <code>true</code>) OR if the player has a keycard (<code>hasKeycard</code> is <code>true</code>). Which <code>if</code> statement correctly represents this logic?", options: ["<code>if (buttonPressed && hasKeycard)</code>", "<code>if (buttonPressed || hasKeycard)</code>", "<code>if (!buttonPressed)</code>", "<code>if (buttonPressed != hasKeycard)</code>"], answer: 1, explanation: "The `||` (OR) operator is the correct choice for a condition that should be met if one *or* the other (or both) are true." }
            ]
        },
        {
            id: 'if-else-viz', part: 'Part 0: The Language of Logic', title: 'Making Decisions', file: 'chapters/p0_ch4_if_else.html'
        },
        {
            id: 'loops-detailed', part: 'Part 0: The Language of Logic', title: 'Repeating with Loops', file: 'chapters/p0_ch5_loops.html',
            quiz: [
                { question: "How many times will the message \"Testing...\" be printed by this loop? <br><code>for (local i = 1; i <= 3; i++) { printl(\"Testing...\") }</code>", options: ["2 times", "3 times", "4 times", "It will loop forever."], answer: 1, explanation: "The loop runs for `i = 1`, `i = 2`, and `i = 3`. When `i` becomes 4, the condition `4 <= 3` is false, and the loop terminates." },
                { question: "Look at this <code>while</code> loop. What is the potential problem?<br><pre><code class='language-squirrel'>local timer = 10\nwhile (timer > 0)\n{\n    printl(\"Time left: \" + timer)\n}</code></pre>", options: ["There is no problem.", "It will run 10 times and stop.", "It will cause an infinite loop.", "It will not run at all."], answer: 2, explanation: "The variable `timer` is never changed inside the loop. Since it starts at 10, the condition `timer > 0` will *always* be true, and the loop will never end. You would need to add `timer--` inside the loop to fix it." }
            ]
        },
        {
            id: 'functions-first-class', part: 'Part 0: The Language of Logic', title: 'Organizing with Functions', file: 'chapters/p0_ch6_functions.html'
        },
        {
            id: 'squirrel-tables', part: 'Part 1: Learning the Dialect', title: 'The Heart of Squirrel: Tables', file: 'chapters/p1_ch1_tables.html',
            quiz: [
                { question: "You have a table <code>local portalGun = {}</code>. Which line of code correctly adds a new slot to track that it's the `blue` portal?", options: [ "<code>portalGun.color = \"blue\"</code>", "<code>local portalGun.color <- \"blue\"</code>", "<code>portalGun.color <- \"blue\"</code>", "<code>portalGun[\"color\"] = \"blue\"</code>" ], answer: 2, explanation: "The `<-` operator is used to create a new slot. A and D use `=`, which would cause an error because the 'color' slot doesn't exist yet. B uses incorrect syntax." },
                { question: "Given the code below, what will be printed to the console?<br><pre><code class='language-squirrel'>local frankenTurret = {}\nfrankenTurret.type <- \"Cube-Turret Hybrid\"\nfrankenTurret.type = \"Defective Turret\"\nprintl(frankenTurret.type)</code></pre>", options: ["Cube-Turret Hybrid", "Defective Turret", "An error will occur.", "null"], answer: 1, explanation: "The `<-` creates the slot. The `=` then successfully modifies the value of the existing slot." }
            ]
        },
        {
            id: 'squirrel-arrays', part: 'Part 1: Learning the Dialect', title: 'Ordered Data: Arrays', file: 'chapters/p1_ch2_arrays.html'
        },
        {
            id: 'squirrel-scope', part: 'Part 1: Learning the Dialect', title: 'Scope & The Root Table', file: 'chapters/p1_ch3_scope.html'
        },
        {
            id: 'connecting-logic-script', part: 'Part 2: Connecting to the World', title: 'The logic_script Entity', file: 'chapters/p2_ch1_logic_script.html'
        },
        {
            id: 'connecting-entity-scripts', part: 'Part 2: Connecting to the World', title: 'Entity Scripts & `self`', file: 'chapters/p2_ch2_entity_scripts.html'
        },
        {
            id: 'connecting-entity-io', part: 'Part 2: Connecting to the World', title: 'Running Code with Entity I/O', file: 'chapters/p2_ch3_entity_io.html',
            quiz: [
                { question: "You want a script named `init.nut` to run once, right when your map begins. What entity should you use?", options: ["<code>logic_relay</code>", "<code>logic_script</code>", "<code>info_player_start</code>", "<code>prop_dynamic</code>"], answer: 1, explanation: "The `logic_script` entity's entire purpose is to run VScript files for map-wide logic at startup." },
                { question: "Inside an entity script attached to a <code>prop_button</code>, what special variable do you use to refer to the button itself?", options: ["<code>this</code>", "<code>button</code>", "<code>entity</code>", "<code>self</code>"], answer: 3, explanation: "`self` is always the script handle to the entity the script is attached to in Portal 2's VScript." }
            ]
        },
        {
            id: 'connecting-console', part: 'Part 2: Connecting to the World', title: 'The Debug Console', file: 'chapters/p2_ch4_console.html'
        },
        {
            id: 'interacting-vectors', part: 'Part 3: Becoming a Creator', title: 'Navigating 3D Space: Vectors', file: 'chapters/p3_ch1_vectors.html'
        },
        {
            id: 'interacting-finding-advanced', part: 'Part 3: Becoming a Creator', title: 'Finding Entities (Advanced)', file: 'chapters/p3_ch2_finding.html'
        },
        {
            id: 'interacting-hooks-example', part: 'Part 3: Becoming a Creator', title: 'Hooks & Think Functions', file: 'chapters/p3_ch3_hooks.html',
            quiz: [
                { question: "You have a door with an Input Hook called <code>InputLock</code>. What must this function do to PREVENT the door from locking?", options: ["<code>return true</code>", "<code>return null</code>", "<code>return false</code>", "Nothing, the function just needs to exist."], answer: 2, explanation: "Returning `false` from an Input Hook function tells the engine to cancel the original input, effectively blocking it." }
            ]
        },
        {
            id: 'pcap-intro', part: 'Part 4: Advanced Techniques', title: 'Intro to PCapture-Lib', file: 'chapters/p4_ch1_pcap_intro.html'
        },
        {
            id: 'pcap-smarter-entities', part: 'Part 4: Advanced Techniques', title: 'Smarter Entities: pcapEntity', file: 'chapters/p4_ch2_pcap_entity.html'
        },
        {
            id: 'pcap-scheduler', part: 'Part 4: Advanced Techniques', title: 'Perfect Timing: ActionScheduler', file: 'chapters/p4_ch3_pcap_scheduler.html'
        },
        {
            id: 'pcap-traceplus', part: 'Part 4: Advanced Techniques', title: 'The Ultimate Tool: TracePlus', file: 'chapters/p4_ch4_pcap_traceplus.html'
        },
        {
            id: 'pcap-animations', part: 'Part 4: Advanced Techniques', title: 'The Animations Module', file: 'chapters/p4_ch5_pcap_animations.html'
        },
        {
            id: 'pcap-hud', part: 'Part 4: Advanced Techniques', title: 'The HUD Module', file: 'chapters/p4_ch6_pcap_hud.html'
        },
        {
            id: 'pcap-scriptevents', part: 'Part 4: Advanced Techniques', title: 'The ScriptEvents Module', file: 'chapters/p4_ch7_pcap_scriptevents.html',
            quiz: [
                { question: "You need a script to perform a sequence: 1. A panel moves up. 2. Wait 2 seconds. 3. A sound plays. Which PCapture-Lib module is *best* for managing this timing?", options: [ "<code>Animations</code>", "<code>TracePlus</code>", "<code>ActionScheduler</code>", "<code>HUD</code>" ], answer: 2, explanation: "The `ActionScheduler` with `yield 2.0` is the perfect tool for creating timed sequences of events in a clean, readable way." },
                { question: "You want to make a cube slowly move from its current position to a point 256 units above it over 4 seconds. Which function is ideal for this?", options: [ "<code>pcapEntity.SetOrigin()</code> inside a <code>for</code> loop.", "<code>animate.PositionTransitionByTime()</code>", "<code>ScheduleEvent.Add()</code> with a <code>yield</code>.", "<code>TracePlus.PortalBbox()</code>" ], answer: 1, explanation: "The `animate.PositionTransitionByTime()` function from the Animations module is specifically designed to handle smooth movement between two points over a set duration." }
            ]
        },
        {
            id: 'conclusion', part: 'Conclusion', title: 'Congratulations!', file: 'chapters/conclusion.html'
        }
    ];

    // =================================================================================
    // SITE LOGIC
    // =================================================================================
    let currentChapterIndex = 0;
    let quizAnswers = {};
    const tocElement = document.getElementById('toc');
    const chapterContainer = document.getElementById('chapter-container');
    const prevBtn = document.getElementById('prev-chapter-btn');
    const nextBtn = document.getElementById('next-chapter-btn');
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const quizModal = document.getElementById('quiz-modal');
    const quizContent = document.getElementById('quiz-content');
    const quizSubmitBtn = document.getElementById('quiz-submit-btn');
    const quizCloseBtn = document.getElementById('quiz-close-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');

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
                updateUI();
                // THE FIX: Scrolls the entire window, not just the content pane.
                window.scrollTo({ top: 0 }); 
            })
            .catch(error => {
                chapterContainer.innerHTML = `<div class="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded-r-lg"><p class="font-bold">Error loading chapter content.</p><p>${error}</p></div>`;
                updateUI();
            });
    }
    
    function updateUI() {
        prevBtn.disabled = currentChapterIndex === 0;
        nextBtn.disabled = currentChapterIndex === bookData.length - 1;

        document.querySelectorAll('#toc a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`#toc a[data-index="${currentChapterIndex}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        const chapterData = bookData[currentChapterIndex];
        const currentChapterElement = chapterContainer.querySelector(`#chapter-${chapterData.id}`);

        if (chapterData.quiz && chapterData.quiz.length > 0 && currentChapterElement) {
            const quizBtn = document.createElement('button');
            quizBtn.id = 'start-quiz-btn';
            quizBtn.textContent = 'Test Your Knowledge';
            quizBtn.className = 'not-prose mt-12 w-full py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors';
            currentChapterElement.appendChild(quizBtn);
            quizBtn.addEventListener('click', startQuiz);
        }

        if (window.innerWidth < 768) {
            sidebar.classList.remove('open');
        }
    }

    function startQuiz() {
        const chapter = bookData[currentChapterIndex];
        quizAnswers = {};
        
        quizContent.innerHTML = chapter.quiz.map((q, qIndex) => `
            <div class="quiz-question" data-qindex="${qIndex}">
                <p class="font-semibold mb-3">${qIndex + 1}. ${q.question}</p>
                <div class="space-y-2">
                    ${q.options.map((opt, oIndex) => `
                        <div class="quiz-option border-2 border-gray-300 dark:border-gray-600 p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all" data-oindex="${oIndex}">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
                <div class="explanation mt-3 text-sm hidden p-3 rounded-md"></div>
            </div>
        `).join('');
        
        quizModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        quizSubmitBtn.classList.remove('hidden');
        quizSubmitBtn.disabled = false;
    }

    function handleQuizSubmit() {
        const chapter = bookData[currentChapterIndex];
        chapter.quiz.forEach((q, qIndex) => {
            const questionDiv = quizContent.querySelector(`.quiz-question[data-qindex="${qIndex}"]`);
            const selectedOptionIndex = quizAnswers[qIndex];
            const explanationDiv = questionDiv.querySelector('.explanation');
            
            questionDiv.querySelectorAll('.quiz-option').forEach(opt => opt.style.pointerEvents = 'none');
            
            if (selectedOptionIndex !== undefined) {
                const selectedOptionDiv = questionDiv.querySelector(`.quiz-option[data-oindex="${selectedOptionIndex}"]`);
                if (selectedOptionIndex === q.answer) {
                    selectedOptionDiv.classList.add('correct');
                } else {
                    selectedOptionDiv.classList.add('incorrect');
                    const correctOptionDiv = questionDiv.querySelector(`.quiz-option[data-oindex="${q.answer}"]`);
                    correctOptionDiv.classList.add('correct');
                }
            } else {
                const correctOptionDiv = questionDiv.querySelector(`.quiz-option[data-oindex="${q.answer}"]`);
                correctOptionDiv.classList.add('correct');
            }

            if(q.explanation) {
                explanationDiv.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
                explanationDiv.classList.remove('hidden');
                explanationDiv.classList.add('bg-gray-100', 'dark:bg-gray-800');
            }
        });
        quizSubmitBtn.disabled = true;
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
    prevBtn.addEventListener('click', () => { if (currentChapterIndex > 0) loadChapter(currentChapterIndex - 1); });
    nextBtn.addEventListener('click', () => { if (currentChapterIndex < bookData.length - 1) loadChapter(currentChapterIndex + 1); });
    themeSwitcher.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem('vscript-book-theme', isDark ? 'dark' : 'light');
        applyTheme(isDark);
    });
    quizCloseBtn.addEventListener('click', () => {
        quizModal.classList.add('hidden');
        document.body.style.overflow = '';
    });
    quizSubmitBtn.addEventListener('click', handleQuizSubmit);
    quizContent.addEventListener('click', (e) => {
        const option = e.target.closest('.quiz-option');
        if (option && !quizSubmitBtn.disabled) {
            const questionDiv = option.closest('.quiz-question');
            const qIndex = parseInt(questionDiv.dataset.qindex);
            const oIndex = parseInt(option.dataset.oindex);
            quizAnswers[qIndex] = oIndex;
            questionDiv.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        }
    });
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
            sidebar.classList.remove('open');
        }
    });

    // --- INITIALIZATION ---
    buildTOC();
    loadChapter(0);
    const savedTheme = localStorage.getItem('vscript-book-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
});
