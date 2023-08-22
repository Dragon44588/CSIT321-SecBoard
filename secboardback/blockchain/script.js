const data = JSON.parse({
    "Main chain": [
        {
            "Previous Hash": "Genesis",
            "Data": "Test",
            "Proof of work": 3563,
            "Correction hash": "Correction"
        },
        null,
        {
            "Previous Hash": "000047e9f90e3f7dd7b2bc603dd7a2e77078a9f1b419af339d7c3ab35ed84257",
            "Data": "another message",
            "Proof of work": 41802,
            "Correction hash": "Correction"
        },
        {
            "Previous Hash": "0000c295a1c8d134075dc8bb57cd8362e63bd5cfab43149bfbe5a59e6948c0f6",
            "Data": "test 3",
            "Proof of work": 42938,
            "Correction hash": "Correction"
        },
        null
    ],
    "Correction chain": [
        {
            "Previous hash": "00002640efe065c4cde421cffa2c67b8f8716e31720f9c341b8841f12713b6fd",
            "Data": "New message!",
            "Proof of work": 3739,
            "Election hash": "Election Hash TBI",
            "Standard head hash": "00003fb948b3dc9be75eedf8505be01e844571e99f8683cefd0ce98a5cb513f8",
            "Successor hash": "Successor Hash TBI"
        },
        {
            "Previous hash": "000040b2c983d4c1aee6eaac9c61ea2008612856ab4754dc906e1b2977e90d8a",
            "Data": "New message 2!",
            "Proof of work": 139413,
            "Election hash": "Election Hash TBI",
            "Standard head hash": "00003fb948b3dc9be75eedf8505be01e844571e99f8683cefd0ce98a5cb513f8",
            "Successor hash": "Successor Hash TBI"
        }
    ]
})

function generateTable(){
            
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // creating all cells
    for (let i = 0; i < 2; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
    }

