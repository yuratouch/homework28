import {contactsURL, contactsBody} from './script.js';
import {Request} from './request.js';
import { Form } from './form.js';

export class Contacts {
    constructor(contacts){
		this.create(contacts);
		this.render();
    }

    create(contacts){
		for(let key in contacts){
			this[key] = contacts[key];
		}
	}

    render() {
       let tr = document.createElement(`tr`),
			tdBtn = document.createElement(`td`),
			editBtn = document.createElement(`button`),
			saveBtn = document.createElement(`button`),
            deleteBtn = document.createElement(`button`);
        
        tr.dataset.id = this.id;
        
        editBtn.innerHTML = `EDIT`;
        editBtn.className = `edit-btn btns`;
        editBtn.dataset.edit = `edit-${this.id}`;
        editBtn.addEventListener(`click`, this.edit.bind(this));
        
        saveBtn.innerHTML = `SAVE`;
        saveBtn.className = `save-btn btns`;
        saveBtn.dataset.save = `save-${this.id}`;
		saveBtn.disabled = true;
		saveBtn.addEventListener('click',this.save.bind(this));

		deleteBtn.innerHTML = `DELETE`;
        deleteBtn.className = `delete-btn btns`;
        deleteBtn.addEventListener(`click`, this.delete.bind(this));
        
        tdBtn.append(editBtn,saveBtn,deleteBtn);
        tr.innerHTML = `<td><input data-id="firstName-${this.id}" type="text" value="${this.firstName}" disabled></td>
                        <td><input data-id="lastName-${this.id}" type="text" value="${this.lastName}" disabled></td>
                        <td><input data-id="phoneNumber-${this.id}" type="text" value="${this.phoneNumber}" disabled></td>`
                        
        tr.append(tdBtn);
		contactsBody.append(tr);

    }

    edit(){
        let firstNInput = document.querySelector(`[data-id="firstName-${this.id}"]`),
            lastNInput = document.querySelector(`[data-id="lastName-${this.id}"]`),
            phoneNInput = document.querySelector(`[data-id="phoneNumber-${this.id}"]`),
            saveBtn = document.querySelector(`[data-save="save-${this.id}"]`),
            inputArr = [firstNInput, lastNInput, phoneNInput];
			        
        inputArr.forEach(input => {
            input.disabled = false;
            input.classList.add('editable')
        })
        saveBtn.classList.toggle('active')
		saveBtn.disabled = false;
	}

    save(){
        let tr = document.querySelector(`tr[data-id="${this.id}"]`),
            firstNInput = document.querySelector(`[data-id="firstName-${this.id}"]`),
            lastNInput = document.querySelector(`[data-id="lastName-${this.id}"]`),
            phoneNInput = document.querySelector(`[data-id="phoneNumber-${this.id}"]`);

		let contact = {
			id: tr.dataset.id,
            firstName: firstNInput.value,
            lastName: lastNInput.value,
            phoneNumber: phoneNInput.value
		}

		Request.request(`${contactsURL}/${this.id}`,`PUT`,contact)
			.then(
				() => Form.get()
			)
    }
    
    delete(){
        Request.request(`${contactsURL}/${this.id}`, `DELETE`)
            .then(
                () => Form.get()
            )
	}
}