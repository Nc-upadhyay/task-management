const url = "http:localhost:8080/home";
function favTutorial() {
    var mylist = document.getElementById("myList");
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
            return response.text(); // Read the response as text
        }

        return response.json();
    })
        .then(data => {
            console.log("data is " + data);
            alert('task fetch Succesfuly');
            displayTaskData(data);
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
                    return response.text();
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

const jsonData = '[{"id":1,"taskname":"study","description":"this is study description also this is a description of my task","status":"todo","user":1},{"id":2,"taskname":"Sleeping","description":"description of sleeping task and i love sleeping","status":"progess","user":1},{"id":3,"taskname":"walk","description":" i love walking, i used to go morning and evening walk daily.","status":"review","user":1},{"id":52,"taskname":"make website 3","description":"task 3 description and i love to describe ","status":"done","user":1},{"id":54,"taskname":"task 4","description":"task 4 description","status":"progress","user":1},{"id":55,"taskname":"task 5","description":"task 5 description","status":"progress","user":1},{"id":56,"taskname":"task 6","description":"task 6 description","status":"progress","user":1},{"id":57,"taskname":"task 7","description":"task 7 description","status":"progress","user":1},{"id":102,"taskname":"task 7","description":"task 7 description","status":"progress","user":1},{"id":103,"taskname":"task 8","description":"task 8 description","status":"progress","user":1},{"id":152,"taskname":"task 7","description":"task 7 description","status":"progress","user":1}]';
const tasks = JSON.parse(jsonData);

// Reference to the card container
const cardContainer = document.getElementById('data-width');

// Function to create a card
function createCard(task) {
    const back = document.createElement('div');
    back.classList.add('back');

    const taskName = document.createElement('div');
    taskName.classList.add('width-6');
    const taskName2 = document.createElement('div');
    taskName2.classList.add('text-set');
    const para = document.createElement('span');
    para.textContent = "Task Name :";
    taskName2.appendChild(para);
    taskName.appendChild(taskName2);


    const taskNamed = document.createElement('div');
    taskNamed.classList.add('width-6');
    const taskNamed2 = document.createElement('div');
    taskNamed2.classList.add('text-set');
    const parad = document.createElement('span');
    parad.textContent = task.taskname;
    taskNamed2.appendChild(parad);
    taskNamed.appendChild(taskNamed2);


    const taskDescription = document.createElement('div');
    taskDescription.classList.add('width-6');
    const taskDescription2 = document.createElement('div');
    taskDescription2.classList.add('text-set');
    const desc = document.createElement('span');
    desc.textContent = "Description :";
    taskDescription2.appendChild(desc);
    taskDescription.appendChild(taskDescription2);

    const taskDescriptiond = document.createElement('div');
    taskDescriptiond.classList.add('width-6');
    const taskDescriptiond2 = document.createElement('div');
    taskDescriptiond2.classList.add('text-set');
    const descd = document.createElement('p');
    descd.textContent = task.description;
    taskDescriptiond2.appendChild(descd);
    taskDescriptiond.appendChild(taskDescriptiond2);




    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    const select = document.createElement('select');
    // Add options to the dropdown if needed
    select.innerHTML = `<option value="todo">${task.status}</option>
    <option value="todo">Todo</option>
                        <option value="progress">Progress</option>
                        <option value="completed">Completed</option>`;
    dropdown.appendChild(select);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    // Event listener for the delete button
    deleteButton.addEventListener('click', () => {
        // Remove the card when the delete button is clicked
        back.remove();
    });

    // Append elements to the card
    back.appendChild(taskName);
    back.appendChild(taskNamed);
    back.appendChild(taskDescription);
    back.appendChild(taskDescriptiond);
    back.appendChild(dropdown);
    back.appendChild(deleteButton);

    // Append the card to the container
    cardContainer.appendChild(back);
}

// Create cards for each task
tasks.forEach(task => createCard(task));
