// Importing type 'Contact' to work with it in 'model' class :
import { Contact } from "./../../src/types/contact";

// Importing special 'LocalStorage' class to work with it :
import { LocalStorage } from "./../../src/ts/components/localStorage";

// Creating 'model' class for MVC pattern :
export class ContactModel {
  // Keeping list of 'Contacts' in private field :
  contacts!: Contact[];

  // Creating contructor to initialize 'Contacts' array :
  constructor() {
    this.getContacts().then((value) => {
      this.contacts = value;
    });
  }

  // Methods :

  // Getting all 'Contacts' :
  public async getContacts(): Promise<Contact[]> {
    this.contacts = await LocalStorage.getContactsFromLocalStorage();
    return this.contacts;
  }

  // Adding new 'Contact' and writing to locale-storage :
  public async addContact(contact: Contact): Promise<void> {
    this.contacts.unshift(contact);
    await LocalStorage.writeContactsToLocalStorage(this.contacts);
  }

  // Removing 'Contact' by index number :
  public async removeContactByIndex(index: number): Promise<void> {
    this.contacts.splice(index, 1);
    await LocalStorage.writeContactsToLocalStorage(this.contacts);
  }

  // Editing 'Contact' by index number :
  public async editContactByIndex(
    index: number,
    property: string,
    value: string
  ): Promise<void> {
    if (property == "name") {
      this.contacts[index].name = value;
    } else if (property == "email") {
      this.contacts[index].email = value;
    } else if (property == "creationDate") {
      this.contacts[index].creationDate = value;
    } else if (property == "phone") {
      this.contacts[index].phone = value;
    }
    await LocalStorage.writeContactsToLocalStorage(this.contacts);
  }

  // Filtering methods for 'Contacts' :

  // Filtering by 'name' property :
  public async filterContactsByName(): Promise<void> {
    this.contacts = this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    LocalStorage.writeContactsToLocalStorage(this.contacts);
    console.log(this.contacts);
  }

  // Filtering by 'phone' property :
  public async filterContactsByPhone(): Promise<void> {
    this.contacts = this.contacts.sort((a, b) =>
      a.phone.localeCompare(b.phone)
    );
    LocalStorage.writeContactsToLocalStorage(this.contacts);
    console.log(this.contacts);
  }

  // Filtering by 'email' property :
  public async filterContactsByEmail(): Promise<void> {
    this.contacts = this.contacts.sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    LocalStorage.writeContactsToLocalStorage(this.contacts);
    console.log(this.contacts);
  }

  // Filtering by 'date' property :
  public async filterContactsByCreationDate(): Promise<void> {
    this.contacts = this.contacts.sort((a, b) =>
      a.creationDate.localeCompare(b.creationDate)
    );
    LocalStorage.writeContactsToLocalStorage(this.contacts);
  }
}
