const axios = require('axios');

const todoInput = document.getElementById('todo_input');
const todoSubmit = document.getElementById('todo_submit');
const deleteIDs = document.querySelectorAll('#deleteID');
const ul = document.querySelector(".list-group");


/**
 * @description delete todo optimized version (event bubling)
 */
ul.addEventListener('click', (e) => {
    if (e.target.id == "deleteID") {
        let item_text = e.target.parentNode.previousElementSibling.children[0].innerText;
        let liPrent = e.target.parentNode.parentNode.parentNode.parentNode;
        deleteTODO(item_text, liPrent);
    } else if (e.target.id == "doneID") {
        let item = e.target.parentNode.previousElementSibling.children[0];
        let item_text = item.innerText;
        item.classList.add("del");

        doneTodo(item_text);

    }
});

const deleteTODO = (item, liPrent) => {
    item = item.split(' ').join('-');
    axios.delete(`http://localhost:2727/todo/${item}`)
        .then(res => {
            if (res.status >= 400) {
                console.log('something went wrong')
                return;
            }
            console.log(res.data + " succesfully deleted ");
            liPrent.parentNode.removeChild(liPrent);
            // window.location.reload();
        }).
        catch(e => {
            console.log("failed request ")
        });
}

/**
 * unoptimized(it need reload page every time)
 */
// if (deleteIDs) {
//     deleteIDs.forEach(id => {
//         id.addEventListener('click', (e) => {
//             let item = id.parentNode.previousElementSibling.children[0].innerText;
//             let liPrent = id.parentNode.parentNode.parentNode.parentNode;
//             deleteTODO(item, liPrent);
//         });
//     });
// }


/**
 * @description crate new todo item start
 */

todoSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    uploadTodo();
});

const uploadTodo = () => {
    const item = todoInput.value.trim();

    let data = {
        item: item,
        is_done: false
    }
    axios.post('http://localhost:2727/todo', data)
        .then(res => {
            if (res.status >= 400) {
                console.log('something went wrong')
                return;
            }
            todoInput.value = "";
            console.log(res.data + " succesfully added new todo");
            createTodo(item);
            //window.location.reload()
        }).
        catch(e => {
            console.log("failed request ")
        });
};

//crete DOM element

const createTodo = (title_text) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    //li child 1
    const div1 = document.createElement("div");
    div1.classList.add("todo-indicator", "bg-success");
    //li child 2
    const div2 = document.createElement("div");
    div2.classList.add("widget-content", "p-0");
    //li child 2.1
    const div2_child = document.createElement("div");
    div2_child.classList.add("widget-content-wrapper");
    //left content
    const left = document.createElement("div");
    left.classList.add("widget-content-left");

    const title = document.createElement("div");
    title.classList.add("widget-heading");
    title.textContent = title_text;
    left.appendChild(title);

    //right content
    const right = document.createElement("div");
    right.classList.add("widget-content-right");
    //right child 1
    const i1 = document.createElement("i");
    i1.classList.add("fa", "fa-check", "border-0", "btn-transition", "btn", "btn-outline-success");
    i1.id = "doneID";
    //right child 1
    const i2 = document.createElement("i");
    i2.classList.add("fa", "fa-trash", "border-0", "btn-transition", "btn", "btn-outline-danger");
    i2.id = "deleteID";
    right.appendChild(i1);
    right.appendChild(i2);

    //left + right continer
    div2_child.appendChild(left);
    div2_child.appendChild(right);

    //div2
    div2.appendChild(div2_child);

    li.appendChild(div1);
    li.appendChild(div2);

    //insert li into UL
    ul.appendChild(li);

}


/**
 * completed todo..
 */

const doneTodo = (item_text) => {
    let parse_text = item_text.split(" ").join("-");

    axios.put(`http://localhost:2727/todo/${parse_text}`)
        .then(result => {
            console.log(result);
        })
        .catch(e => {
            console.log(e);
        });
}