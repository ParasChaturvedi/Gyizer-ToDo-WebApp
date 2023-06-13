function loadData() {
  var data;
  if (
    localStorage.getItem("todo_app_data") == null ||
    localStorage.getItem("todo_app_data") == undefined
  ) {
    var Testdata = [
      {
        id: 1,
        title: "hello world",
        daate_time: "12:00 | june 17 2019",
        done: true,
      },
    ];
    localStorage.setItem("todo_app_data", JSON.stringify(Testdata));
    dataJSON = localStorage.getItem("todo_app_data");
    data = JSON.parse(dataJSON);
  } else {
    dataJSON = localStorage.getItem("todo_app_data");
    data = JSON.parse(dataJSON);
  }
  return data;
}

var showToDoVar = document.getElementById("showToDo");

function showToDo() {
  showToDoVar.innerHTML = "";
  if (loadData().length == 1) {
    showToDoVar.innerHTML += `<div class="todo-item" style="height:300px; display:flex;align-items:center;justify-content:center; flex-wrap:wrap; background:#242320;">
                 <div class="empty" style=" display:block;align-items:center;">
                 <span style="border-top:3px solid #FF8303;border-bottom:3px solid #FF8303; font-size:24px;font-weight:400;color:#fff;">No tasks<span>
                 </div>
              </div>`;
  } else {
    for (var i = loadData().length - 1; i > 0; i--) {
      if (loadData()[i].done == true) {
        showToDoVar.innerHTML += `<div class="todo-item">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
        X
      </button>
      
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body text-center">
              Delete this task?
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn" data-bs-dismiss="modal" style="width:185px;">No</button>
              <button type="button" class="btn" data-bs-dismiss="modal" onclick="removeToDo(${i})" style="width:185px;">Yes</button>
            </div>
          </div>
        </div>
      </div>
                  <a href="#Info" class="remove-to-do-i" onclick="infoToDo(${i})">i</a>
                  <h2 class="h2-done">${loadData()[i].title}</h2><br>
                  <p class="h2-done">${loadData()[i].about}</p>
                  <br />
                  <small>created ${loadData()[i].daate_time}</small>
              </div>
              `;
      } else {
        showToDoVar.innerHTML += `<div class="todo-item">
         
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
          X
        </button>
        
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-center">
                Delete this task?
              </div>
              <div class="modal-body text-center" style="padding-right: 70px;">
                <button type="button" class="btn" data-bs-dismiss="modal" style="width:180px;">No</button>
                <button type="button" class="btn" data-bs-dismiss="modal" onclick="removeToDo(${i})" style="width:180px;">Yes</button>
              </div>
            </div>
          </div>
        </div>
              <a href="#Info" class="remove-to-do-i" onclick="infoToDo(${i})">i</a>
              
              <h2>${loadData()[i].title}</h2><br>
              <p>${loadData()[i].about}</p>
              <br />
              <small>created ${loadData()[i].daate_time}</small>
          </div>
          `;
      }
    }
  }
}

function addToDo() {
  var toDoTitle = document.getElementById("ToDotitle");
  var toDOAbout = document.getElementById("ToDoAbout");
  if (toDoTitle.value == "") {
    toDoTitle.style.borderColor = "#FF8303";
    toDoTitle.placeholder = "This field is required";
    return 0;
  }
  var d = new Date();
  objId = d.getTime();
  month = d.getMonth();
  objTime =
    d.getHours() +
    ":" +
    d.getMinutes() +
    " | " +
    d.getDate() +
    " / " +
    month +
    " / " +
    d.getFullYear();

  newObj = {
    id: objId,
    title: toDoTitle.value,
    about: toDOAbout.value,
    daate_time: objTime,
    done: false,
  };
  var newData = [];
  newData = JSON.parse(localStorage.getItem("todo_app_data"));
  newData.push(newObj);

  newDataStr = JSON.stringify(newData);
  localStorage.setItem("todo_app_data", newDataStr);
  toDoTitle.value = "";
  toDOAbout.value = "";
  toDoTitle.style.borderColor = "#FF8303";
  toDOAbout.style.borderColor = "#FF8303";
  toDoTitle.placeholder = "what do you need to do?";

  showToDo();
}

function doneToDo(isDone, index, tag) {
  var newData;
  newData = JSON.parse(localStorage.getItem("todo_app_data"));
  if (isDone == true) {
    tag.nextSibling.nextSibling.removeAttribute("class");
    newData[index].done = false;
    newDataStr = JSON.stringify(newData);
    localStorage.setItem("todo_app_data", newDataStr);
    isDone = false;
  } else {
    tag.nextSibling.nextSibling.setAttribute("class", "h2-done");
    newData[index].done = true;
    newDataStr = JSON.stringify(newData);
    localStorage.setItem("todo_app_data", newDataStr);
    isDone = true;
  }
  showToDo();
}

function removeToDo(index) {
  var newData;
  newData = JSON.parse(localStorage.getItem("todo_app_data"));
  newData.splice(index, 1);
  newDataStr = JSON.stringify(newData);
  localStorage.setItem("todo_app_data", newDataStr);

  showToDo();
}
