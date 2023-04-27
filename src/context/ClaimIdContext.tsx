// type ClaimIdContextType = {
//   context: ContextType;
//   setContext: (c: ContextType) => void;
// };
// export const CreateContext = createContext<ClaimIdContextType>({
//   context: { claimsId: '', userId: '', yellowRotate: 0 },
//   setContext: () => {},
// });

// export const useAllContext = () => useContext(CreateContext);

import * as React from 'react';
import { Component, useState } from 'react';
import { createContext, useContext } from 'react';
import { ContextType } from '../types';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

type ClaimIdContextType = {
  context: ContextType;
  setContext: (c: ContextType) => {};
};
const CreateContext = createContext<ClaimIdContextType>({
  context: {
    claimsId: '',
    GeneralUserId: '',
    AdminUserIdAdmin: '',
    yellowRotate: 0,
  },
  // setContext: (c) => {},
  setContext: (c) => {},
});

export const useAllContext = () => useContext(CreateContext);

const AllContextProvider = ({ children }: { children: ReactJSXElement }) => {
  const [context, setContext] = useState<ContextType>({
    claimsId: '',
    GeneralUserId: '',
    AdminUserIdAdmin: '',
    yellowRotate: 0,
  });

  return (
    <>
      <CreateContext.Provider value={{ context, setContext }}>
        {children}
      </CreateContext.Provider>
    </>
  );
};

export default AllContextProvider;
