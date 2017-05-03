import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import styles from './Test.scss'

const Test = () => (
  <div>
    <h1 className={styles.header}>
      <FormattedMessage
        id={'Header.greeting'}
        defaultMessage={'Welcome!'}
      />
    </h1>
    <Link to='/'>Back</Link><br />
    <Link to='/nowhere'>Nowhere</Link>
  </div>
)

export default Test
