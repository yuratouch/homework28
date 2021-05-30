export const contactsURL = `https://60ae836f5b8c300017deab8a.mockapi.io/api/contacts`,
    contactsBody = document.querySelector("#contactsBody");

import {Request} from './request.js';
import {Form} from './form.js';
import {Contacts} from './contacts.js';

Form.get();

let createContacts = new Form(`#createTask`);