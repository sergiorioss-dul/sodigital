const socket = io();

//Dom elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");
let title = document.getElementById("title");

btn.addEventListener("click", function () {
  socket.emit("msj", {
    username: username.value,
    msj: message.value,
  });
});

function onClose(){
  socket.emit('terminate');
  window.location.href = "/";
}

socket.on("welcome",function(welcome){
  title.innerHTML = `<h1>${welcome}</h1>`;
  console.log(welcome);
});

message.addEventListener('keypress',function(){
    socket.emit('typing', username.value);
});

socket.on("msj", function (data) {
  document.getElementById("inputs").style.display = 'none';
  document.getElementById("actions").style.display = 'none';
  document.getElementById("send").style.display = 'none';
  data.map(i =>(
    output.innerHTML += `<p><strong>${i.username}</strong> : ${i.msj}</p>`
  ));
});

socket.on("typing",function(data){
    actions.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
