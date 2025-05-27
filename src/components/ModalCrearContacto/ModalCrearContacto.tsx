import { useState } from "react";
import type { ArgumentoContacto } from "../../types";

type Prop = {
  onClose: () => void;
  crearContacto: (data: ArgumentoContacto) => void;
};
const ModalCrearContacto: React.FC<Prop> = ({ onClose, crearContacto }) => {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");
  const [telefono, setTelefono] = useState<number>(0);

  const handleCrearContacto = (e: any) => {
    e.preventDefault();
    crearContacto({
      nombre,
      apellido,
      provincia,
      telefono,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[50vh] w-full max-w-md flex-col overflow-hidden rounded border border-white/10 bg-[#141414] shadow-lg">
        <form
          className="items-center h-full mt-4 mx-10 flex flex-col gap-2"
          onSubmit={handleCrearContacto}
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Nombre:</label>
            <input
              className="font-medium py-3 px-4 block w-full border rounded-sm text-sm"
              type="text"
              placeholder="Marcos"
              onChange={({ target }) => setNombre(target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Apellido:</label>
            <input
              className="font-medium py-3 px-4 block w-full border rounded-sm text-sm"
              type="text"
              placeholder="Arias"
              onChange={({ target }) => setApellido(target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Provincia:</label>
            <input
              className="font-medium py-3 px-4 block w-full border rounded-sm text-sm"
              type="text"
              placeholder="Tucuman"
              onChange={({ target }) => setProvincia(target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Telefono:</label>
            <input
              className="font-medium py-3 px-4 block w-full border rounded-sm text-sm"
              type="text"
              placeholder="3813534617"
              onChange={({ target }) => setTelefono(Number(target.value))}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-4 mt-4 w-full"
          >
            Crear Contacto
          </button>
          <div className="flex justify-end" onClick={onClose}>
            <button className="bg-red-500 px-4 py-1 mt-2 rounded">
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearContacto;
