import { useEffect, useState } from "react";
import { ModalCrearContacto } from "./components/ModalCrearContacto";
import axios from "axios";
import { ContactoCard } from "./components/ContactoCard";
import type { Contacto, ArgumentoContacto } from "./types";
import "./App.css";

const App = () => {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const obtenerContactos = async () => {
    const contactosResponse = await axios.get(
      "http://localhost:8000/contactos"
    );
    setContactos(contactosResponse.data.contactos);
  };

  const crearContacto = async (data: ArgumentoContacto) => {
    const contactosResponse = await axios.post(
      "http://localhost:8000/contactos/crear",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (contactosResponse.status === 200) {
      alert("Contacto creado");
      obtenerContactos();
    }
  };

  const editarContacto = async (id: string, data: ArgumentoContacto) => {
    const editarContactoResp = await axios.put(
      `http://localhost:8000/contactos/editar/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (editarContactoResp.status === 200) {
      alert(editarContactoResp.data.message);
      obtenerContactos();
    }
  };

  const borrarContacto = async (id: string) => {
    const contactoBorradoResp = await axios.delete(
      `http://localhost:8000/contactos/borrar/${id}`
    );
    console.log(contactoBorradoResp);
    if (contactoBorradoResp.status === 200) {
      alert(
        `Se borro el contacto: ${contactoBorradoResp.data.contactoBorrado.nombre} ${contactoBorradoResp.data.contactoBorrado.apellido}`
      );
      obtenerContactos();
    }
  };

  useEffect(() => {
    obtenerContactos();
  }, []);

  return (
    <div className="h-dvh flex flex-col items-center gap-20 container mx-auto text-gray-200">
      <div className="flex flex-col mt-10 gap-5">
        <h1 className="text-2xl font-medium">Agenda de Contactos</h1>
        <button
          className="border-2 border-gray-400 rounded p-2 text-center font-medium"
          onClick={() => setAbrirModal(true)}
        >
          Crear Contacto
        </button>
        {abrirModal && (
          <ModalCrearContacto
            onClose={() => setAbrirModal(false)}
            crearContacto={crearContacto}
          />
        )}
      </div>
      <div className="grid grid-cols-4 w-full gap-4 ">
        {!contactos.length && (
          <div className="flex justify-center items-center col-span-12 font-bold">
            No hay contactos actualmente
          </div>
        )}
        {contactos.map((contacto) => (
          <ContactoCard
            key={contacto._id}
            {...contacto}
            editarContacto={editarContacto}
            borrarContacto={borrarContacto}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
