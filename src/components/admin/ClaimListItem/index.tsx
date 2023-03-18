import React from 'react';
import { Badge, Box, SxProps, Typography } from '@mui/material';
import { Claim } from '../../../types';
import { useSelector } from 'react-redux';
import { selectCompanyData } from '../../../RTK/companySlice';

type Props = {
  claim: Partial<Claim>;
  sx?: SxProps;
};

const ClaimListItem = ({ claim, sx }: Props) => {
  const { companyData } = useSelector(selectCompanyData);

  const handleClaimClick = () => {
    // open detail window using a state variable
  };

  return (
    <Box
      component="li"
      onClick={handleClaimClick}
      sx={{
        backgroundColor: companyData.themeColors.primary,
        borderRadius: '2rem',
        boxShadow: '1px 3px 2px 1px rgba(0,0,0,0.2)',
        color: companyData.themeColors.secondary,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '66px',
        padding: '0.5rem 0.5rem 0.5rem 1rem',
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: '85%',
        }}
      >
        <Typography fontSize="0.7rem">{claim.submissionDate}</Typography>
        <Typography
          fontSize="0.9rem"
          sx={{
            width: '90%',
            overflow: 'hidden',
            pt: '0.2rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {claim.message}
        </Typography>
      </Box>
      {claim.members?.length &&
        // Show badge with number
        (claim.members!.length > 3 ? (
          <>
            <Box
              component="img"
              src={claim.members[0].avatarUrl}
              alt=""
              sx={{
                borderRadius: '50%',
                display: 'block',
                pl: '0.2rem',
                width: '16%',
                minWidth: '40px',
                maxWidth: '46px',
                height: '100%',
              }}
            />
            <Badge
              badgeContent={`+${claim.members.length - 1}`}
              color="error"
              sx={{
                mt: '5%',
                position: 'absolute',
                bottom: '15px',
                right: '15px',
              }}
            />
          </>
        ) : (
          // Show all avatars
          claim.members.map((member, index) => (
            <Box
              component="img"
              src={member.avatarUrl}
              alt={`${index}`}
              sx={{
                borderRadius: '50%',
                display: 'block',
                pl: '0.2rem',
                width: '16%',
                minWidth: claim.members!.length === 1 ? '40px' : '30px',
                maxWidth: claim.members!.length === 1 ? '46px' : '38px',
                height: '100%',
                position: 'relative',
                zIndex: index,
                ':not(:last-of-type)': {
                  translate: `${
                    (10 * claim.members!.length) / (index + 1)
                  }px 0`,
                },
              }}
            />
          ))
        ))}
    </Box>
  );
};

export default ClaimListItem;
