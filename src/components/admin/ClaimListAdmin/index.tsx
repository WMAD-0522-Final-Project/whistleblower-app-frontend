import React from 'react';
import { Box } from '@mui/material';
import { Claim } from '../../../types';
import ClaimCardAdmin from '../ClaimCardAdmin';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4, v4 } from 'uuid';

type Props = {
  claims: Partial<Claim>[];
};

const ClaimListAdmin = ({ claims }: Props) => {
  return (
    <Box
      component="ul"
      // sx={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   justifyContent: 'space-around',
      // }}
    >
      {claims.map((claim, index) => (
        <Draggable draggableId={`${claim.id}`} index={index} key={claim.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <ClaimCardAdmin
                claim={claim}
                sx={{ mt: '0.8rem' }}
                key={claim.id}
              />
            </div>
          )}
        </Draggable>
      ))}
    </Box>

    // <Box component="ul">
    //   {claims.map((claim) => (
    //     <ClaimCardAdmin claim={claim} sx={{ mt: '0.8rem' }} key={claim.id} />
    //   ))}
    // </Box>
  );
};

export default ClaimListAdmin;
