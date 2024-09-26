import { Card } from '@prisma/client'
import React from 'react'

const DetailsComponent = ({data}:{data:Card}) => {
  return (
    <div>
        {data.amount}
    </div>
  )
}

export default DetailsComponent