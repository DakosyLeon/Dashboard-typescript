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
    info: 'Dakosy Additional Info Data'
  },
  {
    id: 21424,
    name: 'Aeneas',
    land: 'Saudi Arabien',
    size: 405,
    info: 'Dakosy Additional Info Data'
  },
  {
    id: 36343,
    name: 'A.P. Moeller',
    land: 'Deutschland',
    size: 485,
    info: 'Dakosy Additional Info Data'
  },
  {
    id: 28766,
    name: 'Admiral Santosh',
    land: 'England',
    size: 210,
    info: 'Dakosy Additional Info Data'
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
    // Felder editierbar machen

    setShowEditPopup(false);
  };

  const onCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="Ship-Info-Tabelle">
      {showInfoPopup && (
        <Popup //
          text={"Here you'll find additional information."}
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
          text={`Folgenden Informationen editieren: ${currentShip.info} `}
          headline={`Editing Ship: ${currentShip.name}`}
          onClose={onCloseEditPopup}
          onEdit={onEditRow}
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

/*
interface Props {
  ship: ShipDTO;
}

function Dashboard(props: Props)

const { id, name, info } = props.ship;
*/
