const RecordApp = {
    records: [],

    init() {
        const data = localStorage.getItem('my_web_app_data');
        if (data) {
            this.records = JSON.parse(data);
        }
        this.render();
    },

    // for insert2 sa data o info
    add() {
        const fName = document.getElementById('fName').value;
        const mName = document.getElementById('mName').value;
        const lName = document.getElementById('lName').value;
        const age = document.getElementById('age').value;

        if (!fName || !lName) return alert("First and Last Name are required!");

        this.records.push({ fName, mName, lName, age });
        this.render();
        this.clearInputs();
    },

    // para sa sorting a-z o z-a
    sort() {
        const field = document.getElementById('sortField').value;
        const order = document.getElementById('sortOrder').value;

        if (!field) return;

        this.records.sort((a, b) => {
            let valA = a[field].toLowerCase();
            let valB = b[field].toLowerCase();

            if (order === 'asc') {
                return valA > valB ? 1 : -1;
            } else {
                return valA < valB ? 1 : -1;
            }
        });

        this.render();
    },

    // updates
    render() {
        const area = document.getElementById('displayArea');
        const ctrl = document.getElementById('controls');

        if (this.records.length === 0) {
            area.innerHTML = '<span style="color: red;">No Records...</span>';
            ctrl.style.display = "none";
            return;
        }

        ctrl.style.display = "block";
        let html = `
            <table border="1" width="100%" style="border-collapse: collapse; text-align: left;">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

        this.records.forEach((item, index) => {
            html += `
                <tr>
                    <td>${item.fName}</td>
                    <td>${item.mName}</td>
                    <td>${item.lName}</td>
                    <td>${item.age}</td>
                    <td align="center">
                        <button onclick="RecordApp.delete(${index})">Delete</button>
                        <button onclick="RecordApp.edit(${index})">Edit</button>
                    </td>
                </tr>`;
        });

        html += `</tbody></table>`;
        area.innerHTML = html;
    },

    // magsave padung local storage
    save() {
        localStorage.setItem('my_web_app_data', JSON.stringify(this.records));
        alert("Data saved!");
    },

    delete(index) {
        this.records.splice(index, 1);
        this.render();
    },

    edit(index) {
        const item = this.records[index];
        document.getElementById('fName').value = item.fName;
        document.getElementById('mName').value = item.mName;
        document.getElementById('lName').value = item.lName;
        document.getElementById('age').value = item.age;
        this.delete(index);
    },

    clearInputs() {
        document.querySelectorAll('input').forEach(i => i.value = '');
    },

    deleteAll() {
        if(confirm("Wipe all records?")) {
            this.records = [];
            localStorage.removeItem('my_web_app_data');
            this.render();
        }
    }
};