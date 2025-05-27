import { useEffect, useState } from "react";
import { ModalCrearContacto } from "./components/ModalCrearContacto";
import axios from "axios";
import { ContactoCard } from "./components/ContactoCard";
import type { Contacto } from "./types";
import "./App.css";

const App = () => {
  const [contactos, setContactos] = useState<Contacto[]>([]);

  const obtenerContactos = async () => {
    const contactosResponse = await axios.get(
      "http://localhost:8000/contactos"
    );
    setContactos(contactosResponse.data.contactos);
  };

  useEffect(() => {
    obtenerContactos();
  }, []);

  return (
    <div className="h-dvh flex flex-col items-center gap-20 container mx-auto text-gray-200">
      <div className="flex flex-col mt-10 gap-5">
        <h1 className="text-2xl font-medium">Agenda de Contactos</h1>
        <button className="border-2 border-gray-400 rounded p-2 text-center font-medium">
          Crear Contacto
        </button>
        <ModalCrearContacto />
      </div>
      <div className="grid grid-cols-4 w-full gap-4 ">
        {!contactos.length && (
          <div className="flex justify-center items-center col-span-12 font-bold">
            No hay tareas actualmente
          </div>
        )}
        {contactos.map((contacto) => (
          <ContactoCard {...contacto} />
        ))}
      </div>
    </div>
  );
};

export default App;
