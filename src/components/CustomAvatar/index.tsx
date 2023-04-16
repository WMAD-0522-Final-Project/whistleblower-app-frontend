import FileInput from '../FileInput';

type Props = {};

const CustomAvatar = (props: Props) => {
  return (
    <div>
      <FileInput name="avatar" text="Uploade Avatar Image" />
    </div>
  );
};

export default CustomAvatar;
