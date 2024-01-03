const url = "http:localhost:8080/home";
function favTutorial() {
    var mylist = document.getElementById("myList");
    // document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
    const status = document.getElementById("myList").value;
    console.log(status);
    filterTask(status)

}

document.getElementById("addTask").onclick = function addTask() {
    openForm();
}
displayTask();
function displayTask() {
    const userId = localStorage.getItem("userId");
    if (userId == null) {
        alert("You Did't Created Any Task")
        return;
    }
    const endPoint = url + "/deskboard/" + userId
    fetch(endPoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        console.log("response " + response);
        if (!response.ok) {
            throw new Error(`Task not created ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // Handle non-JSON response (e.g., success message)
            return response.text(); // Read the response as text
        }

        return response.json();
    })
        .then(data => {
            // const list=JSON.parse(data);
            console.log("data is " + data);
            alert('task fetch Succesfuly');
            displayTaskData(data);
            // var tableBody = document.getElementById("taskTableBody");
            // tableBody.innerHTML = '';
            // data.forEach(task => {
            //     var row = tableBody.insertRow();
            //     row.insertCell(0).textContent = task.id;
            //     row.insertCell(1).textContent = task.taskname;
            //     row.insertCell(2).textContent = task.description;
            //     row.insertCell(3).textContent = task.status;
            //     row.insertCell(4).textContent = task.user;
            // });
        }).catch(error => {
            console.log(error);
        });


}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("savebtn").onclick = function save(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        alert("ok");
        const endPoint = url + "/create";
        const userId = localStorage.getItem("userId");
        alert(userId);

        console.log("userid " + userId);
        fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "taskname": document.getElementById("taskname").value,
                "description": document.getElementById("description").value,
                "status": "Todo",
                "user": userId
            })
        })
            .then(response => {
                if (!response.ok) {
                    alert('Task Not created');
                    throw new Error(`Task not created ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    // Handle non-JSON response (e.g., success message)
                    return response.text(); // Read the response as text
                }

                return response.json();
            })
            .then(data => {
                console.log("data is saved in ->" + data);
                alert('Task Save Successfully');
                location.reload();

            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };
});
function filterTask(status) {
    const userId = localStorage.getItem("userId");
    const endPoint = url + '/status/' + status + "/" + userId;
    console.log("endpoint is " + endPoint);
    fetch(endPoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                alert('data filter ');
                throw new Error(`Task not created ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Handle non-JSON response (e.g., success message)
                return response.text(); // Read the response as text
            }

            return response.json();

        })
        .then(data => {
            displayTaskData(data);
        }).catch(errro => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        })

}
function displayTaskData(data) {
    var tableBody = document.getElementById("taskTableBody");
    tableBody.innerHTML = '';
    const jsonData = '[{"id":1,"taskname":"study","description":"this is study description","status":"todo","user":1},{"id":2,"taskname":"task 2","description":"task 2 description","status":"todo","user":1},{"id":3,"taskname":"task 2","description":"task 2 description","status":"todo","user":1},{"id":52,"taskname":"task 3","description":"task 3 description","status":"todo","user":1},{"id":54,"taskname":"task 4","description":"task 4 description","status":"progress","user":1},{"id":55,"taskname":"task 5","description":"task 5 description","status":"progress","user":1},{"id":56,"taskname":"task 6","description":"task 6 description","status":"progress","user":1},{"id":57,"taskname":"task 7","description":"task 7 description","status":"progress","user":1},{"id":102,"taskname":"task 7","description":"task 7 description","status":"progress","user":1},{"id":103,"taskname":"task 8","description":"task 8 description","status":"progress","user":1},{"id":152,"taskname":"task 7","description":"task 7 description","status":"progress","user":1}]';
    const dataArray = JSON.parse(jsonData);
    dataArray.forEach(task => {
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = task.id;
        row.insertCell(1).textContent = task.taskname;
        row.insertCell(2).textContent = task.description;
        row.insertCell(3).textContent = task.status;
        row.insertCell(4).textContent = task.user;
    });
}
displayTaskData("");