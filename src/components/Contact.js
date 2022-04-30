import React from "react";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

export const Contact = ({ contactProp, deleteContact, handleEditForm }) => {
  const { name, _id, avatar, phone, tag } = contactProp;
  return (
    <div className="contactOuter">
      <img src={avatar} alt={name} />

      <div className="contactInner">
        <h2>{name}</h2>
        <p>{phone}</p>
        <div
          className={`tagClass ${
            tag === "Personal"
              ? "tagPersonal"
              : tag === "Work"
              ? "tagWork"
              : "tagSchool"
          } `}
        >
          {tag}
        </div>
      </div>

      <div className="contactAction">
        <div
          onClick={() => handleEditForm(contactProp)}
          className="actionIcon"
          title="Edit"
        >
          <MdOutlineEdit size={25} />
        </div>
        <div
          onClick={() => deleteContact(_id)}
          className="actionIcon"
          title="Delete"
        >
          <MdOutlineDelete size={25} />
        </div>
      </div>
    </div>
  );
};
