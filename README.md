# The VScript Book: An Interactive Guide for Portal 2 Modders

**[Live Version: vscripts.lavashik.dev](https://vscripts.lavashik.dev)**

![The VScript Book Screenshot](https://i.ibb.co/FqsmdHsd/image.png) 

## What is this?

This project is a web-based book aimed at absolute beginners who want to get into scripting for Portal 2. The goal is to provide a comprehensive, step-by-step learning path, complete with interactive examples, visualizations, and quizzes to reinforce concepts. It covers everything from basic programming logic to advanced entity manipulation and the powerful PCapture-Lib library.


## Features

*   **Interactive Learning:** Test your knowledge at the end of key chapters with built-in quizzes to reinforce concepts.
*   **Beginner-Friendly:** Starts from zero, assuming no prior programming experience.
*   **Comprehensive Curriculum:** Covers everything from basic variables and loops to advanced topics like raycasting, performance optimization, and custom event systems.
*   **Practical Examples:** All concepts are illustrated with code examples grounded in real-world Portal 2 scenarios.
*   **PCapture-Lib Mastery:** A dedicated section that teaches you how to leverage the most powerful VScript library for Portal 2, unlocking features like portal-aware tracing and asynchronous scripting.
*   **Zero-Setup Live Version:** Instantly accessible online at **[vscripts.lavashik.dev](https://vscripts.lavashik.dev)**.

## How to View Locally

If you wish to run this project on your local machine, you'll need to run a simple local server due to browser security policies that restrict `fetch()` requests on local files.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/LaVashikk/Portal2-VScripts-Book.git
    cd Portal2-VScripts-Book
    ```

2.  **Run a local server:**
    If you have Python 3 installed, the easiest way is to run:
    ```sh
    python -m http.server
    ```
    (For Python 2, use `python -m SimpleHTTPServer`)

3.  **Open in your browser:**
    Navigate to `http://localhost:8000`.


## A Note on the Frontend

As I am *the number one hater of frontend development*, the UI for this book was bootstrapped with the assistance of Google's Gemini. It is built, perhaps psychopathically, with vanilla HTML, CSS, and JavaScript (with Prism.js), with no frameworks or build tools.

The focus is entirely on providing clear, high-quality educational content. While the UI is designed to be clean and functional, contributions to improve its structure and style are welcome.

## License

Distributed under the MIT License. See `LICENSE` file for more information.
