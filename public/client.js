// Socket
const socket = io();
// DOM


const msgPool = document.querySelector('#chat-pool')
const mailInput = document.querySelector('#email')
const msjInput = document.querySelector('#mensaje')
const nameInput = document.querySelector('#nombre')
const lastNameInput = document.querySelector('#apellido')
const nickInput = document.querySelector('#alias')
const btnSend = document.querySelector('#btn-send')

console.log('probanding')

// CHAT

function sendMsg (msgInfo) {
    socket.emit('client:msg', msgInfo);
}
function renderMsgs (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="nick">${msgInfo.author.nombre}</span>
        [<span class="dateText">${msgInfo.fechahora}<span>]: 
        <span class="msgText">${msgInfo.text}</span>
        </div>`)
    }).join(" ");
    msgPool.innerHTML = html;
}

function submitHandlerMsg (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString()
    const msgInfo = {
        author: {
          email: mailInput.value,
          nombre: nameInput.value,
          apellido: lastNameInput.value,
          alias: nickInput.value,
          
        },
        text: msjInput.value ,
        fechahora: fechayhora,
      };
    sendMsg(msgInfo);
    msjInput.value = ''
    
}

formMsj.addEventListener('submit', submitHandlerMsg);

socket.on('server:msgs', async arrayMsj => {
    
    renderMsgs(arrayMsj)
});








