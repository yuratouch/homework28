import {contactsURL,contactsBody} from './script.js';
import {Request} from './request.js';
import {Contacts} from './contacts.js';

export class Form{
	constructor(el){
		this.el = document.querySelector(el);
		this.el.addEventListener('submit', this.submit.bind(this));
	}

	async submit(e){
        e.preventDefault();
        
        let firstInput = document.querySelector('#first-input'),
            lastInput = document.querySelector('#last-input'),
            phoneInput = document.querySelector('#phone-input'),
            inputsArr = [firstInput, lastInput, phoneInput],
            inputValues = {
                firstName: firstInput.value,
                lastName: lastInput.value,
                phoneNumber: phoneInput.value
            };
        
        inputsArr.forEach(input => {
            input.value = ``;
        })
		this.add(inputValues);
	}

	async add(inputValues){
		let newContact = await Request.request(contactsURL,`POST`,inputValues),
		    createContact = new Contacts(newContact);
	}

	static get(){
		Request.request(contactsURL)
			.then(
				contact => {
					contactsBody.innerHTML = ``;
					return contact;
				}
			)
			.then(
				contact => contact.forEach(contact => new Contacts(contact))
			)
	}
}