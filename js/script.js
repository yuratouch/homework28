const contactsURL = `https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts`,
    contactsBody = document.querySelector("#contactsBody");
    // btnEdit = document.querySelector("#contactsBody"),
    // // btnDelete = document.querySelector("#contactsDelete"),
    // btnSave = document.querySelector("#contactsSave");

let get = async (url, method=`GET`, obj) => {

    let options = {
            method: method,
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }

    if(obj)
        options.body = JSON.stringify(obj);

    let request = await fetch(url,options),
        response = await request.json();

    return response;
}


function render (data) {
    let contactsRender = data
        .map(contact =>
            `<tr data-id=${contact.id}>
                        <td><input type="text" value="${contact.firstName}" disabled></td>
                        <td><input type="text" value="${contact.lastName}" disabled></td>
                        <td><input type="text" value="${contact.phoneNumber}" disabled></td>
                        <td class="actionTD">
                            <button class="contactsEdit" class="btns">Edit</button>
                            
                            <button class="contactsSave" class="btns">Save</button>
                        </td>
                    </tr>`
        )
        .join('')
            
    contactsBody.innerHTML = contactsRender;
};

//<button class="contactsDelete" class="btns">Delete</button>

get(contactsURL)
    .then(
        data => {
            render(data)
            return data;
        }
    )
    .then(
        (data) => {
            let actionTDs = document.querySelectorAll(".actionTD")
           
            actionTDs.forEach(td => {
                let btnsDelete = document.createElement("button");
                btnsDelete.classList.add("contactsDelete");
                btnsDelete.innerHTML = "Delete";
                td.append(btnsDelete)
            })
            return data;
        }
    )
    .then(
        (data) => {
            let btnsDelete = document.querySelectorAll(".contactsDelete");
            btnsDelete.forEach(btn => {
                let parentId = btn.parentNode.parentNode.dataset.id;
                btn.dataset.id = `${parentId}`;
            })
            return data;
        }
    )
    .then(
        (data) => {
            let btnsDelete = document.querySelectorAll(".contactsDelete");
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', () => {
                    let x = btn.dataset.id;
                    console.log(x)
                    get(`${contactsURL}/${x}`, `DELETE`)
                    
                })
            })
            return data;
        }
    )
    .then(
        (data) => {
            let btnsDelete = document.querySelectorAll(".contactsDelete");
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', () => {
                    // debugger
                    get(contactsURL)
                        .then(
                            data => {
                                render(data)
                                return data;
                            }
                        )
                    
                })
            })
            return data;
        }
)
    




