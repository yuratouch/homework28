const contactsURL = `https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts`,
    contactsBody = document.querySelector("#contactsBody");


class Contacts {
    static async get(url, method=`GET`, obj) {
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

    // static render(data) {
    //     let contactsRender = data
    //         .map(contact =>
    //             `<tr data-id=${contact.id}>
    //                         <td><input type="text" value="${contact.firstName}" disabled></td>
    //                         <td><input type="text" value="${contact.lastName}" disabled></td>
    //                         <td><input type="text" value="${contact.phoneNumber}" disabled></td>
    //                         <td class="actionTD">
    //                             <button class="contactsEdit" class="btns">Edit</button>
                                
    //                             <button class="contactsSave" class="btns">Save</button>
    //                         </td>
    //                     </tr>`
    //         )
    //         .join('')
            
    //     contactsBody.innerHTML = contactsRender;
    // }
}

class Dom {
    //  constructor(data) {
    //     this.data = data
    // }

    static data = "s";

    static render(data) {
        console.log(data)
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
    }

    static addDeleteBtn () {
            let actionTDs = document.querySelectorAll(".actionTD")
           
            actionTDs.forEach(td => {
                let btnsDelete = document.createElement("button");
                btnsDelete.classList.add("contactsDelete");
                btnsDelete.innerHTML = "Delete";
                td.append(btnsDelete)
            })
            
        }
    static addDeleteBtnID() {
        let btnsDelete = document.querySelectorAll(".contactsDelete");
            btnsDelete.forEach(btn => {
                let parentId = btn.parentNode.parentNode.dataset.id;
                btn.dataset.id = `${parentId}`;
            })
        
    }
    static addELDeleteBtn(data) {
         let btnsDelete = document.querySelectorAll(".contactsDelete");
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', () => {
                    let x = btn.dataset.id;
                    console.log(x)
                    Contacts.get(`${contactsURL}/${x}`, `DELETE`)
                    Contacts.get(contactsURL)
                        .then(
                            data => {
                                Dom.render(data);
                                return data;
                            }
                        )
                })
            })
    }

}


Contacts.get(contactsURL)
    .then(
        data => {
            Dom.render(data);
       

            return data;
        }
    )
    .then(
        data => {
            Dom.addDeleteBtn(data);
            return data;
        }
    )
    .then(
        data => {
            Dom.addDeleteBtnID(data);
            return data;
        }
    )
    .then(
        data => {
            Dom.addELDeleteBtn(data);
            return data;
        }
    )





// Contacts.get(contactsURL);
// Contacts.render(response)