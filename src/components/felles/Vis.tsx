import React, { ReactNode, FC } from 'react';

interface VisProps {
  hvis: boolean;
}

const Vis: FC<VisProps> = (props: { hvis: boolean; children: ReactNode }) => {
  return !props.hvis ? (null as any) : props.children;
};

export default Vis;
