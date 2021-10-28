import stl from '../../styles/Layout.module.scss'
import Footer from './Footer';
import Header from './Header';

interface Props {}

const Layout: React.FC<Props> = ({children}) => {

    return (
        <div className={stl.container}>
            <Header/>
            <main className={stl.content}>
                {children}
            </main>
            <Footer/>   
        </div>
    );
}

export default Layout;