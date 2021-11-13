import fs from "fs/promises";
import path from "path";
import shortid from 'shortid';

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data.toString());
    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message)
    }
}

export async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data.toString()).find(user => user.id === Number(contactId));
        console.table(result)
    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message)
    }
}

export const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data.toString()).filter(user => user.id !== Number(contactId));
        const newJson = JSON.stringify(result, null, '\t');
        console.table(newJson);

        await fs.writeFile(contactsPath, newJson, (err) => {
            if (err) console.error(err)
        })
    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message);
    }
}

export const addContact = async (name, email, phone) => {
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone,
    }

    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data.toString())
        const contactsList = JSON.stringify([newContact, ...result], null, '\t')

        await fs.writeFile(contactsPath, contactsList, (err) => {
            if (err) console.error(err)
        })

        const dataAfterWrite = await fs.readFile(contactsPath);
        console.table(dataAfterWrite.toString())
    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message)
    }
}