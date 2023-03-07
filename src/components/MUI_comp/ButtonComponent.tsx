import { Button, ButtonProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  customColor?: string;
  sx?: SxProps;

}

const ButtonComponent: React.FC<CustomButtonProps> = ({
  children,
  width,
  height,
  customColor,
  sx,
  ...rest
}) => {
  const buttonStyles: SxProps = {
    backgroundColor: customColor,
    height: height ? height : 'auto',
    width: width ? width : 'auto',
    '&:hover': {
      backgroundColor: customColor,
    },
    ...sx,
  };

  return (
    <Button sx={buttonStyles} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonComponent;