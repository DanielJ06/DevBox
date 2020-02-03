import React, { useEffect, useState } from 'react';

import api from '../../services/api'
import './styles.css';

import { MdMoveToInbox } from 'react-icons/md'

export default function Boxes() {
  const [boxes, setBoxes] = useState([])

  useEffect(() => {
      async function loadBoxes(){
          const res = await api.get('boxes')

          setBoxes(res.data)
      }

      loadBoxes()
  }, [])

  return (
      <div id="box-container">
        <h3><a href="/">Adicionar box</a></h3>
        <ul>
            {
              boxes.map(box => (
                  <li key={box._id}>
                    <strong>{box.title}</strong>
                    <a href={`box/${box._id}/files`}>
                      <MdMoveToInbox size={32} color="#333" />
                    </a>
                  </li>
              ))
            }
        </ul>
      </div>
  );
}
