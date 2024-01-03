const url = "http:localhost:8080/home";
function toggleForm(formId) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    if (formId === 'signUpForm') {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    } else {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    }
}

document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your sign-in logic here
    var password = document.getElementById("password").value;
    if (password.length < 8) {
        alert('Password should be minimum 8 character');
    } else {
        const formData = new FormData(event.target);
        singIn(formData);
    }
});

document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Add your sign-up logic here
    var password = document.getElementById("newPassword").value;
    if (password.length < 8) {
        alert('Password should be minimum 8 character');
    }
    {
        const formData = new FormData(event.target);
        singUp(formData)
    }
});

function singIn(formData) {
    var username = formData.get('username');
    var password = formData.get('password');
    var endponint = url + '/sign-in/' + username + '/' + password;
    console.log(endponint);
    fetch(endponint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Sign in successfull ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Handle non-JSON response (e.g., success message)
                return response.text(); // Read the response as text
            }

            return response.json();
        })
        .then(data => {
            console.log('data is', data);
            alert('Sign in Ok');
            const parseData = JSON.parse(JSON.stringify(data));
            console.log(parseData.userId);
            localStorage.setItem("userId", parseData.userId);
            // console.log(response.get);
            window.location.href = "deskboard.html";
            return true;

        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sign in fail' + JSON.stringify(data));
        });
        return false;
}
function singUp(formdata) {

    var endpoint = url + '/sign-up';
    console.log(endpoint);
    fetch(endponint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: formData.get('newUsername'),
            password: formData.get('newPassword'),
            email: formData.get('email'),
            mobile: formData.get('mobileNumber')
        })
    })
        .then(response => {
            if (!response.ok) {
                alert('Something went to wrong!')
                throw new Error(`Sign up fail ${response.status}`);
            }
            if (!contentType || !contentType.includes('application/json')) {
                return response.text();
            }
            return response.json();
        })
        .then(data => {
            const parseData = JSON.parse(JSON.stringify(data));
            console.log(data + " " + parseData.userId);
            localStorage.setItem("userId", parseData.userId);
            window.location.href = "deskboard.html";
            return true;

        }).catch(error => {
            console.log(error);
        });
        return false;
}