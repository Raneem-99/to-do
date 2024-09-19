let title = document.getElementById('title');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;


// create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}


submit.onclick = function() {
        let newPro = {
            title: title.value,
        }
        if (title.value != '') {
            if (mood === 'create') {
                if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                        datapro.push(newPro);
                    }
                } else {
                    datapro.push(newPro);
                }
            } else {
                datapro[tmp] = newPro;
                mood = 'create';
                submit.innerHTML = 'ADD';


            }
        }



        //save localstorage
        localStorage.setItem('product', JSON.stringify(datapro))
        console.log(datapro);
        clearInput();
        showData();
    }
    // CLEAR INPUT
function clearInput() {
    title.value = '';

}



//read
let a;

function showData() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td><button id="finish" onclick='finishData(${i})' >finish</button></td>
        <td><button id="update" onclick='updateData(${i})' >update</button></td>
        <td><button id="delete" onclick='deleteData(${i})'>delete</button></td>

    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = ` <button onclick="deleteAll()"> DELETE ALL(${datapro.length}) </button>    `
    } else {
        btnDelete.innerHTML = '';
    }
    ////////////////////////////////////

}
showData();

function msgdelete() {
    let cont = document.getElementById('msg');
    if (a) {
        cont.innerHTML = `<p  style="text-align: center;">the task has been deleted successfully</p>`
    } else {
        cont.innerHTML = '';
    }
}


function msgcleardelete() {
    let cont = document.getElementById('msg');
    if (cont != '') {
        cont.innerHTML = '';
    }
}



//delete
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
    a = confirm("Are you sure ? you're going to delete this task!")

    setTimeout(msgdelete, 500)
    setTimeout(msgcleardelete, 3000)
}


function deleteAll() {
    localStorage.clear()
    datapro.splice(0)
    showData();
}

//finish
function finishData(i) {
    datapro[i].title = `<del>${datapro[i].title}</del>`
    localStorage.product = JSON.stringify(datapro);
    showData();
}

//update
function updateData(i) {
    title.value = datapro[i].title;
    submit.innerHTML = 'UPDATE';
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

}