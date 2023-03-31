import React from 'react';
import { Box } from '@mui/material';
import { Claim } from '../../../types';
import ClaimCardAdmin from '../ClaimCardAdmin';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  claims: Partial<Claim>[];
};

const ClaimListAdmin = ({ claims }: Props) => {
  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <Droppable droppableId={uuidv4()}>
        {(provided: DroppableProvided) => (
          <Box
            component="ul"
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   justifyContent: 'space-around',
            // }}
          >
            {claims.map((claim, index) => (
              <Draggable key={claim.id} draggableId={'claim.id'} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <ClaimCardAdmin
                      claim={claim}
                      sx={{ mt: '0.8rem' }}
                      // key={claim.id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
    // <Box component="ul">
    //   {claims.map((claim) => (
    //     <ClaimCardAdmin claim={claim} sx={{ mt: '0.8rem' }} key={claim.id} />
    //   ))}
    // </Box>
  );
};

export default ClaimListAdmin;
