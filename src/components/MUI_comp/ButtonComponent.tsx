import { Button, ButtonProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  customColor?: string;
  textColor?: string;
  sx?: SxProps;
}

const ButtonComponent = ({
  children,
  width,
  height,
  customColor,
  textColor,
  sx,
  ...rest
}: CustomButtonProps) => {
  const buttonStyles: SxProps = {
    boxShadow: 'none',
    color: textColor ? textColor : 'auto',
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
