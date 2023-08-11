
const socket = io();

let user = null;

if(!user){
    Swal.fire({
        title: '¡Di Hola Chat!',
        text: 'Como te llamas?',
        input: 'text',
        inputValidator: (value)=>{
            if(!value){
                return 'Tu nombre de usuario es requerido'
            }
        }
    }).then((input)=>{
        user = input.value;
        socket.emit('newUser', user);
    });
};

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () =>{
   let a= socket.emit('chat:message', {
        user,
        message: message.value
    });
    message.value = '';
    
});

socket.on('messages', (data)=>{
    actions.innerHTML = '';
    console.log(data)
    const chatRender =  data.map((msg)=>{
        return `<p><strong>${msg.user}: ${msg.message}<strong></p>`
    }).join(' ')
    output.innerHTML = chatRender
});

socket.on('newUser', (user)=>{
    Toastify({
        text: `✅ ${user} is logged in`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
    }).showToast();
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', user);
});

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p> ${data} Esta escribiendote algo... </p>`
})