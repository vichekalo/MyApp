//------Send Message-----
function displayUser(response){
    let users = response.data;
    const getuser=localStorage.getItem('username');
    const getpassword=localStorage.getItem('password');
    let communication = document.querySelector(".communication")
    let chatmessage= document.querySelector(".chatmessage");
    if (chatmessage!==null){
        chatmessage.remove();
    }
    let Newchatmessage= document.createElement("div");
    Newchatmessage.classList.add("chatmessage")
    for (let user of users){
        //---create div element for contain fielset and time
        const div=document.createElement('div');
        div.className="list";
        //---create element fielset for store all spans
        const fieldset = document.createElement("fieldset");
        //--create span for contain time
        const span_time=document.createElement('span');
        span_time.className="time";
        //-----create element span for contain name and text message
        const span_text=document.createElement('span');
        span_text.className='textMessage';

        if (user.bold === "B"){
            span_text.textContent=user.username+":"+user.text;
            span_text.style.fontWeight="bold";
            span_time.textContent=user.time;
        }
        else if (user.italic === "I"){
            span_text.textContent=user.username + ":" + user.text;
            span_text.style.fontStyle="italic";
            span_time.textContent=user.time;
        }
        else{
            span_text.textContent=user.username + ":" + user.text;
            span_time.textContent=user.time;
        }

        //---create elelment span for contain icon edit
        const span_edit=document.createElement('span');
        span_edit.className="fa fa-pencil-square-o";
        span_edit.addEventListener('click',function(){
            if (user.username===getuser && user.password === getpassword){
                id=user.id;
                let text= user.text;
                getText(text);
            }
            else{
                confirm ("cannot edit message! You can only eidt your message")
            }
        });

        //---- create element span for contain icon delete---
        const span_delete=document.createElement('span');
        span_delete.className="fa fa-trash ";
        span_delete.addEventListener('click',function(){
            if (user.username=== getuser && user.password===getpassword){
                let idDelete=user.id
                deleteMessage(idDelete);
            }
            else{
                confirm ("cannot delete message! You can only delete your message");
            }
        });
        fieldset.appendChild(span_text);
        fieldset.appendChild(span_edit);
        fieldset.appendChild(span_delete);
        fieldset.style.backgroundColor='tomato';
        fieldset.style.color='black';
        div.appendChild(span_time);
        div.appendChild(fieldset);
        Newchatmessage.appendChild(div)
        communication.appendChild(Newchatmessage)
    }

    //---clear value
    bold='';
    italic='';
}
// ----create empty object for store all value

let User={};
let italic="";
let bold="";
let id=0;

//--get text when click on button update

function getText (message){
    const text = document.querySelector(".writemessage");
    text.value= message;
}

//---update message---
function updateMessage(){
    const text=document.querySelector('.writemessage').value;
    const url="http://localhost:5000/users/"+id;
    axios.put(url,{text:text}).then(displayUser);

}

//-----button update
const btnupdate = document.querySelector("#update_message");
btnupdate.addEventListener("click", updateMessage);

//---delete message
function deleteMessage(id){
    const url = "http://localhost:5000/users/"+ id;
    axios.delete(url).then(displayUser);
}

//--send message
function sendMessage(e){
    const getuser =localStorage.getItem('username');
    const getpassword=localStorage.getItem('password');
    const text =document.querySelector('.writemessage').value;
    //----audio
    const x=document.getElementById('myAudio');
    x.play();
    //---data and time
    let d=new Date();
    let ampm='';
    let time='';
    if (d.getHours()>=12){
        ampm="PM"
    }else{
        ampm="AM"
    };

    time =d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+ampm;
    User.username=getuser;
    User.password=getpassword;

    User.text=text;
    User.time=time;
    User.bold=bold;
    User.italic=italic;

    const url="http://localhost:5000/users";

    axios.post(url, User).then(displayUser);

    document.querySelector('.writemessage').value='';
    disablebutton();
}

let enablebutton = () => {
    btnsend.removeAttribute("disabled");
}

let disablebutton = () => {
    btnsend.setAttribute("disabled", "");
};

document.addEventListener("keyup", () => {
    const text_message = document.querySelector(".writemessage").value;

    if (text_message !== ""){
        enablebutton();

    } else {
        disablebutton();
    }
})
//...............button send message.........................//
const btnsend = document.querySelector(".send");
btnsend.addEventListener('click', sendMessage);

//.......................load data.............................//
function loadData() {
    const url = "http://localhost:5000/users";
    axios.get(url).then(displayUser);
}

//........... text bold..............//
function covertToBold() {
    bold = "B";
    console.log('Bold')
}
const textBold = document.querySelector(".bold");
textBold.addEventListener("click", covertToBold);
//...............text italic....................//
function covertToItalic() {
    italic = "I";  
    console.log("italic")
}

const textItalic = document.querySelector(".italic");
textItalic.addEventListener("click", covertToItalic);
//Redfresh
setInterval(loadData,3000);
//Log out
// function signout(){
//     window.location.href='../index.html';
// }
// let logOut=document.querySelector('.leave');
// logOut.addEventListener('click',signout);

// setInterval(loadData,500);

