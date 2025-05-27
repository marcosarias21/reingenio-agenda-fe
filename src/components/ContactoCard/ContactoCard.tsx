import { useState } from "react";
import type { Contacto } from "../../types";
import axios from "axios";

const ContactoCard = ({
  _id,
  nombre,
  apellido,
  provincia,
  telefono,
}: Contacto) => {
  const [esEditable, setEsEditable] = useState(false);
  const [nombreInput, setNombreInput] = useState<string>(nombre);
  const [apellidoInput, setApellidoInput] = useState<string>(apellido);
  const [provinciaInput, setProvinciaInput] = useState<string>(provincia);
  const [telefonoInput, setTelefonoInput] = useState<number | string>(telefono);

  const cancelarEdit = () => {
    setEsEditable(false);
    setNombreInput(nombre);
    setApellidoInput(apellido);
    setProvinciaInput(provincia);
    setTelefonoInput(telefono);
  };

  const editarContacto = async () => {
    const editarContactoResp = await axios.put(
      `http://localhost:8000/contactos/editar/${_id}`,
      {
        nombre: nombreInput,
        apellido: apellidoInput,
        provincia: provinciaInput,
        telefono: telefonoInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (editarContactoResp.status === 200) {
      alert(editarContactoResp.data.message);
    }
  };

  return (
    <div className="border-2 border-white/10 rounded px-4 py-2">
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex">
          <label className="font-medium">Nombre:</label>
          {esEditable ? (
            <input
              type="text"
              className="ring-1 pl-2 ring-white/70  rounded"
              value={nombreInput}
              onChange={({ target }) => setNombreInput(target.value)}
            />
          ) : (
            <p className="px-2">{nombre}</p>
          )}
        </div>
        <div className="flex">
          <label className="font-medium">Apellido:</label>
          {esEditable ? (
            <input
              type="text"
              className="ring-1 pl-2 ring-white/70  rounded"
              value={apellidoInput}
              onChange={({ target }) => setApellidoInput(target.value)}
            />
          ) : (
            <p className="pl-2">{apellido}</p>
          )}
        </div>
        <div className="flex">
          <label className="font-medium">Provincia:</label>
          {esEditable ? (
            <input
              type="text"
              className="ring-1 pl-2 ring-white/70  rounded"
              value={provinciaInput}
              onChange={({ target }) => setProvinciaInput(target.value)}
            />
          ) : (
            <p className="pl-2">{provincia}</p>
          )}
        </div>
        <div className="flex">
          <label className="font-medium">Telefono:</label>
          {esEditable ? (
            <input
              type="number"
              className="ring-1 pl-2 ring-white/70  rounded"
              value={telefonoInput}
              onChange={({ target }) => setTelefonoInput(target.value)}
            />
          ) : (
            <p className="pl-2">{telefono}</p>
          )}
        </div>
      </div>
      <div className="my-4 flex justify-end">
        {!esEditable && (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded bg-blue-500 text-white font-medium hover:bg-blue-600"
              onClick={() => setEsEditable(true)}
            >
              Editar
            </button>
            <button
              className="px-4 py-1 rounded bg-red-500 text-white font-medium hover:bg-red-600"
              onClick={() => setEsEditable(true)}
            >
              Borrar
            </button>
          </div>
        )}
        {esEditable && (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded bg-green-500 text-white font-medium hover:bg-green-600"
              onClick={editarContacto}
            >
              Guardar
            </button>
            <button
              className="px-4 py-1 rounded bg-red-500 text-white font-medium hover:bg-red-600"
              onClick={cancelarEdit}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactoCard;
