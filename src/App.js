import "./App.css";
import contactData from "./contacts.json";
import { IoPersonAddSharp } from "react-icons/io5";
import AddContact from "./components/AddContact";
import { useEffect, useState } from "react";
import { Contact } from "./components/Contact";
import EditContact from "./components/EditContact";

function App() {
  const [contactList, setContactList] = useState(contactData);
  const [showForm, setShowForm] = useState(false);
  const [tag, setTag] = useState("None");

  const [editedContact, setEditedContact] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleHideForm = () => {
    setShowForm(false);
  };
  const handleEditForm = (contact) => {
    setShowForm(false);
    setEditedContact(contact);
    setShowEditForm(!showEditForm);
  };
  useEffect(() => {
    setLoader(true);
    var url = "http://localhost:4000/contact";
    if (tag !== "None") url = url + "?tag=" + tag;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setContactList(res.contact);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tag]);

  const addContact = (contact) => {
    setContactList([...contactList, contact]);
  };

  const editContact = (editedContact) => {
    //post request send edited contact
    //respond -> update the contactList
    let oldContactIndex = contactList.findIndex(
      (contact) => contact._id === editedContact._id // compare _id of contact
    );
    console.log({ oldContactIndex });
    let oldContactList = [...contactList];
    oldContactList[oldContactIndex] = editedContact;
    setContactList(oldContactList);
  };

  const deleteContact = (_id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      const url = "http://localhost:4000/contact/" + _id;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          alert("Contact deleted");
          const newContactList = contactList.filter(
            (contact) => contact._id !== _id
          );
          setContactList(newContactList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {/* header */}
      <div className="header">
        <h1>Contacts App</h1>
      </div>

      {/* view contacts  */}
      <div className="outerContainer">
        <div className="leftContainer">
          {/* filter feature */}
          <div className="filterContainer">
            <p>Filter By: </p>
            <div className="tagDiv">
              <div>
                <input
                  type="radio"
                  name="tag"
                  onChange={() => setTag("None")}
                  checked={tag === "None"}
                />
                <span className="tagClass tagNone">{"None"}</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tag"
                  onChange={() => setTag("Personal")}
                  checked={tag === "Personal"}
                />
                <span className="tagClass tagPersonal">{"Personal"}</span>
              </div>
              <div>
                <input
                  class="cursor-pointer mr-2"
                  type="radio"
                  name="tag"
                  onChange={() => setTag("Work")}
                  checked={tag === "Work"}
                />
                <span className="tagClass tagWork">{"Work"}</span>
              </div>
              <div>
                <input
                  class="cursor-pointer mr-2"
                  type="radio"
                  name="tag"
                  onChange={() => setTag("School")}
                  checked={tag === "School"}
                />
                <span className="tagClass tagSchool">{"School"}</span>
              </div>
            </div>
          </div>
          {loader ? (
            <h1>Importing contacts . . .</h1>
          ) : contactList.length === 0 ? (
            <div>
              <p>You have not added any contacts yet . . .😔😔😔</p>
            </div>
          ) : (
            contactList.map((contact, index) => (
              <Contact
                contactProp={contact}
                key={contact.id}
                deleteContact={deleteContact}
                handleEditForm={handleEditForm}
              />
            ))
          )}
        </div>
        <div className="rightContainer">
          {/* form */}
          {showForm && (
            <AddContact
              addContact={addContact}
              handleHideForm={handleHideForm}
            />
          )}
          {showEditForm && (
            <EditContact
              contact={editedContact}
              setShowEditForm={setShowEditForm}
              editContact={editContact}
            />
          )}
        </div>
      </div>

      {/* add button */}
      <div
        onClick={() => {
          setShowEditForm(false);
          setShowForm(!showForm);
        }}
        className="addButton"
        title="add contact"
      >
        <IoPersonAddSharp size={25} color="white" />
      </div>
    </>
  );
}

export default App;
