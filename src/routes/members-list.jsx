import { useState } from 'react';
import '../css/members-list.css';

// Definizione classe Persona
class Person {
  constructor(name, surname, email, age, membershipType) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.age = age;
    this.membershipType = membershipType;
  }
}

function MembersList() {
  // Stato per memorizzare la lista delle persone
  const [people, setPeople] = useState([
    new Person('Mario', 'Rossi', 'mario@example.com', 30, 'Basic'),
    new Person('Luigi', 'Verdi', 'luigi@example.com', 25, 'Premium'),
    new Person('Anna', 'Bianchi', 'anna@example.com', 28, 'Basic'),
  ]);

  // Stato per tracciare l'indice della riga selezionata
  const [lastRow, setLastRow] = useState(null);

  // Stato per tracciare se si è in modalità modifica
  const [isEditing, setIsEditing] = useState(false);

  // Stato per memorizzare i dati del modulo di modifica
  const [editForm, setEditForm] = useState({
    name: '',
    surname: '',
    email: '',
    age: '',
    membershipType: ''
  });

  // Funzione per eliminare una persona dalla lista
  const deletePerson = () => {
    if (lastRow !== null) {
      const updatedPeople = [...people]; // Crea una copia della lista delle persone
      updatedPeople.splice(lastRow, 1); // Rimuove la persona all'indice lastRow
      setPeople(updatedPeople); // Aggiorna lo stato con la nuova lista
      setLastRow(null); // Resetta lastRow
    }
  };

  // Funzione per avviare la modalità modifica per una persona selezionata
  const startEditPerson = () => {
    if (lastRow !== null) {
      const personToEdit = people[lastRow]; // Ottiene la persona da modificare
      // Imposta i dati del modulo di modifica con i dati della persona selezionata
      setEditForm({
        name: personToEdit.name,
        surname: personToEdit.surname,
        email: personToEdit.email,
        age: personToEdit.age,
        membershipType: personToEdit.membershipType
      });
      setIsEditing(true); // Attiva la modalità modifica
    }
  };

  // Funzione per gestire i cambiamenti nei campi di input del modulo di modifica
  const handleEditChange = (e) => {
    const { name, value } = e.target; // Ottiene il nome e il valore del campo di input modificato
    setEditForm((prevForm) => ({
      ...prevForm, // Copia lo stato precedente
      [name]: value // Aggiorna il campo specifico con il nuovo valore
    }));
  };

  // Funzione per salvare le modifiche apportate alla persona
  const saveEditPerson = () => {
    if (lastRow !== null) {
      const updatedPeople = [...people]; // Crea una copia della lista delle persone
      // Aggiorna la persona all'indice lastRow con i nuovi dati dal modulo di modifica
      updatedPeople[lastRow] = new Person(
        editForm.name,
        editForm.surname,
        editForm.email,
        parseInt(editForm.age, 10),
        editForm.membershipType
      );
      setPeople(updatedPeople); // Aggiorna lo stato con la nuova lista
      setLastRow(null); // Resetta lastRow
      setIsEditing(false); // Disattiva la modalità modifica
    }
  };

  return (
    <>
      <h1 className="MembersList">Lista di persone</h1>
      {/* Componente per visualizzare la lista delle persone */}
      <PersonList people={people} setLastRow={setLastRow} lastRow={lastRow} />
      <div className="buttonList">
        <button onClick={startEditPerson}>Edit</button>
        <button onClick={deletePerson}>Delete</button>
      </div>
      {/* Modulo di modifica visualizzato solo se isEditing è true */}
      {isEditing && (
        <div className="editForm">
          <h2>Edit Person</h2>
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="surname"
            value={editForm.surname}
            onChange={handleEditChange}
            placeholder="Surname"
          />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            placeholder="Email"
          />
          <input
            type="number"
            name="age"
            value={editForm.age}
            onChange={handleEditChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="membershipType"
            value={editForm.membershipType}
            onChange={handleEditChange}
            placeholder="Membership Type"
          />
          <button onClick={saveEditPerson}>Save</button>
        </div>
      )}
    </>
  );
}

// Componente per visualizzare la lista delle persone in una tabella
function PersonList({ people, setLastRow, lastRow }) {
  // Funzione per gestire il click su una riga della tabella
  function handleRowClick(index) {
    if (lastRow === index) {
      setLastRow(null); // Deseleziona la riga se è già selezionata
    } else {
      setLastRow(index); // Seleziona la riga
    }
  }

  return (
    <table className="personList">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Age</th>
          <th>Membership Type</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <tr
            key={index}
            onClick={() => handleRowClick(index)}
            className={lastRow === index ? 'active' : ''}
          >
            <td>{person.name}</td>
            <td>{person.surname}</td>
            <td>{person.email}</td>
            <td>{person.age}</td>
            <td>{person.membershipType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MembersList;
