import React from 'react';
import { Box } from '@mui/material';
import { Claim, ClaimDetail } from '../../../types';
import ClaimCardAdmin from '../ClaimCardAdmin';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4, v4 } from 'uuid';

type Props = {
  claims: Claim[];
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
        <Draggable draggableId={`${claim._id}`} index={index} key={claim._id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <ClaimCardAdmin
                whileHover={{ x: 10 }}
                claim={claim}
                sx={{ mt: '0.8rem' }}
                key={claim._id}
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
