import React, { FormEventHandler } from 'react';
import { Box } from '@mui/material';
import CustomBox from '../../CustomBox/CustomBox';
import SectionTitle from '../../SectionTitle';
import TextareaLabel from '../../TextareaLabel';
import { selectCompanyData } from '../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import SelectBoxLabel from '../../SelectBoxLabel';
import FileInput from '../../FileInput';
import CheckboxLabel from '../../CheckboxLabel';
import ButtonComponent from '../../MUI_comp/ButtonComponent';

type Props = {};

const ClaimForm = (props: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.category.value);
    // console.log(e.target.message.value);
    // console.log(e.target.file.files[0]);
    // console.log(e.target.isAnonymous.checked);
  };

  return (
    <Box>
      <SectionTitle title="MAKE CLAIM" />
      <CustomBox>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '88%',
            flexDirection: 'column',
          }}
        >
          <SelectBoxLabel
            placeholder="Choose category"
            label="Category"
            name="category"
            color={companyData.themeColors.primary}
            selectBoxSx={{
              '& .MuiSelect-select': {
                padding: '1rem',
              },
            }}
            sx={{ width: '100%' }}
          />
          <TextareaLabel
            placeholder="Enter message"
            label="Message"
            topLabel=""
            name="message"
            sx={{
              mt: '1rem',
              width: '100%',
            }}
          />
          <FileInput name="file" sx={{ mt: '1rem' }} />
          <CheckboxLabel
            label="send anonymously"
            name="isAnonymous"
            boxColor={companyData.themeColors.primary}
            boxSize="1.4rem"
            labelFontSize="0.8rem"
            boxStyle={{ padding: '0.2rem' }}
            sx={{ mt: '1rem' }}
          />
          <ButtonComponent
            customColor={companyData.themeColors.primary}
            type="submit"
            sx={{
              mt: '1rem',
              p: '0.8rem 0',
              color: companyData.themeColors.secondary,
              fontWeight: '600',
              width: '100%',
            }}
          >
            Submit
          </ButtonComponent>
        </Box>
      </CustomBox>
    </Box>
  );
};

export default ClaimForm;
