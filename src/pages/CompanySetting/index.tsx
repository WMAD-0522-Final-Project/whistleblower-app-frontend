import * as React from 'react';
import { Component } from 'react';
import CustomBox from '../../components/CustomBox/CustomBox';
import Settings from '../../components/MUI_comp/Settings';
import TextFieldCustom from '../../components/MUI_comp/TextFieldCustom';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../RTK/companySlice';
import FileInput from '../../components/FileInput';
import InputLabel from '../../components/InputLabel';
function CompanySetting() {
  const { companyData } = useSelector(selectCompanyData);
  return (
    <>
      <CustomBox
        sx={{
          width: '100vw',
          height: '80vh',
          display: 'flex',
          overflow: 'scroll',
        }}
      >
        <div>CompanySetting</div>

        <TextFieldCustom
          label=""
          error={false}
          width="80%"
          value={';lkj'}
          mainColor={companyData.themeColors.secondary}
          textColor="black"
          required
        />
        <InputLabel
          placeholder={''}
          label={'company name'}
          topLabel={''}
          value={'iwatani'}
        ></InputLabel>
        <FileInput name="file" sx={{ mt: '1rem' }} />

        <div style={{}}>
          <Settings></Settings>
        </div>
      </CustomBox>
    </>
  );
}

export default CompanySetting;
