import { useState } from "react";
import type { Contacto, ArgumentoContacto } from "../../types";

interface Prop extends Contacto {
  editarContacto: (id: string, data: ArgumentoContacto) => void;
  borrarContacto: (id: string) => void;
}

const ContactoCard: React.FC<Prop> = ({
  _id,
  nombre,
  apellido,
  provincia,
  telefono,
  editarContacto,
  borrarContacto,
}) => {
  const [esEditable, setEsEditable] = useState(false);
  const [nombreInput, setNombreInput] = useState<string>(nombre);
  const [apellidoInput, setApellidoInput] = useState<string>(apellido);
  const [provinciaInput, setProvinciaInput] = useState<string>(provincia);
  const [telefonoInput, setTelefonoInput] = useState<number>(telefono);

  const handleEditar = () => {
    editarContacto(_id, {
      nombre: nombreInput,
      apellido: apellidoInput,
      provincia: provinciaInput,
      telefono: telefonoInput,
    });
    setEsEditable(false);
  };

  const cancelarEdit = () => {
    setEsEditable(false);
    setNombreInput(nombre);
    setApellidoInput(apellido);
    setProvinciaInput(provincia);
    setTelefonoInput(telefono);
  };

  return (
    <div className="border-2 border-white/10 rounded px-4 py-2 md:col-span-1">
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center">
          <label className="font-medium">Nombre:</label>
          {esEditable ? (
            <input
              type="text"
              className="font-medium px-2 border-b text-sm focus:border-none"
              value={nombreInput}
              onChange={({ target }) => setNombreInput(target.value)}
            />
          ) : (
            <p className="font-medium px-2 text-sm">{nombre}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="font-medium">Apellido:</label>
          {esEditable ? (
            <input
              type="text"
              className="font-medium px-2 border-b text-sm focus:border-none"
              value={apellidoInput}
              onChange={({ target }) => setApellidoInput(target.value)}
            />
          ) : (
            <p className="font-medium px-2 text-sm">{apellido}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="font-medium">Provincia:</label>
          {esEditable ? (
            <input
              type="text"
              className="font-medium px-2 border-b text-sm focus:border-none"
              value={provinciaInput}
              onChange={({ target }) => setProvinciaInput(target.value)}
            />
          ) : (
            <p className="font-medium px-2 text-sm">{provincia}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="font-medium">Telefono:</label>
          {esEditable ? (
            <input
              type="number"
              className="font-medium px-2 border-b text-sm focus:border-none"
              value={telefonoInput}
              onChange={({ target }) => setTelefonoInput(Number(target.value))}
            />
          ) : (
            <p className="font-medium px-2 text-sm">{telefono}</p>
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
              onClick={() => borrarContacto(_id)}
            >
              Borrar
            </button>
          </div>
        )}
        {esEditable && (
          <div className="flex gap-2">
            <button
              className="px-4 py-1 rounded bg-green-500 text-white font-medium hover:bg-green-600"
              onClick={handleEditar}
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
