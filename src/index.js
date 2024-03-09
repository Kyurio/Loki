import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client

// estilos
import CssBaseline from '@mui/material/CssBaseline';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/css/style.css';

// componentes
import FormChat from './components/form/FormChatBot';
import Sidebar from './components/navbar/sidebar'
import TablePreguntas from './components/table/TableChatBot'

// app
const root = createRoot(document.getElementById('root'));

root.render(
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        <Sidebar/>
      </div>
      <div className="col-md-9">
        <TablePreguntas/>
      </div>
    </div>
  </div>
);
