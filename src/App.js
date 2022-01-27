import React, { Component } from 'react';

import contactList from './phonelist.json';

import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactFilter from './components/ContactFilter';

class App extends Component {
  state = {
    contacts: contactList,
    filter: '',
  };

  //записать в localStorage  contact, ре-рендер стейта
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contact'));

    if (contacts) {
      console.log(contacts);
      this.setState({ contacts });
    }
  }
  // Если предыдущее состояние contacts не равен состоянию-то взять с локал стореджа contact
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  isInContacts = () => {
    return this.state.contacts.map(contact => contact.name.toLowerCase());
  };

  addContact = data => {
    const existingNames = this.isInContacts();

    if (existingNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [data, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  //фильтр,принятие ивента
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  // метод фильтрации массива
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <ContactFilter onChange={this.changeFilter} value={filter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
