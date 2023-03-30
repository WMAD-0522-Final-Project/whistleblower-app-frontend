import * as React from 'react';
import { Component } from 'react';
import { Claim } from '../../../../types';
import MainWindow from '../mainWindow';
type Props = {
  claim: Partial<Claim>;
};
function ModalWindow({ claim }: Props) {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '150%' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'black',
            opacity: '0.7',
            zIndex: '10',
            position: 'absolute',
            top: '-10%',
          }}
        ></div>
        <div
          style={{
            width: '100vw',
            height: '100vh',

            position: 'absolute',
            // top: '-20vh',
            zIndex: '10',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MainWindow claim={claim}></MainWindow>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;
