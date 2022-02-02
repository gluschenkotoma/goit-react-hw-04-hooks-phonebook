import { useState, useEffect } from 'react';
import contactList from './phonelist.json';

import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactFilter from './components/ContactFilter';

const App = () => {
  const [contacts, setContacts] = useState(contactList);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: contactList,
  //   filter: '',
  // };
  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contact'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  //записать в localStorage  contact, ре-рендер стейта
  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contact'));

  //   if (contacts) {
  //     console.log(contacts);
  //     this.setState({ contacts });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  // // Если предыдущее состояние contacts не равен состоянию-то взять с локал стореджа contact
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contact', JSON.stringify(this.state.contacts));
  //   }
  // }

  const isInContacts = () => {
    return contacts.map(contact => contact.name.toLowerCase());
    // return this.state.contacts.map(contact => contact.name.toLowerCase());
  };

  const addContact = data => {
    const existingNames = isInContacts();

    if (existingNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(
        contacts => [data, ...contacts]
        // this.setState(prevState => ({ contacts: [data, ...prevState.contacts],
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
    // this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== contactId), }));
  };

  //фильтр,принятие ивента
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
    // this.setState({ filter: e.currentTarget.value });
  };
  // метод фильтрации массива
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <ContactFilter onChange={changeFilter} value={filter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};
export default App;