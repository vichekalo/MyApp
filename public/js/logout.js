function loadData() {
    const url = "http://localhost:5000/users";
    axios.get(url).then(displayUser);
}

function signout(){
    window.location.href='../index.html';
}
let logOut=document.querySelector('.leave');
logOut.addEventListener('click',signout);

setInterval(loadData,3000);