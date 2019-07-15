import React from 'react';
import { ShipDTO } from './dto/ship.dto';

interface Props {
  ship: ShipDTO;
  onOpenInfoPopup: (id: number) => void;
  onOpenDeletePopup: (id: number) => void;
}

function DashboardRow(props: Props) {
  //destruktorierung
  const { id, name, land, size } = props.ship;
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{land}</td>
      <td>{size}</td>
      <td>
        <button onClick={() => props.onOpenInfoPopup(id)}>Info</button>
        <button onClick={() => props.onOpenDeletePopup(id)}>Delete</button>
        <button>EDIT</button>
      </td>
    </tr>
  );
}

export default DashboardRow;
