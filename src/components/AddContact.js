import React, { useState } from "react";

const AddContact = ({ handleHideForm, addContact }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newTag, setNewTag] = useState("");

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

    let newContact = {
      id: new Date().toLocaleString(),
      avatar,
      name,
      phone,
      tag: newTag,
    };
    console.log({ newContact });
    addContact(newContact);
    alert("Contact added successfully");
    handleHideForm();
  };

  return (
    <div className="addContactContainer">
      <div className="addContactHeader">
        <h1>Add Contact</h1>
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
              name="addTag"
              onChange={() => setNewTag("Personal")}
              checked={newTag === "Personal"}
            />
            <span className="tagClass tagPersonal">{"Personal"}</span>
          </div>
          <div>
            <input
              class="cursor-pointer mr-2"
              type="radio"
              name="addTag"
              onChange={() => setNewTag("Work")}
              checked={newTag === "Work"}
            />
            <span className="tagClass tagWork">{"Work"}</span>
          </div>
          <div>
            <input
              class="cursor-pointer mr-2"
              type="radio"
              name="addTag"
              onChange={() => setNewTag("School")}
              checked={newTag === "School"}
            />
            <span className="tagClass tagSchool">{"School"}</span>
          </div>
        </div>
        <div className="addContactButtonDiv">
          <button className="addContactButton" onClick={() => handleSubmit()}>
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
