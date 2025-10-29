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
            id: 'part0-final-exam', part: 'Part 0: The Language of Logic', title: 'Part 0 Final Exam', file: 'chapters/chapter0/ch07_part0_exam.html',
            quiz: [
                { question: "A variable is created with <code>local score = \"100\"</code>. What happens if you then try to run <code>score = score + 50</code>?", options: ["The value of <code>score</code> will be the integer <code>150</code>.", "The value of <code>score</code> will be the string <code>\"10050\"</code>.", "It will cause a script error because you can't add a number to a string.", "The value of <code>score</code> will become <code>null</code>."], answer: 1, explanation: "In Squirrel, the `+` operator performs string concatenation if one of the operands is a string. It will convert the number `50` into the string `\"50\"` and append it to the original string `\"100\"`." },
                { question: "A laser field is controlled by <code>local laserIsOn = true;</code>. You want an <code>if</code> statement to run code ONLY when the laser is OFF. Which of the following conditions is correct?", options: ["<code>if (laserIsOn)</code>", "<code>if (!laserIsOn)</code>", "<code>if (laserIsOn == false)</code>", "Both B and C are correct."], answer: 3, explanation: "To check for when the laser is OFF, `laserIsOn` would need to be `false`. In that case, `!laserIsOn` (which is `!false`) would be `true`, and `laserIsOn == false` would also be `true`. Both are valid ways to check for the condition." },
                { question: "What is the purpose of the <code>break</code> keyword when used inside a `for` or `while` loop?", options: ["It skips the current iteration and proceeds to the next one.", "It stops the entire script from executing any further.", "It immediately terminates the loop and continues execution on the first line after the loop.", "It temporarily pauses the loop."], answer: 2, explanation: "`break` is used to exit a loop structure prematurely. It doesn't affect code outside the loop, nor does it just skip one iteration (that's the job of `continue`)." },
                { question: "A function is defined but has no <code>return</code> statement. If you assign its result to a variable, like <code>local result = MyFunction()</code>, what will be the value of <code>result</code>?", options: ["<code>0</code>", "It will cause a script error.", "<code>null</code>", "<code>true</code>"], answer: 2, explanation: "In Squirrel, if a function completes its execution without encountering an explicit `return` statement, it implicitly returns `null`." }
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
            id: 'squirrel-arrays', part: 'Part 1: Data Structures in Squirrel', title: 'Ordered Data: Arrays', file: 'chapters/chapter1/ch02_arrays.html',
            quiz: [
                 { question: "An array is defined as <code>local panels = [\"A\", \"B\", \"C\"]</code>. What is the correct way to access the value \"B\"?", options: ["<code>panels[0]</code>", "<code>panels[1]</code>", "<code>panels[2]</code>", "<code>panels.B</code>"], answer: 1, explanation: "Array indexing starts at 0. Therefore, \"A\" is at index 0, \"B\" is at index 1, and \"C\" is at index 2." },
                 { question: "How would you add the string \"D\" to the very end of the array <code>local panels = [\"A\", \"B\", \"C\"]</code>?", options: ["<code>panels.add(\"D\")</code>", "<code>panels[3] <- \"D\"</code>", "<code>panels.append(\"D\")</code>", "<code>panels.push(\"D\")</code>"], answer: 2, explanation: "The `.append()` method is the standard Squirrel function for adding an element to the end of an array. While other options might seem plausible, `.append()` is the correct VScript implementation." }
            ]
        },
        {
            id: 'squirrel-strings', part: 'Part 1: Data Structures in Squirrel', title: 'Strings', file: 'chapters/chapter1/ch03_strings.html',
        },
        {
            id: 'part1-final-exam', part: 'Part 1: Data Structures in Squirrel', title: 'Part 1 Final Exam', file: 'chapters/chapter1/part1_exam.html',
            quiz: [
                { question: "Given the table <code>`local settings = { power = 100, status = \"active\" }`</code>, what does the expression <code>`100 in settings`</code> evaluate to?", options: ["<code>true</code>", "<code>false</code>", "It will cause an error.", "<code>100</code>"], answer: 1, explanation: "The `in` operator checks for the existence of a **key**, not a value. Since there is no key named `100` in the table (the keys are `\"power\"` and `\"status\"`), the expression is false." },
                { question: "Under the hood, a Squirrel array like <code>local panels = [10, 20, 30]</code> is actually a special type of what?", options: ["String", "Function", "Table", "Class"], answer: 2, explanation: "This is a key concept in Squirrel. An array is 'syntactic sugar' for a table where the keys are automatically assigned as sequential integers starting from 0 (e.g., `panels[0]`, `panels[1]`, etc.)." },
                { question: "What is the result of using the <code>=</code> operator to assign a value to a key that does not yet exist in a table?", options: ["It creates the new key-value pair (slot).", "It does nothing and fails silently.", "It causes a script error.", "It converts the table into an array."], answer: 2, explanation: "The `=` operator can only modify the value of an existing slot. The `<-` operator must be used to create a new slot. Attempting to use `=` on a non-existent slot is a common error." },
                { question: "Given <code>local data = { turrets = [\"turret_A\", \"turret_B\"] }</code>, how do you correctly access the string `\"turret_B\"`?", options: ["<code>data.turrets.1</code>", "<code>data.turrets[0]</code>", "<code>data.turrets[1]</code>", "<code>data[\"turrets\"][\"B\"]</code>"], answer: 2, explanation: "You use dot notation to access the `turrets` array within the `data` table. Then, you use standard array indexing (starting from 0) to get the second element, which is at index 1." }
            ]
        },
        {
            id: 'connecting-logic-script', part: 'Part 2: Connecting to the World', title: 'The `logic_script` Entity', file: 'chapters/chapter2/ch01_logic_script.html',
            quiz: [
                { question: "In the Hammer editor, you set the `EntityGroup01` property on a `logic_script` to an entity named `exit_door`. How do you access this door in your script?", options: ["<code>EntityGroup[0]</code>", "<code>EntityGroup[1]</code>", "<code>EntityGroup.exit_door</code>", "<code>Entities.FindByName(null, \"exit_door\")</code>"], answer: 1, explanation: "The `EntityGroup00`, `EntityGroup01` etc. properties in Hammer directly map to the indexes `0`, `1`, etc. in the `EntityGroup` array that is automatically created for your script." }
            ]
        },
        {
            id: 'connecting-scope', part: 'Part 2: Connecting to the World', title: 'Understanding Scope', file: 'chapters/chapter2/ch02_scope.html',
            quiz: [
                { question: "Script 'a.nut' runs `myVar <- 10`. Script 'b.nut' runs `myVar <- 20`. Afterwards, what is the value of `myVar` inside script 'a.nut'?", options: ["10", "20", "null", "It will cause an error."], answer: 0, explanation: "Each script has its own separate scope. Changing `myVar` in script 'b.nut' does not affect the completely separate variable with the same name in script 'a.nut'." },
                { question: "Script 'a.nut' runs `::globalStatus <- \"Active\"`. Script 'b.nut' then runs `printl(::globalStatus)`. What will be printed?", options: ["null", "\"Active\"", "An error will occur.", "globalStatus"], answer: 1, explanation: "The `::` operator places the variable in the global root table, which is a shared space. Script 'b.nut' can correctly access it using the same `::` operator." }
            ]
        },
        {
            id: 'connecting-entity-scripts', part: 'Part 2: Connecting to the World', title: 'Entity Scripts', file: 'chapters/chapter2/ch03_entity_scripts.html',
            quiz: [
                { question: "A script named `button_logic.nut` is attached to a `func_button` entity. What will the `self` variable refer to inside this script?", options: ["The player who presses the button", "The `button_logic.nut` text file", "The `func_button` entity itself", "The map's global scope"], answer: 2, explanation: "`self` is a special handle that always refers to the entity instance the script is running on." }
            ]
        },
        {
            id: 'connecting-entity-io', part: 'Part 2: Connecting to the World', title: 'Entity I/O & The Actors', file: 'chapters/chapter2/ch04_entity_io.html',
            quiz: [
                { question: "A player presses a button, which fires an input to a door with a script. Inside the door's script function, what does the `caller` variable refer to?", options: ["The door", "The player", "The button", "null"], answer: 2, explanation: "`self` is the door, `activator` is the player, and `caller` is the entity that fired the input directly, which is the button." }
            ]
        },
        {
            id: 'connecting-timers', part: 'Part 2: Connecting to the World', title: 'Controlling Time', file: 'chapters/chapter2/ch05_timers.html',
            quiz: [
                { question: "You want a light to turn off exactly 3.5 seconds after a function is called. Which line of code achieves this using the standard VScript API?", options: ["<code>EntFire(\"my_light\", \"TurnOff\", \"\", 3.5)</code>", "<code>wait(3.5); EntFire(\"my_light\", \"TurnOff\")</code>", "<code>return 3.5</code>", "<code>EntFire(\"my_light\", \"TurnOff\", 3.5)</code>"], answer: 0, explanation: "The `EntFire` function (and its `EntFireByHandle` variant) takes the delay in seconds as its fourth parameter. The other options are incorrect syntax or logic." }
            ]
        },
        {
            id: 'entity-manipulation', part: 'Part 2: Connecting to the World', title: 'Entity Manipulation', file: 'chapters/chapter2/ch06_advanced_manipulation.html',
        },
        {
            id: 'part2-final-exam', part: 'Part 2: Connecting to the World', title: 'Part 2 Final Exam', file: 'chapters/chapter2/part2_exam.html',
            quiz: [
                { question: "A player (`activator`) stands on a `trigger_once` (`caller`) which fires an `Open` input to a door with a script (`self`). Inside the door's script function that runs, which special variable holds the script handle to the `trigger_once`?", options: ["<code>self</code>", "<code>activator</code>", "<code>caller</code>", "<code>this</code>"], answer: 2, explanation: "`self` is the entity whose script is running (the door). `activator` is the entity that started the entire chain (the player). `caller` is the entity that fired the direct input to `self`, which in this case is the `trigger_once`." },
                { question: "You want a script running on a `logic_script` to modify a variable in another `logic_script`'s scope. How is this accomplished?", options: ["It's not possible; scopes are always completely isolated.", "By creating a local variable in the first script, which the second script can then read.", "By using the `::` operator to create and access a variable in the shared global scope (root table).", "By using `EntFire` to send the variable's value to the other script."], answer: 2, explanation: "By default, script scopes are isolated. The global scope, accessed with `::`, is the designated 'public square' for scripts to share information with each other when necessary." },
                { question: "A script is attached to a `prop_button`. When a function inside this script is executed via an input, what does the `self` variable represent?", options: ["The player who activated the button.", "The button entity itself.", "The script file on the hard drive.", "The global scope (root table)."], answer: 1, explanation: "The `self` handle is always a reference to the entity instance that the script is attached to, regardless of how the script's functions are called." },
                { question: "You are using <code>RunScriptCode</code> to execute a function <code>ActivatePanel(\"blue\")</code>. What is the primary advantage of using <code>RunScriptCode</code> over <code>CallScriptFunction</code> in this case?", options: ["It is faster.", "It allows passing arguments like `\"blue\"` to the function.", "It runs in the global scope instead of the entity's scope.", "It provides better error handling if the function doesn't exist."], answer: 1, explanation: "`CallScriptFunction` can only call a function by its name and cannot pass any parameters. `RunScriptCode` executes the string as code, allowing you to include parameters in the function call." }
            ]
        },
        {
            id: 'creator-vectors', part: 'Part 3: Becoming a Creator', title: 'Math & Vectors', file: 'chapters/chapter3/ch01_vectors.html',
            quiz: [
                { question: "You have two points in space: <code>posA = Vector(10, 0, 0)</code> and <code>posB = Vector(10, 5, 0)</code>. What is the most direct way to calculate the distance between them?", options: ["<code>(posA + posB).Length()</code>", "<code>posA.Length() - posB.Length()</code>", "<code>(posA - posB).Length()</code>", "<code>TraceLine(posA, posB, null)</code>"], answer: 2, explanation: "Subtracting one vector from another creates a new vector representing the direction and distance between them. Calling `.Length()` on that resulting vector gives you the straight-line distance." }
            ]
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
            id: 'sounds', part: 'Part 3: Becoming a Creator', title: 'Sound and Synchronization', file: 'chapters/chapter3/ch05_sound.html'
        },
        {
            id: 'part3-final-exam', part: 'Part 3: Becoming a Creator', title: 'Part 3 Final Exam', file: 'chapters/chapter3/part3_exam.html',
            quiz: [
                { question: "How do you move an entity 50 units forward in the direction it is currently facing?", options: ["<code>ent.SetOrigin(ent.GetOrigin() + 50)</code>", "<code>ent.SetOrigin(ent.GetOrigin() + Vector(50, 0, 0))</code>", "<code>ent.SetOrigin(ent.GetOrigin() + ent.GetForwardVector() * 50)</code>", "<code>ent.SetForwardVector(Vector(50, 0, 0))</code>"], answer: 2, explanation: "`ent.GetForwardVector()` returns a directional vector of length 1 pointing where the entity is facing. Multiplying this by 50 creates a new vector representing that direction and distance. Adding this result to the entity's current origin calculates the correct destination point." },
                { question: "You have an Input Hook function <code>InputLock()</code> on a door. What must this function do to PREVENT the original \"Lock\" input from working?", options: ["<code>return true</code>", "<code>return null</code>", "<code>return false</code>", "Nothing, the function just needs to exist to block the input."], answer: 2, explanation: "Input Hook functions can intercept I/O. If the hook function returns `false`, it signals to the engine to cancel the original input, effectively blocking it. Returning `true` or `null` allows the input to proceed as normal." },
                { question: "Inside a Think Function, what does <code>return 0.25;</code> accomplish?", options: ["It immediately stops the think function from running again.", "It tells the engine to run the think function again in exactly 0.25 seconds.", "It causes a script error, as think functions cannot return values.", "It returns the value 0.25 to the entity that called the think function."], answer: 1, explanation: "Returning a positive float value from a Think Function is the standard mechanism for scheduling the next think. The value represents the delay in seconds." },
                { question: "You want to find all <code>prop_weighted_cube</code> entities within a 256-unit radius of a specific point (`myPos`). Which is the most direct function call for this task?", options: ["<code>Entities.FindByName(null, \"prop_weighted_cube\")</code>", "<code>Entities.FindByClassnameWithin(null, \"prop_weighted_cube\", myPos, 256)</code>", "<code>TraceLine(myPos, Vector(256,256,256), null)</code>", "<code>Entities.FindInSphere(null, myPos, 256)</code>"], answer: 1, explanation: "`FindByClassnameWithin` is the most specific and efficient choice, as it filters by both class and location. `FindInSphere` would also work but is less efficient as it would return all entities in the radius, requiring you to filter them by classname yourself." }
            ]
        },
        {
            id: 'organizing-tables-as-objects', part: 'Part 4: Writing Clean & Creative Code', title: 'Organizing with Tables', file: 'chapters/chapter4/ch01_data_organization.html',
            quiz: [
                { question: "A function inside a table needs to affect the entity the script is attached to. Why can't it use `self` directly?", options: ["`self` is a reserved keyword for the global scope.", "Functions in tables create their own scope where `self` is not defined.", "`self` must be capitalized as `Self` inside tables.", "Tables can only contain data, not access entity handles."], answer: 1, explanation: "When a function inside a table is called, its scope is the table itself (referenced by `this`). The entity's `self` handle from the outer script scope is not automatically visible." },
                { question: "What is the correct way to give a function inside a table access to the entity handle `self`?", options: ["Create a global variable `::g_self = self`.", "Use `return self` at the end of the function.", "Pass `self` as a parameter to the function.", "It's not possible."], answer: 2, explanation: "Passing `self` as an argument (e.g., `MyTable.MyFunction(self)`) is the standard and cleanest way to provide the necessary context to functions organized within tables." }
            ]
        },
        {
            id: 'organizing-libraries', part: 'Part 4: Writing Clean & Creative Code', title: 'Reusable Code: Libraries', file: 'chapters/chapter4/ch02_libraries.html',
            quiz: [
                { question: "You have a library file `my_utils.nut`. What is the correct command to include it in your main script so its functions are available globally?", options: ["<code>IncludeScript(\"my_utils.nut\")</code>", "<code>DoIncludeScript(\"my_utils.nut\")</code>", "<code>DoIncludeScript(\"my_utils.nut\", getroottable())</code>", "<code>require(\"my_utils.nut\")</code>"], answer: 2, explanation: "The `DoIncludeScript` function executes the code from another file. The second parameter, `getroottable()`, is crucial as it runs the script in the global scope, making its contents accessible to all other scripts. `IncludeScript` without the scope parameter would only make the functions available locally." }
            ]
        },
        {
            id: 'organizing-traceline', part: 'Part 4: Writing Clean & Creative Code', title: 'Seeing the World: TraceLine', file: 'chapters/chapter4/ch03_traceline.html',
            quiz: [
                { question: "You use `TraceLine` to check the path between a camera and a player. There is a `prop_dynamic` (a cube) directly in the way. What will `TraceLine` return?", options: ["A fraction less than 1.0, because it hit the cube.", "1.0, because it ignores the cube.", "An error, because it cannot trace through entities.", "The script handle of the cube."], answer: 1, explanation: "The standard `TraceLine` function's biggest limitation is that it only collides with world geometry (brushes) and ignores all entities like props, players, and NPCs." }
            ]
        },
        {
            id: 'organizing-hacks', part: 'Part 4: Writing Clean & Creative Code', title: 'Hacking the Engine', file: 'chapters/chapter4/ch04_engine_hacks.html'
        },
        {
            id: 'error-handling', part: 'Part 4: Writing Clean & Creative Code', title: 'Error Handling', file: 'chapters/chapter4/ch05_error_handling.html'
        },
        {
            id: 'performance', part: 'Part 4: Writing Clean & Creative Code', title: 'Performance & Optimization', file: 'chapters/chapter4/ch06_performance.html'
        },
        {
            id: 'part4-final-exam', part: 'Part 4: Writing Clean & Creative Code', title: 'Part 4 Final Exam', file: 'chapters/chapter4/part4_exam.html',
            quiz: [
                { question: "You use the standard `TraceLine` function to check for line of sight between two points. A `prop_weighted_cube` is directly in the path, but there are no walls. What will the function return?", options: ["A fraction less than 1.0, because it hit the cube.", "A fraction of 1.0, because it ignored the cube.", "The script handle of the cube.", "An error."], answer: 1, explanation: "This question tests the single most important limitation of the standard `TraceLine` function. It *only* collides with world geometry (brushes) and completely ignores all entities. Since there was no wall in the way, the trace will complete successfully and return 1.0." },
                { question: "When organizing functions within a table in an entity script, why can't those functions directly use the `self` variable?", options: ["Because `self` is a reserved keyword only for the global scope.", "Because when called, the function's scope is the table itself (referenced by `this`), where `self` is not defined.", "Because `self` must be capitalized as `Self` inside tables.", "Because tables can only contain data, not access entity handles."], answer: 1, explanation: "This is a crucial concept for code organization. The function's immediate scope is the table it belongs to. The entity's `self` handle from the outer script scope is not automatically visible. The correct pattern is to pass `self` into the function as a parameter." },
                { question: "What is the primary purpose of the <code>getroottable()</code> parameter when using <code>DoIncludeScript</code> for a library?", options: ["To make the library load faster.", "To run the library's code within the current entity's script scope, keeping it private.", "To run the library's code in the global scope, making its functions and variables accessible to all other scripts.", "To check for syntax errors in the library file before running it."], answer: 2, explanation: "Specifying the root table as the scope for `DoIncludeScript` is what turns a simple file into a global library. Without it, the library's contents would only be accessible within the script that called the include function." },
                { question: "A VScripter stores the string <code>\"config_A|fast|blue\"</code> in an invisible entity's 'Model' keyvalue. What is the most likely reason for this 'engine hack'?", options: ["It's the only way to change an entity's model from a script.", "It's a clever workaround to pass custom, instance-specific parameters to a reusable script directly from the Hammer editor.", "It is a bug and has no effect on the script.", "It is a required step for making entities visible to `TraceLine`."], answer: 1, explanation: "Since you cannot add custom keyvalues to entities in Hammer, scripters repurpose unused string fields like 'Model' on non-visible entities to act as a data-passing channel, which the script can then parse." }
            ]
        },
        {
            id: 'pcap-intro', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'Intro to PCapture-Lib', file: 'chapters/chapter5/ch01_pcap_intro.html'
        },
        {
            id: 'pcap-smarter-types', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Arrays & Lists', 
            file: 'chapters/chapter5/ch02_idt_arrays_lists.html',
            quiz: [
                { 
                    question: "You have an ArrayEx containing player scores: <code>[100, 25, 80, 15, 90]</code>. You need to create a new array containing only scores above 50. Which method should you use?", 
                    options: [
                        "<code>scores.map(function(val, idx) { return val > 50 })</code>", 
                        "<code>scores.filter(function(idx, val) { return val > 50 })</code>", 
                        "<code>scores.reduce(function(acc, val) { return val > 50 })</code>", 
                        "<code>scores.search(function(val) { return val > 50 })</code>"
                    ], 
                    answer: 1, 
                    explanation: "<code>.filter()</code> creates a new array containing only elements that satisfy the predicate function. Note the parameter order: index first, then value. <code>map()</code> transforms elements, <code>reduce()</code> collapses to a single value, and <code>search()</code> returns an index." 
                },
                { 
                    question: "When should you use a <code>List</code> instead of an <code>ArrayEx</code>?", 
                    options: [
                        "When you need to access elements by index frequently", 
                        "When you need frequent insertions/deletions at the beginning or middle", 
                        "When you need functional methods like filter() and map()", 
                        "Lists are always better than ArrayEx"
                    ], 
                    answer: 1, 
                    explanation: "Lists excel at insertion/deletion operations, especially at the beginning or middle, because they only need to update node references. ArrayEx is better for random access by index (O(1) vs O(n) for Lists). Both support functional methods." 
                },
                { 
                    question: "You have an array with duplicate values: <code>[1, 2, 2, 3, 4, 4, 5]</code>. What's the simplest way to get only unique values?", 
                    options: [
                        "<code>myArray.filter(function(idx, val) { return val != val })</code>", 
                        "<code>myArray.unique()</code>", 
                        "<code>myArray.reduce(function(acc, val) { return acc })</code>", 
                        "<code>myArray.search(1)</code>"
                    ], 
                    answer: 1, 
                    explanation: "Both ArrayEx and List provide a <code>.unique()</code> method that returns a new collection with only unique elements. This is much simpler than writing a custom filter or reduce function." 
                },
                { 
                    question: "What must you do to avoid memory leaks when using a <code>List</code>?", 
                    options: [
                        "Nothing, Lists are automatically garbage collected", 
                        "Call <code>.clear()</code> when done or let it go out of scope naturally", 
                        "Convert it to an array with <code>.toarray()</code> before deleting", 
                        "Use <code>delete myList</code>"
                    ], 
                    answer: 1, 
                    explanation: "Lists use references between nodes. If you create circular references or don't properly clean up, the garbage collector may not free the memory. Always call <code>.clear()</code> when finished, or ensure the List goes out of scope naturally." 
                }
            ]
        },
        {
            id: 'pcap-smarter-entities', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Enhanced Entities', 
            file: 'chapters/chapter5/ch03_idt_entities.html',
            quiz: [
                { 
                    question: "With PCapture-Lib, what is the modern, preferred way to change an entity's color to red?", 
                    options: [
                        "<code>EntFireByHandle(ent, \"Color\", \"255 0 0\", 0, null, null)</code>", 
                        "<code>ent.SetColor(\"255 0 0\")</code>", 
                        "<code>ent.color <- \"255 0 0\"</code>", 
                        "<code>pcapEntity.SetColor(ent, \"255 0 0\")</code>"
                    ], 
                    answer: 1, 
                    explanation: "PCapture-Lib upgrades entity handles to <code>pcapEntity</code> objects, which have direct methods like <code>.SetColor()</code>. This is much cleaner and more readable than using the old <code>EntFireByHandle</code> system." 
                },
                { 
                    question: "You want to make an entity invisible AND non-solid with one function call. Which method should you use?", 
                    options: [
                        "<code>entity.SetAlpha(0)</code>", 
                        "<code>entity.SetDrawEnabled(false)</code>", 
                        "<code>entity.Disable()</code>", 
                        "<code>entity.SetCollision(0)</code>"
                    ], 
                    answer: 2, 
                    explanation: "<code>Disable()</code> is equivalent to calling both <code>SetDrawEnabled(false)</code> and <code>SetTraceIgnore(true)</code>, making the entity invisible and non-interactive in one call. <code>Enable()</code> reverses this." 
                }
            ]
        },
        {
            id: 'pcap-entlib', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Safe Entity Creation/Finding', 
            file: 'chapters/chapter5/ch04_entity_utilities.html',
            quiz: [
                { 
                    question: "You have two variables: <code>door1 = entLib.FindByName(\"exit_door\")</code> and <code>door2 = entLib.FindByName(\"exit_door\")</code>. How do you correctly check if they refer to the same entity?", 
                    options: [
                        "<code>door1 == door2</code>", 
                        "<code>door1.GetName() == door2.GetName()</code>", 
                        "<code>macros.IsEqual(door1, door2)</code>", 
                        "<code>door1.entindex() == door2.entindex()</code>"
                    ], 
                    answer: 2, 
                    explanation: "Entity handles are reference objects - direct comparison with <code>==</code> doesn't work reliably. <code>macros.IsEqual()</code> (or <code>entity.IsEqual(other)</code>) compares entities by their entity index, which is a guaranteed unique identifier. While checking entindex manually works, <code>macros.IsEqual()</code> is the recommended approach." 
                },
                { 
                    question: "What's the difference between <code>entLib.FindByName(\"button\")</code> and <code>entLib.FindByNameWithin(\"button\", playerPos, 100)</code>?", 
                    options: [
                        "They are identical", 
                        "FindByNameWithin only searches within 100 units of playerPos", 
                        "FindByNameWithin is faster", 
                        "FindByName returns an array, FindByNameWithin returns a single entity"
                    ], 
                    answer: 1, 
                    explanation: "<code>FindByNameWithin</code> adds spatial filtering - it only finds entities with the matching name that are also within the specified radius of the origin point. This is useful for proximity-based interactions." 
                },
                { 
                    question: "You're writing a Think function that runs every 0.1 seconds. It needs to access an entity called \"exit_door\". What's the most performant approach?", 
                    options: [
                        "Call <code>entLib.FindByName(\"exit_door\")</code> inside the Think function every time", 
                        "Cache the entity once outside the Think function: <code>exitDoor <- entLib.FindByName(\"exit_door\")</code>", 
                        "Use <code>Entities.FindByName()</code> instead of <code>entLib</code>", 
                        "There's no performance difference"
                    ], 
                    answer: 1, 
                    explanation: "Entity searches are relatively expensive. If you need to reference an entity multiple times, cache the result once and reuse it. This is especially important in Think functions that run frequently. Just remember to validate cached entities with <code>.IsValid()</code> before use." 
                },
            ]
        },
        {
            id: 'pcap-scheduler', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Perfect Timing: ActionScheduler', 
            file: 'chapters/chapter5/ch05_action_scheduler.html',
            quiz: [
                { 
                    question: "What is the MAIN advantage of <code>ScheduleEvent</code> over vanilla <code>EntFire</code> delayed inputs?", 
                    options: [
                        "It's faster", 
                        "You can cancel scheduled events at any time", 
                        "It works without PCapture-Lib", 
                        "It can fire entity inputs"
                    ], 
                    answer: 1, 
                    explanation: "The killer feature of <code>ScheduleEvent</code> is the ability to <strong>cancel</strong> scheduled actions and entire event groups. Once you use <code>EntFire</code> with a delay, those inputs are locked in and will execute no matter what. With <code>ScheduleEvent.Cancel()</code>, you have full control over timed sequences." 
                },
                { 
                    question: "You write this code: <code>local door = entLib.FindByName(\"exit\"); ScheduleEvent.Add(\"test\", function() { door.SetColor(\"255 0 0\") }, 2)</code>. What happens?", 
                    options: [
                        "The door turns red after 2 seconds", 
                        "The game crashes after 2 seconds because 'door' doesn't exist in the function's scope", 
                        "The door turns red immediately", 
                        "Nothing happens"
                    ], 
                    answer: 1, 
                    explanation: "This is the scope problem! When the scheduled function runs, the local variable <code>door</code> no longer exists. You must pass it explicitly: either as an argument (<code>function(door) {...}, 2, [door]</code>), with closure capture (<code>function():(door) {...}</code>), or as scope (<code>function() {...}, 2, null, door</code>)." 
                },
                { 
                    question: "In a function started by <code>ScheduleEvent.Add()</code>, what does the line <code>yield 2.5</code> do?", 
                    options: [
                        "It ends the function and returns the value 2.5", 
                        "It pauses the function for 2.5 seconds, then resumes execution from the next line", 
                        "It causes a game crash", 
                        "It runs the function 2.5 times"
                    ], 
                    answer: 1, 
                    explanation: "<code>yield</code> is the core of the ActionScheduler's asynchronous power, allowing you to create timed sequences in a simple, linear fashion without complex callbacks or manual delay calculations. However, be aware of the save/load crash risk!" 
                },
                { 
                    question: "What is the biggest risk of using a long <code>yield</code> pause (e.g., <code>yield 30.0</code>) in your map?", 
                    options: [
                        "It might slow down the server", 
                        "The game will crash if a player loads a save made during the pause", 
                        "It will prevent other scripts from running", 
                        "There is no risk"
                    ], 
                    answer: 1, 
                    explanation: "This is a critical limitation of the Source Engine's save system. Asynchronous functions are not saved correctly, making long yields unsafe for critical gameplay logic where players might save and load. Only use <code>yield</code> for short cosmetic sequences or debugging." 
                }
            ]
        },
        {
            id: 'pcap-traceplus', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'The Ultimate Tool: TracePlus', 
            file: 'chapters/chapter5/ch06_pcap_traceplus.html',
            quiz: [
                { 
                    question: "What is the primary advantage of <code>TracePlus.Bbox</code> over the standard <code>TraceLine</code> function?", 
                    options: [
                        "It is faster for world geometry", 
                        "It can see and collide with entities like players and cubes", 
                        "It can only be used on players", 
                        "It returns the color of the surface it hits"
                    ], 
                    answer: 1, 
                    explanation: "<code>TracePlus.Bbox</code> solves the single biggest flaw of <code>TraceLine</code> for gameplay scripting: its inability to detect entities. Standard <code>TraceLine</code> only sees world geometry, making it almost useless for interactive mechanics." 
                },
                { 
                    question: "When should you use <code>TracePlus.Cheap</code> instead of <code>TracePlus.Bbox</code>?", 
                    options: [
                        "When you need to detect entities", 
                        "When you only need to detect world geometry and want better performance", 
                        "When you need portal support", 
                        "Never - Bbox is always better"
                    ], 
                    answer: 1, 
                    explanation: "<code>TracePlus.Cheap</code> is a thin wrapper around vanilla <code>TraceLine</code> - it only detects world geometry but is faster. Use it when you're certain you don't need entity detection. For anything involving players, props, or NPCs, use <code>Bbox</code>." 
                },
                { 
                    question: "You want a trace to ignore all trigger entities. How do you do this?", 
                    options: [
                        "<code>local trace = TracePlus.Bbox(start, end, \"trigger_multiple\")</code>", 
                        "<code>local settings = TracePlus.Settings.new().SetIgnoredClasses([\"trigger_\"]); local trace = TracePlus.Bbox(start, end, null, settings)</code>", 
                        "<code>local trace = TracePlus.Bbox(start, end); trace.IgnoreTriggers()</code>", 
                        "This is not possible"
                    ], 
                    answer: 1, 
                    explanation: "Use <code>TracePlus.Settings</code> to create custom filtering rules. <code>SetIgnoredClasses()</code> accepts an array of classname patterns (e.g., <code>[\"trigger_\"]</code> ignores all classes starting with \"trigger_\"). Pass this settings object as the 4th parameter to <code>TracePlus.Bbox()</code>." 
                },
                { 
                    question: "What makes <code>TracePlus.PortalBbox</code> different from regular <code>TracePlus.Bbox</code>?", 
                    options: [
                        "It's faster", 
                        "It only works on portals", 
                        "It can trace through portals, correctly transforming position and direction", 
                        "It returns portal entities instead of world hits"
                    ], 
                    answer: 2, 
                    explanation: "Portal tracing is one of PCapture-Lib's most legendary features. <code>PortalBbox</code> lets rays pass through portals, correctly calculating the transformed path. This enables advanced mechanics like lasers that bounce through portals or AI that can \"see\" through them." 
                }
            ]
        },
        {
            id: 'pcap-files', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Saving Data with Files', 
            file: 'chapters/chapter5/ch07_pcap_files.html'
        },
        {
            id: 'pcap-debug', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'Debugging 303: Visualizing Logic', 
            file: 'chapters/chapter5/ch08_pcap_debug.html'
        },
        {
            id: 'pcap-animations', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'The Animations Module', 
            file: 'chapters/chapter5/ch09_pcap_animations.html',
            quiz: [
                { 
                    question: "You want a prop named <code>my_prop</code> to smoothly fade from fully visible to fully invisible over 3 seconds. Which PCapture-Lib function is best for this?", 
                    options: [
                        "<code>animate.AlphaTransition(prop, 255, 0, 3.0)</code>", 
                        "<code>prop.SetAlpha(0)</code>", 
                        "<code>ScheduleEvent.Add(function() { prop.SetAlpha(0) }, 3.0)</code>", 
                        "<code>dev.DrawEntityBBox(prop, Vector(255,0,0), 3.0)</code>"
                    ], 
                    answer: 0, 
                    explanation: "The <code>animate.AlphaTransition()</code> function is specifically designed for this purpose. The other options would make the prop disappear instantly (either immediately or after a delay) or are for debugging." 
                }
            ]
        },
        {
            id: 'pcap-utils', 
            part: 'Part 5: Advanced Techniques with PCapture-Lib', 
            title: 'The Utility Belt', 
            file: 'chapters/chapter5/ch10_pcap_utils.html'
        },
        // {
        //     id: 'pcap-hud', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The HUD Module', file: 'chapters/chapter5/ch08_pcap_hud.html'
        // },
        // {
        //     id: 'pcap-scriptevents', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'The ScriptEvents Module', file: 'chapters/chapter5/ch09_pcap_scriptevents.html',
        //     quiz: [
        //         { question: "A script broadcasts a message using `EventListener.Notify(\"PuzzleComplete\")`. How do other scripts react to this?", options: ["They don't, only the global scope can hear it.", "The engine automatically finds and runs functions named `OnPuzzleComplete`.", "Any script that has previously added an action to the 'PuzzleComplete' event will run its action.", "It will cause an error if no script is listening."], answer: 2, explanation: "The ScriptEvents module uses a publish-subscribe model. One script publishes (`Notify`), and other scripts must explicitly subscribe (`AddAction`) to that specific event name to react." }
        //     ]
        // },
        // {
        //     id: 'part5-final-exam', part: 'Part 5: Advanced Techniques with PCapture-Lib', title: 'Part 5 Final Exam', file: 'chapters/chapter5/ch11_part5_exam.html',
        //     quiz: [
        //         { question: "Using PCapture-Lib, you want a prop to glow red, wait exactly 2 seconds, and then dissolve. Which code snippet best achieves this in a single, readable function that is started with the scheduler?", options: ["<code>prop.SetColor(\"255 0 0\"); EntFireByHandle(prop, \"Dissolve\", \"\", 2.0, null, null)</code>", "<code>prop.SetColor(\"255 0 0\"); ScheduleEvent.Add(\"dissolve_prop\", function() { prop.Dissolve() }, 2.0)</code>", "<code>prop.SetColor(\"255 0 0\"); yield 2.0; prop.Dissolve()</code>", "<code>prop.SetColor(\"255 0 0\"); local timer = 2.0; while (timer > 0) { timer -= FrameTime() } prop.Dissolve()</code>"], answer: 2, explanation: "This showcases the primary strength of the `ActionScheduler`. The `yield` keyword allows you to write timed, sequential logic in a clean, linear fashion. While B would work, C is more readable for a single sequence. A is standard VScript, and D is a not super cursed way." },
        //         { question: "A laser beam needs to detect if a player is blocking its path, even if the path goes through a set of linked portals. Which PCapture-Lib function is specifically designed for this complex task?", options: ["<code>TracePlus.Bbox</code>", "<code>TraceLine</code>", "<code>TracePlus.PortalCheap</code>", "<code>TracePlus.PortalBbox</code>"], answer: 3, explanation: "This is the library's killer feature. `TracePlus.Bbox` can see entities, but not go through portals. `TracePlus.PortalCheap` can go through portals, but can't see entities. `TracePlus.PortalBbox` is the ultimate tool that does both, making it the correct choice for this scenario." },
        //         { question: "Your goal is to have multiple, separate scripts (on a door, a light, and a sound emitter) all perform an action when a puzzle is solved. What is the most decoupled, modular way to achieve this using PCapture-Lib?", options: ["The puzzle script sets a global variable `::g_PuzzleSolved = true`, which all other scripts check in a think function.", "The puzzle script uses `entLib.FindByClassname` to find every entity and call a specific function on each one.", "The puzzle script calls `EventListener.Notify(\"PuzzleSolved\")`. The other scripts have each used `AddAction` on that event to register their own unique response.", "Write all the door, light, and sound logic inside the single puzzle script."], answer: 2, explanation: "This demonstrates the power of the `ScriptEvents` module. It allows for a 'publish-subscribe' model where the puzzle script (the publisher) doesn't need to know anything about the door, light, or sound scripts (the subscribers). This makes the code incredibly modular and easy to expand later." }
        //     ]
        // },
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
    const mainContent = document.getElementById('main-content');
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
                renderBottomNavigation(); // Render bottom nav links
            })
            .catch(error => {
                chapterContainer.innerHTML = `<div class="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded-r-lg"><p class="font-bold">Error loading chapter content.</p><p>${error}</p></div>`;
                updateUI();
            });
    }

    // Function to render bottom navigation links
    function renderBottomNavigation() {
        const navContainer = document.getElementById('chapter-nav-bottom');
        if (!navContainer) return;

        navContainer.innerHTML = ''; // Clear previous links

        const prevChapter = currentChapterIndex > 0 ? bookData[currentChapterIndex - 1] : null;
        const nextChapter = currentChapterIndex < bookData.length - 1 ? bookData[currentChapterIndex + 1] : null;

        let prevLinkHTML = '<div></div>'; // Placeholder to keep justify-between working
        if (prevChapter) {
            prevLinkHTML = `<a href="#" data-index="${currentChapterIndex - 1}" class="chapter-nav-link text-left">
                                <span class="text-xs text-gray-500 dark:text-gray-400">Previous</span>
                                <span class="block font-semibold">${prevChapter.title}</span>
                            </a>`;
        }

        let nextLinkHTML = '<div></div>'; // Placeholder
        if (nextChapter) {
            nextLinkHTML = `<a href="#" data-index="${currentChapterIndex + 1}" class="chapter-nav-link text-right">
                                <span class="text-xs text-gray-500 dark:text-gray-400">Next</span>
                                <span class="block font-semibold">${nextChapter.title}</span>
                            </a>`;
        }

        navContainer.innerHTML = prevLinkHTML + nextLinkHTML;
    }
    
    function updateUI() {
        // Floating arrows for desktop
        prevArrow.classList.toggle('hidden', currentChapterIndex === 0);
        nextArrow.classList.toggle('hidden', currentChapterIndex === bookData.length - 1);

        // Active state in Table of Contents
        document.querySelectorAll('#toc a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`#toc a[data-index="${currentChapterIndex}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        // Quiz button logic
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

    // ADDED: Event delegation for bottom navigation links
    mainContent.addEventListener('click', (e) => {
        const link = e.target.closest('.chapter-nav-link');
        if (link && link.dataset.index) {
            e.preventDefault();
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