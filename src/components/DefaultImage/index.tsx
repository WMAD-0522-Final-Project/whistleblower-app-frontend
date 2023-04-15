import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

type Props = {
  firstName: string;
  lastName: string;
};

function DefaultImage({ firstName, lastName }: Props) {
  return (
    <>
      <Avatar
        alt={`${firstName} ${lastName}`}
        sx={{ bgcolor: deepOrange[500] }}
      >{`${firstName} ${lastName}`}</Avatar>
    </>
  );
}

export default DefaultImage;
