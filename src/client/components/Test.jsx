import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import { ONLINE, OFFLINE, offlineSelector } from 'client/offline/offline'
import styles from './Test.scss'

export const Test = ({status}) => {
  let message
  if (status === ONLINE) {
    message = <FormattedMessage id={'Online'} defaultMessage={'Online'} />
  } else if (status === OFFLINE) {
    message = <FormattedMessage id={'Offline'} defaultMessage={'Offline'} />
  } else {
    message = <FormattedMessage id={'Error'} defaultMessage={'Error'} />
  }
  return (
    <div>
      <h1 className={styles.header}>
        {message}
      </h1>
      <Link to='/'>Back</Link><br />
      <Link to='/nowhere'>Nowhere</Link>
    </div>
  )
}

export default connect(offlineSelector)(Test)
