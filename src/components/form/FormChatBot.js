import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";

export default function Component() {
  const [formData, setFormData] = useState({
    pregunta: ""
  });

  const [Respuesta, setRespuesta] = useState(
    "¿Como te puedo ayudar hoy?"
  );

  const [Pregunta, setPregunta] = useState("");

  const [ErrorPregunta, setErrorPregunta] = useState("");

  const CargarForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const PostPregunta = async (e) => {
    e.preventDefault();

    // Verificar si el campo de pregunta está vacío
    if (!formData.pregunta.trim()) {
      setErrorPregunta("Debes preguntar algo");
      return; // No se envía el formulario
    }

    // Establece la pregunta en la variable de pregunta
    setPregunta(formData.pregunta);

    //extrae la respuesta
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Questions/PostPregunta",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // Maneja la respuesta
      console.log(response.data.answer);
      setRespuesta(response.data.answer);

      // Limpiar formData
      setFormData({ pregunta: "" });

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

    //inserta la pregunta
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/CreateQuestions/PostPregunta",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // Maneja la respuesta
      if(response.data === true){
        setFormData({ pregunta: "" });
      }

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

  };

  return (
    <MDBCard className="mx-auto mt-5" style={{ maxWidth: "40rem" }}>
      <MDBCardBody>
        <div className="grid gap-4">
          <h1 className="text-xl font-semibold text-center">Loki</h1>
          <div className="rounded-xl bg-gray-100 p-4 text-sm">
            <p className="text-gray-500">Ahora estás hablando con Loki</p>
          </div>
          <div className="rounded-xl bg-gray-100 p-4 text-sm self-end">
            <p className="text-gray-500">Tu: {Pregunta}</p>
            <p className="text-gray-500">Loki:{Respuesta}</p>
          </div>
          <form onSubmit={PostPregunta} className="flex gap-2">

            <div className="mb-3">
              <MDBInput
                className="flex-1"
                type="text"
                label="Pregúntame..."
                name="pregunta"
                value={formData.pregunta}
                onChange={CargarForm}
              />
              <small className="text-danger">{ErrorPregunta}</small>
            </div>

            <MDBBtn type="submit" className="btn-sm btn-dark">Enviar</MDBBtn>
          </form>

        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
