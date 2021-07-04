//----------------Login To Chat----------------------
function loginToChat (event) {
    event.preventDefault();
    let input_username = document.querySelector("#username").value;
    let input_password = document.querySelector("#password").value;
    let URL = "http://localhost:5000/users";
    axios
    .get(URL)
    .then(res => compareUser(res,input_username,input_password))
}
function compareUser(res,input_username,input_password) {
    let users = res.data;
    isCorrect=false;
    for (let user of users) {
        if (user.username === input_username && user.password ===input_password ) {
            window.location.href = "http://localhost:5000/chat.html";
            localStorage.setItem("username", user.username);   
            localStorage.setItem('password',user.password) ;
            isCorrect=true
        }
    }
    if (isCorrect===false){
        alert('Incorrect Username and Password !!')
    }
}
let btnLogin =document.querySelector("#login");
btnLogin.addEventListener("click", loginToChat);



