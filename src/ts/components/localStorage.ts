// Importing 'Contact' type for working :
import { Contact } from "../../types/contact";

// Working with local-storage web api :
export class LocalStorage {
  public static async getContactsFromLocalStorage(): Promise<Contact[]> {
    return JSON.parse(localStorage.getItem("contacts") as string) as Contact[];
  }

  public static async writeContactsToLocalStorage(
    contacts: Contact[]
  ): Promise<void> {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}
