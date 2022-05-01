import React, { useState } from "react";

const EditContact = ({ setShowEditForm, contact, editContact }) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [avatar, setAvatar] = useState(contact.avatar);
  const [newTag, setNewTag] = useState(contact.tag);

  const handleSubmit = () => {
    if (name === "" && phone === "" && newTag === "") {
      return alert("Please fill all feilds");
    }

    if (name.length < 3) {
      return alert("Name must be atleast 3 characters");
    }

    if (phone.length !== 10) {
      return alert("Phone number must be 10 digits");
    }

    if (newTag === "") {
      return alert("Please select a tag");
    }
    if (avatar === "") {
      return alert("Please insert avatar");
    }

    let editedContact = {
      avatar,
      name,
      phone,
      tag: newTag,
    };
    console.log({ editedContact });
    fetch("https://mern2k22-backend.herokuapp.com/contact/" + contact._id, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(editedContact),
    })
      .then((res) => res.json()) // must include this
      .then((res) => {
        // console.log({ res });
        let updatedContact = {
          _id: res.contact._id,
          avatar: res.contact.avatar,
          name: res.contact.name,
          phone: res.contact.phone,
          tag: res.contact.tag,
        };
        editContact(updatedContact);
        alert("Contact updated successfully");
        setShowEditForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addContactContainer">
      <div className="addContactHeader">
        <h1>Edit Contact</h1>
      </div>
      <div className="addContactOuter">
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputDiv">
          <input
            placeholder="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="inputDiv">
          <input
            placeholder="Avatar"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <div className="tagDiv">
          <div>
            <input
              type="radio"
              name="editTag"
              onChange={() => setNewTag("Personal")}
              checked={newTag === "Personal"}
            />
            <span className="tagClass tagPersonal">{"Personal"}</span>
          </div>
          <div>
            <input
              class="cursor-pointer mr-2"
              type="radio"
              name="editTag"
              onChange={() => setNewTag("Work")}
              checked={newTag === "Work"}
            />
            <span className="tagClass tagWork">{"Work"}</span>
          </div>
          <div>
            <input
              class="cursor-pointer mr-2"
              type="radio"
              name="editTag"
              onChange={() => setNewTag("School")}
              checked={newTag === "School"}
            />
            <span className="tagClass tagSchool">{"School"}</span>
          </div>
        </div>
        <div className="addContactButtonDiv">
          <button className="addContactButton" onClick={() => handleSubmit()}>
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
