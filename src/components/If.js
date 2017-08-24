import React from 'react'

function IF (props) {
  return (
    <div>
      { props.what ? props.children : '' }
    </div>
  )
}

export default IF
