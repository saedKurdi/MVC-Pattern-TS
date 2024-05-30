// Importing 'Contact' type for working :
import { Contact } from "../../src/types/contact";

// Creating 'ContactView' class to work with interface with better performance :
export class ContactView {
  // 'app' field to get element from html side :
  private app: HTMLDivElement;

  // 'table' element that shows all 'contacts' inside of it :
  private table: HTMLTableElement;

  // 'form' element for text , telefon , email :
  private form: HTMLFormElement;

  // 'filtering' combo box for 'app' :
  private filter: HTMLSelectElement;

  // Creating functions that will be binded from 'controller' :
  private addContact: (contact: Contact) => Promise<void>;
  private removeContactByIndex: (index: number) => Promise<void>;
  private editContactByIndex: (
    index: number,
    property: string,
    value: string
  ) => Promise<void>;
  private filterContactsByName: () => Promise<void>;
  private filterContactsByPhone: () => Promise<void>;
  private filterContactsByEmail: () => Promise<void>;
  private filterContactsByDate: () => Promise<void>;

  // Default constructor for view :
  constructor() {
    // Setting 'app' field :
    this.app = document.getElementById("app") as HTMLDivElement;
    this.table = document.createElement("table") as HTMLTableElement;
    this.table.className = "contact-table";
    this.form = document.createElement("form") as HTMLFormElement;
    this.form.className = "add-form";

    // Setting filtering combo box :
    this.filter = document.createElement("select") as HTMLSelectElement;
    const options = `
    <option value='date'>Date</option>
    <option value='name'>Name</option>
    <option value='phone'>Phone</option>
    <option value='email'>Email</option>
    `;
    this.filter.insertAdjacentHTML("beforeend", options);
    this.filter.addEventListener("change", async (e) => {
      e.preventDefault();
      const select: HTMLSelectElement = e.currentTarget as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex].textContent;
      const txt = selectedOption?.toLocaleLowerCase();
      if (txt == "date") {
        await this.filterContactsByDate();
      } else if (txt == "name") {
        await this.filterContactsByName();
      } else if (txt == "phone") {
        await this.filterContactsByPhone();
      } else if (txt == "email") {
        await this.filterContactsByEmail();
      }
    });
    this.filter.id = "filter";

    // Inserting 'filter' element to 'app' :
    this.app.appendChild(this.filter);

    // Creating 'input' elements for 'form' :
    const items = `
    <input type='text' placeholder='Name' id='name-input'>
    <input type='tel' placeholder='Phone' id='phone-input'>
    <input type='email' placeholder='Email' id='email-input'>
    <button id='add-btn'>Add</button>
    `;

    // Inserting input 'items' to the form element :
    this.form.insertAdjacentHTML("beforeend", items);

    // Inserting form to 'app' :
    this.app.append(this.form);

    // Adding event to button :
    const addBtn: HTMLButtonElement = document.querySelector(
      "#add-btn"
    ) as HTMLButtonElement;
    addBtn.style.cursor = "pointer";
    addBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const nameInput: HTMLInputElement = document.querySelector(
        "#name-input"
      ) as HTMLInputElement;
      const phoneInput: HTMLInputElement = document.querySelector(
        "#phone-input"
      ) as HTMLInputElement;
      const emailInput: HTMLInputElement = document.querySelector(
        "#email-input"
      ) as HTMLInputElement;

      // Creating object of 'Contact' to add it to the model :
      const newContact: Contact = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        creationDate: new Date().toTimeString(),
      };

      // Adding this 'contact' to model :
      await this.addContact(newContact);

      nameInput.value = "";
      phoneInput.value = "";
      emailInput.value = "";
    });

    this.addContact = async () => {};
    this.removeContactByIndex = async () => {};
    this.editContactByIndex = async () => {};
    this.filterContactsByName = async () => {};
    this.filterContactsByPhone = async () => {};
    this.filterContactsByEmail = async () => {};
    this.filterContactsByDate = async () => {};
  }

  public async updateView(contacts: Contact[]): Promise<void> {
    this.table.innerHTML = "";
    // Creating headers for table :
    const headers = ["Name", "Phone", "Email", "Date"];
    const tr: HTMLTableRowElement = document.createElement(
      "tr"
    ) as HTMLTableRowElement;
    headers.forEach(async (h): Promise<void> => {
      const th = document.createElement("th");
      th.textContent = h;
      tr.appendChild(th);
    });

    // Appending 'tr' to 'table' :
    this.table.appendChild(tr);

    // Appending 'table' to 'app' :
    this.app.appendChild(this.table);
    // Getting table :
    const table: HTMLTableElement = document.querySelector(
      ".contact-table"
    ) as HTMLTableElement;

    // Inserting data to it :
    contacts.forEach(async (contact: Contact, index: number): Promise<void> => {
      // Creating 'tr' for each contact :
      const tr: HTMLTableRowElement = document.createElement(
        "tr"
      ) as HTMLTableRowElement;

      // Inserting all data inside 'contact' to this row :
      Object.values(contact).forEach(async (value: string): Promise<void> => {
        const td = document.createElement("td");
        td.style.marginRight = "50px";
        td.textContent = value;
        tr.append(td);
      });

      // Adding delete and edit buttons at last to 'tr' element :
      const deleteButton: HTMLElement = document.createElement(
        "i"
      ) as HTMLElement;
      deleteButton.className = "fa-solid fa-user-xmark";
      deleteButton.style.cursor = "pointer";

      const editButton: HTMLElement = document.createElement(
        "i"
      ) as HTMLElement;
      editButton.className = "fa-solid fa-user-edit";
      editButton.style.cursor = "pointer";

      // Adding function for 'delete' button :
      deleteButton.addEventListener("click", async (): Promise<void> => {
        await this.removeContactByIndex(index);
      });

      // Adding function for 'edit' button :
      editButton.addEventListener("click", async (): Promise<void> => {});

      tr.append(deleteButton);
      tr.append(editButton);

      table.append(tr);
    });
  }

  // Binding functions for 'view' :
  public async bindAddFunction(
    handler: (contact: Contact) => Promise<void>
  ): Promise<void> {
    this.addContact = handler;
  }

  public async bindEditFunction(
    handler: (index: number, property: string, value: string) => Promise<void>
  ): Promise<void> {
    this.editContactByIndex = handler;
  }

  public async bindRemoveContactFunction(
    handler: (index: number) => Promise<void>
  ): Promise<void> {
    this.removeContactByIndex = handler;
  }

  // Filtering binding functions for 'view' :
  public async bindFilterByDate(handler: () => Promise<void>): Promise<void> {
    this.filterContactsByDate = handler;
  }

  public async bindFilterByName(handler: () => Promise<void>): Promise<void> {
    this.filterContactsByName = handler;
  }

  public async bindFilterByPhone(handler: () => Promise<void>): Promise<void> {
    this.filterContactsByPhone = handler;
  }

  public async bindFilterByEmail(handler: () => Promise<void>): Promise<void> {
    this.filterContactsByEmail = handler;
  }
}
