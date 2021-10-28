import React from 'react';
import stl from '../../styles/Footer.module.scss'

interface Props {}

const Footer: React.FC<Props> = (props) => {

    return (
        <div className={stl.footer}>
            <i className={`bi bi-search ${stl.btn}`}></i>
        </div>
    );
}

export default Footer;