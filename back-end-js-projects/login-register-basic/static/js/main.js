const registerButton = document.querySelector('.registerButton');
const loginButton = document.querySelector('.loginButton');
const logOutButton = document.querySelector('.logOutButton');

const inputUsername = document.getElementById('usernameText');
const inputPassword = document.getElementById('passwordText');


const btnEl = document.querySelector(".btn");

btnEl.addEventListener("mouseover", (event) => {
    const x = event.pageX - btnEl.offsetLeft;
    const y = event.pageY - btnEl.offsetTop;

    btnEl.style.setProperty("--xPos", x + "px");
    btnEl.style.setProperty("--yPos", y + "px");
});


async function addUser() {
    let user = inputUsername.value;
    let pass = inputPassword.value;
    let equals = false;
    let empty = false;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    for (let i = 0; i < users.length; i++) {
        if (user === users[i].username) {
            equals = true;
            console.log('Username must be unique!');
        }
    }

    if (user === '' || pass === '') {
        empty = true;
        console.log('Username and password cannot be empty!');
    }

    if (pass.length < 8) {
        console.log('Password length must be 8 or more');
    }

    if (!equals && !empty && pass.length >= 8) {
        try {
            const response = await fetch('http://127.0.0.1:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, pass }),
            });

            if (response.ok) {
                alert('User registered successfully');
                users.push({ username: user, password: pass });
                localStorage.setItem('users', JSON.stringify(users));
                console.log(`Username: ${user}`);
            } else {
                console.log('Error registering user', response);
            }
        } catch (error) {
            console.error('Error registering user', error);
        }
    }
}

async function logIn() {
    let user = inputUsername.value;
    let pass = inputPassword.value;

    try {
        const response = await fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: pass }),
        });

        if (response.ok) {
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.outContainer').style.display = 'flex';
            alert('Login successful');
        } else {
            const errorText = await response.text();
            alert(`Login failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Error logging in', error);
        alert('Login failed: Server error');
    }
}

registerButton.addEventListener('click', addUser);
loginButton.addEventListener('click', logIn);
logOutButton.addEventListener('click', () => {
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.outContainer').style.display = 'none';
    inputPassword.value = ''
    inputUsername.value = ''
  });

