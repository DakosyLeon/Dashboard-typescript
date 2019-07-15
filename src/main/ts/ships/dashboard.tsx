import React from 'react';
import { ShipDTO } from './dto/ship.dto';
import DashboardRow from './dashboardRow';
import Popup from './popup';

const initalShips: ShipDTO[] = [
  {
    id: 11232,
    name: 'Adrian Maersk',
    land: 'Deutschland',
    size: 324,
    info: 'Dakosy Data about the Adrian Maersk which is not shown in initial table'
  },
  {
    id: 21424,
    name: 'Aeneas',
    land: 'Saudi Arabien',
    size: 405,
    info: 'Dakosy Data about the Aeneas which is not shown in initial table'
  },
  {
    id: 36343,
    name: 'A.P. Moeller',
    land: 'Deutschland',
    size: 485,
    info: 'Dakosy Data about the A.P. Moeller which is not shown in initial table'
  },
  {
    id: 28766,
    name: 'Admiral Santosh',
    land: 'England',
    size: 210,
    info: 'Dakosy Data about the Admiral Santosh which is not shown in initial table'
  }
];

function Dashboard() {
  const [ships, setShips] = React.useState<ShipDTO[]>(initalShips);
  const [currentShip, setCurrentShip] = React.useState<ShipDTO>(undefined);
  const [showInfoPopup, setShowInfoPopup] = React.useState(false);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const [showEditPopup, setShowEditPopup] = React.useState(false);

  //****** Info ******
  const onOpenInfoPopup = (id: number) => {
    setShowInfoPopup(true);
    const ship = ships.filter(s => s.id === id)[0];
    setCurrentShip(ship);
  };

  const onCloseInfoPopup = () => {
    setShowInfoPopup(false);
  };

  //****** DELETE ******
  const onOpenDeletePopup = (id: number) => {
    setShowDeletePopup(true);
    const ship = ships.filter(s => s.id === id)[0];
    setCurrentShip(ship);
  };

  const onDeleteRow = (id: number) => {
    const updatedShips = ships.filter(s => s.id !== id);
    setShips(updatedShips);
    setShowDeletePopup(false);
  };

  const onCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };

  //****** EDIT ******
  const onOpenEditPopup = (id: number) => {
    setShowEditPopup(true);
    const ship = ships.filter(s => s.id === id)[0];
    setCurrentShip(ship);
  };

  const onEditRow = () => {
    // Neue Werte aus Feldern den Variablen zuweisen

    setShowEditPopup(false);
  };

  const onCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="Ship-Info-Tabelle">
      {showInfoPopup && (
        <Popup //
          text={`Folgenden Informationen editieren: ${currentShip.info} `}
          onClose={onCloseInfoPopup}
          headline={`More Info about: ${currentShip.name}`}
        />
      )}
      {showDeletePopup && (
        <Popup //
          text={'Bist du sicher?'}
          onClose={onCloseDeletePopup}
          headline={`Delete Ship: ${currentShip.name}`}
          onDelete={() => onDeleteRow(currentShip.id)}
        />
      )}
      {showEditPopup && (
        <Popup //
          text={'Edit the entries and save your changes'}
          headline={`Editing Ship: ${currentShip.name}`}
          onClose={onCloseEditPopup}
          onEdit={onEditRow}
          tfInputName={currentShip.name}
          tfInputLand={currentShip.land}
          tfInputSize={currentShip.size}
        />
      )}
      <header>
        <h1>Dashboard</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Land</th>
            <th>Größe</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {ships.map(i => (
            <DashboardRow key={i.id} ship={i} onOpenInfoPopup={onOpenInfoPopup} onOpenDeletePopup={onOpenDeletePopup} onOpenEditPopup={onOpenEditPopup} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
