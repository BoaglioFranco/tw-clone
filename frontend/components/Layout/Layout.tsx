import stl from '../../styles/Layout.module.scss'
import Header from './Header';

interface Props {}

const Layout: React.FC<Props> = ({children}) => {

    return (
        <div className={stl.container}>
            <Header/>
            <main className={stl.content}>
                {children}
            </main>
            <footer className={stl.footer}>

            </footer>
        </div>
    );
}

export default Layout;