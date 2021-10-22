import React from 'react';
import stl from '../../styles/ProfileArea.module.scss';

interface Props {
    label: string;
}

const UserStat: React.FC<Props> = ({label, children}) => {

    return (
        <div className={stl.statContainer}>
            <b>{children}</b>
            <span className={stl.label}>{label}</span>
        </div>
    );
}

export default UserStat;