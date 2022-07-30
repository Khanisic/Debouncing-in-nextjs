import React from 'react'
import Image from 'next/image'
import images from '../assets'
function PlayerCard({ player, image }) {
    return (
        <div className='blurBackground flex flex-col items-center rounded-fifteen z-2 p-3 bg-white'>
            <Image src={image} alt="player" width={173} height={236}  className="rounded-fifteen"/>
            <p className='font-semibold text-blue my-2'>{player.name}</p>
            <p className='text-pink font-semibold'>{player.ratings} <span className='text-blue font-semibold'>/100</span> </p>
        </div>
    )
}

export default PlayerCard