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



let users = JSON.parse(localStorage.getItem('users')) || [
  {
    username: "orxan", password: "1234"
  },
  {
    username: "said", password: "1234"
  }
];

localStorage.setItem('users', JSON.stringify(users));

function addUser() {
  let user = inputUsername.value;
  let pass = inputPassword.value;
  let equals = false;
  let empty = false;
  for (let i = 0; i < users.length; i++) {
    if (user === users[i].username) {
      equals = true;
      console.log('Username must be unique!')
    }
    if (user === '' || pass === ''){
      empty=true;
    }
  }
  if(!equals && !empty && pass.length>=8) {
    console.log(`Username: ${user}, Password: ${pass}`)
    users.push({ username: user, password: pass})
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Username and Password, succesfully registered, now you can log in!', users)
  }
}

function logIn() {
  let user = inputUsername.value;
  let pass = inputPassword.value;
  let equals = false;
  for (let i = 0; i < users.length; i++) {
    if (user === users[i].username && pass === users[i].password) {
      equals = true;
      if (equals){
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.outContainer').style.display = 'flex';
      }
    }
  }
  if(!equals) {
    console.log('Error, wrong password or username!', )
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