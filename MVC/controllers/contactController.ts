// Importing 'Contact' class for working :
import { Contact } from "../../src/types/contact";

// Importing 'ContactView' and 'ContacModel' classes to work with them :
import { ContactView } from "../views/contactView";
import { ContactModel } from "../models/contactModel";

export class ContactController {
  private model: ContactModel;
  private view: ContactView;

  // Constructor for initialising the model and view inside controller :
  constructor(model: ContactModel, view: ContactView) {
    this.model = model;
    this.view = view;

    // Binding function to view's functions :

    // Modify functions :

    this.view.bindAddFunction(this.addContact.bind(this));
    this.view.bindEditFunction(this.editContact.bind(this));
    this.view.bindRemoveContactFunction(this.deleteContactByIndex.bind(this));

    // Filter functions :
    this.view.bindFilterByDate(this.filterByDate.bind(this));
    this.view.bindFilterByName(this.filterByName.bind(this));
    this.view.bindFilterByPhone(this.filterByPhone.bind(this));
    this.view.bindFilterByEmail(this.filterByEmail.bind(this));

    this.updateView();
  }

  // Adding 'Contact' and updating view :
  public async addContact(contact: Contact): Promise<void> {
    await this.model.addContact(contact);
    await this.updateView();
  }

  // Deleting 'Contact' and updating view :
  public async deleteContactByIndex(index: number): Promise<void> {
    await this.model.removeContactByIndex(index);
    await this.updateView();
  }

  public async editContact(
    index: number,
    property: string,
    value: string
  ): Promise<void> {
    await this.model.editContactByIndex(index, property, value);
    await this.updateView();
  }

  public async updateView(): Promise<void> {
    await this.view.updateView(await this.model.getContacts());
  }

  // Filtering functions for controller which uses model :
  public async filterByDate(): Promise<void> {
    await this.model.filterContactsByCreationDate();
    this.updateView();
  }

  public async filterByName(): Promise<void> {
    await this.model.filterContactsByName();
    this.updateView();
  }

  public async filterByPhone(): Promise<void> {
    await this.model.filterContactsByPhone();
    this.updateView();
  }

  public async filterByEmail(): Promise<void> {
    await this.model.filterContactsByEmail();
    this.updateView();
  }
}
