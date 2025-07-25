# The VScript Book: An Interactive Guide for Portal 2

## What is this?

This project is a web-based book aimed at absolute beginners who want to get into scripting for Portal 2. The goal is to provide a comprehensive, step-by-step learning path, complete with interactive examples, visualizations, and quizzes to reinforce concepts. It covers everything from basic programming logic to advanced entity manipulation and the powerful PCapture-Lib library.

## ⚠️ Work in Progress (WIP)

This book is currently under active development. Chapters may be incomplete, contain placeholders, or be subject to significant revision. The structure and content are evolving.

## A Note on the Frontend

As I am *the number one hater of frontend development*, the UI for this book was bootstrapped with the assistance of Google's Gemini. It is built, perhaps psychopathically, with vanilla HTML, CSS, and JavaScript (with Prism.js), with no frameworks or build tools.

The focus is entirely on providing clear, high-quality educational content. While the UI is designed to be clean and functional, contributions to improve its structure and style are welcome.

## How to View Locally

To view the book as a local website, you need to run a simple local server due to browser security policies regarding `fetch()` requests for local files.

1.  Clone this repository.
2.  If you have Python 3, run `python -m http.server`:
3.  Open your web browser and navigate to `http://localhost:8000`.