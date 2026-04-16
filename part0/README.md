# Part 0

[link](https://fullstackopen.com/en/part0/fundamentals_of_web_apps)

## 1. Exercise 04
POST -> 302 Redirect -> Full page reload.
__________________________________________________________
sequenceDiagram
    participant Client
    participant Server

    Note over Client: User types and clicks submit (form POST)
    Client->>Server: POST /new-note
    Server-->>Client: 302 Redirect

    Client->>Server: GET /notes
    Server-->>Client: HTML page

    Client->>Server: GET main.css
    Server-->>Client: main.css

    Client->>Server: GET main.js
    Server-->>Client: main.js

    Client->>Server: GET data.json
    Server-->>Client: data.json


## 1. Exercise 05
GET requests for HTML, CSS, JS, then JSON.
__________________________________________________________
sequenceDiagram

    participant Client
    participant Server

    Client->>Server: GET /spa
    Server-->>Client: HTML file
    Client->>Server: GET /main.css
    Server-->>Client: CSS file
    Client->>Server: GET /main.js
    Server-->>Client: JS file

    Note right of Client: JS starts fetching JSON

    Client->>Server: GET /data.json
    Server-->>Client: json data (the notes)

## 1. Exercise 06
POST -> 201 Created (No reload).
__________________________________________________________
sequenceDiagram

    participant Client
    participant Server

    Note right of Client: User types a note and clicks "Save"
    Note right of Client: The JS code handles the form submission

    Client->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Client: 201 Created (JSON response)
    deactivate Server

    Note right of Client: The JS code adds the new note to the list and renders it to the page
