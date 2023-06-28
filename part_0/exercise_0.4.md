## This uses Mermaid language

```mermaid
sequence diagram;
	participant browser;
	participant server;

	browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note;
	activate server;
	server ->> browser: REDIRECT https://studies.cs.helsinki.fi/exampleapp/notes;
	deactivate server;

	Note right of the server: The server updates the contents on its JSON file.;
	Note left of the browser: The browser is redirected to the same page, so that it refreshes the page with the new contents.;

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes;
	activate server;
	server ->> browser: HTML document;
	deactivate server;

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css;
	activate server;
	server ->> browser: CSS document;
	deactivate server;

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js;
	activate server;
	server ->> browser: JS file;
	deactivate server;

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json;
	activate server;
	server ->> browser: [{"content": "some text", "date": "2023-6-23"}, ...];
	deactivate server;

	Note left of the browser: execute callback function in main.js that renders the notes.;
	
```