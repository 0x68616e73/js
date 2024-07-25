let registerButton = document.querySelector('.registerButton');
let loginButton = document.querySelector('.loginButton');

let inputUsername = document.getElementById('usernameText');
let inputPassword = document.getElementById('passwordText');

let textSendInput = document.getElementById('textSend')
let commentArea = document.querySelector('.commentsArea')

commentArea.innerHTML = localStorage.getItem('comments');

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
    if (user === ''){
      empty=true;
    }
  }
  if(!equals && !empty) {
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
        document.querySelector('.commentContainer').style.display = 'flex';
      }
    }
  }
  if(!equals) {
    console.log('Error, wrong password or username!', )
  }
}


function sendText() {
  commentArea.innerHTML += `<p><b>${inputUsername.value}</b> said: ${textSendInput.value}</p>`;
  localStorage.setItem('comments', commentArea.innerHTML);
}

registerButton.addEventListener('click', addUser);
loginButton.addEventListener('click', logIn);

textSendInput.addEventListener('keypress',(event) => {
  if (event.key === "Enter") {
    sendText();
  }
});