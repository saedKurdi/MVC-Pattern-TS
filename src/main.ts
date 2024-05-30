import { ContactModel } from "../MVC/models/contactModel";
import { ContactView } from "../MVC/views/contactView";
import { ContactController } from "./../MVC/controllers/contactController";
import "./sass/main.scss";

const controller = new ContactController(new ContactModel(), new ContactView());
