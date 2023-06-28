## This uses Mermaid language

Sequence diagram showing what happens when a user creates a new note using the single-page version of ExampleApp.

```mermaid

sequenceDiagram

	Note right of browser: Executes the function for when the 'notes_form' is submitted, which creates a new note and pushes it to the server

	browser ->>+ server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

	Note right of browser: redraws the page with the new note
	Note right of browser: Request is sent as a JSON: {content: "some text here", date: "2023-06-28T..."}; executes sendToServer in spa.js

	server ->>+ browser: STATUS 201 - CREATED

```