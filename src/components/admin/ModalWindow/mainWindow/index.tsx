import React, { useState } from 'react';
import { selectCompanyData } from '../../../../RTK/companySlice';
import { useSelector } from 'react-redux';
import Frame from '../Frame.tsx/Frame';
import Closebutton from '../../../SVG/Closebutton';
import UserCard from '../UserCard';
import { useClaimContext } from '../../../../custom/ClaimIdContext';
// import { MotionUserCard } from '../UserCard';
import LabelCard from '../LabelCard';
import styles from './mainWindow.module.scss';
import { Claim } from '../../../../types';
import ClaimChat from '../../../ClaimChat';
import sampleClaimDetail from '../../../../temp/sampleClaimDetail';
import './windowStyles.scss';
import ButtonComponent from '../../../MUI_comp/ButtonComponent';
import AddIcon from '@mui/icons-material/Add';

import { motion, useCycle } from 'framer-motion';

type Props = {
  claim: Partial<Claim>;
};

function MainWindow({ claim }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { companyData } = useSelector(selectCompanyData);
  const { claimId, setClaimId } = useClaimContext();

  const closeModalWindow = () => {
    setClaimId(null);
  };
  console.log('claim:', claim);

  return (
    <div className="super">
      <div className="side left">
        <div className="claim_id">
          <h1
            style={{ color: companyData.themeColors.primary }}
            className="title"
          >
            Description
          </h1>
          <p style={{ color: companyData.themeColors.primary }}>
            ID: {claim.id}
          </p>
        </div>
        <div className="claim_description">
          <div className="desc">
            {claim.message}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, earum
            animi! Ab illo, autem praesentium modi eius dicta ut ea culpa
            recusandae commodi deleniti fugit tempore corrupti. In, ipsum optio!
            Lorem ipsum dolor sit consectetur adipisicing elit. Aut nisi
            possimus incidunt commodi dignissimos animi eaque ullam quos placeat
            veritatis alias inventore unde asperiores aperiam, fugit corporis
            reprehenderit error laboriosam. Lorem ipsum dolor sit consectetur
            adipisicing elit. Aut nisi possimus incidunt commodi dignissimos
            animi eaque ullam quos placeat veritatis alias inventore unde
            asperiores aperiam, fugit corporis reprehenderit error laboriosam.
          </div>
        </div>
        <div className="extras">
          {/* <div className='extra extra_left'>
            <p className='titles_extras' style={{color: companyData.themeColors.primary, fontWeight: 'bolder'}}>Labels</p>
            {claim.labels?.map((label, i) => {
                 const prio: any = claim.labels
                 console.log(claim.labels);   
                 return (
                   <div className='claim_labels'>
                     <div className={`circle ${prio[0]}`}></div>
                     <div className='msg'>{prio[1]}</div>
                   </div> 
                 );
               })}
          </div> */}
          <div className="extra extra_rigth">
            <p
              className="titles_extras"
              style={{
                color: companyData.themeColors.primary,
                fontWeight: 'bolder',
              }}
            >
              Members
            </p>
            <div className="members">
              {claim.members?.map((member, i) => {
                return (
                  <>
                    <div className="cards">
                      <UserCard
                        name={member.userId}
                        width={100}
                        height={40}
                        url={member.avatarUrl}
                      ></UserCard>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="side chat_c">
        <motion.div
          whileTap={isOpen ? {} : { scale: 0.9 }}
          className="more_info"
        >
          <ButtonComponent
            customColor={`${companyData.themeColors.primary}`}
            textColor="white"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <AddIcon />
          </ButtonComponent>
          <div
            className="mobile_extras"
            style={{
              display: isOpen ? 'flex' : 'none',
            }}
          >
            <div className="claim_id">
              <h1
                style={{ color: companyData.themeColors.primary }}
                className="title"
              >
                Description
              </h1>
              <p style={{ color: companyData.themeColors.primary }}>
                ID: {claim.id}
              </p>
            </div>
            <div className="claim_description">
              <div className="desc">{claim.message}</div>
            </div>
            <div className="extra extra_rigth" style={{ marginTop: '10px' }}>
              <p
                className="titles_extras"
                style={{
                  color: companyData.themeColors.primary,
                  fontWeight: 'bolder',
                }}
              >
                Members
              </p>
              <div className="members">
                {claim.members?.map((member, i) => {
                  return (
                    <>
                      <div className="cards">
                        <UserCard
                          name={member.userId}
                          width={100}
                          height={40}
                          url={member.avatarUrl}
                        ></UserCard>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="chat">
          <ClaimChat chatData={sampleClaimDetail.chats} />
        </div>
      </div>
    </div>
  );
}

export default MainWindow;
