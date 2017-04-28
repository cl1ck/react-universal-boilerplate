import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Test.scss'

const Test = () => (
  <div>
    <h1 className={styles.header}>Test</h1>
    <Link to='/'>Back</Link><br />
    <Link to='/nowhere'>Nowhere</Link>
  </div>
)

export default Test
