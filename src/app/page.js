import styles from './page.module.css';

import DragBoard from '@/components/DragBoard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Board() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <DragBoard />
      <Footer />
    </div>
  )
}

export default Board
