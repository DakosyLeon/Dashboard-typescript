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
    info: 'Weiterführende Dakosy Informationen zum ausgewählten Schiff'
  },
  {
    id: 21424,
    name: 'Aeneas',
    land: 'Saudi Arabien',
    size: 405,
    info: 'Dakosy Info'
  },
  {
    id: 36343,
    name: 'A.P. Moeller',
    land: 'Deutschland',
    size: 485,
    info: 'Dakosy Info'
  },
  {
    id: 28766,
    name: 'Admiral Santosh',
    land: 'England',
    size: 210,
    info: 'Weiterführende Dakosy Informationen zum ausgewählten Schiff'
  }
];

function Dashboard() {
  const [ships, setShips] = React.useState(initalShips);
  const [showInfoPopup, setShowInfoPopup] = React.useState(false);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);

  const onOpenDeletePopup = (id: number) => {
    setShowDeletePopup(true);
  };

  const onOpenInfoPopup = (id: number) => {
    setShowInfoPopup(true);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="Ship-Info-Tabelle">
        {showInfoPopup && <Popup text={''} onClose={undefined} headline={''} />}

        <header>
          <h2>Info Details</h2>
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
              <DashboardRow key={i.id} ship={i} onOpenInfoPopup={onOpenInfoPopup} onOpenDeletePopup={onOpenDeletePopup} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
