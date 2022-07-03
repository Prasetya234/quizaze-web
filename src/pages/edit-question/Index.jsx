import React from 'react'
import { useParams } from 'react-router-dom'
import './index.scss'

export default function Index() {
    const { id } = useParams()
    return (
        <div>Edit page {id}</div>
    )
}
