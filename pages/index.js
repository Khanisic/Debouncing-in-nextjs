import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import images from '../assets';
import players from '../assets/players.json';
import PlayerCard from '../components/PlayerCard';
import { useEffect, useState } from 'react';

export default function Home() {

  const [selected, setSelected] = useState('Recent')
  const [playerList, setPlayerList] = useState([])
  const [showCategory, setShowCategory] = useState(false)
  const [playerListCopy, setPlayerListCopy] = useState([]);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);


  useEffect(() => {
    setPlayerList(players);
    setPlayerListCopy(players);
  }, [])

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  const handleSearch = (value) => {
    const filteredNfts = players.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length) {
      setPlayerList(filteredNfts);
    } else {
      setPlayerList(playerListCopy);
    }
  };

  const clearSearch = () => {
    if (players.length && playerListCopy.length) {
      setPlayerList(playerListCopy);
    }
  };

  useEffect(() => {
    const sortedPlayers = [...players];

    switch (selected) {
      case 'Ratings (low to high)':
        setPlayerList(sortedPlayers.sort((a, b) => a.ratings - b.ratings));
        break;
      case 'Ratings (high to low)':
        setPlayerList(sortedPlayers.sort((a, b) => b.ratings - a.ratings));
        break;
      case 'Recent':
        setPlayerList(sortedPlayers.sort((a, b) => a.id - b.id));
        break;
      default:
        setPlayerList(players);
        break;
    }
  }, [selected]);

  console.log(playerList)

  return (
    <div className='backgoundGradient w-full h-full pb-96 py-3 px-12'>

      <div className=' flex gap-4 mt-4 '>
        <div className=' flex pl-6 bg-white rounded-twenty w-1/2'>
          <Image src={images.search} objectFit="contain" alt="search" className='' />
          <input onChange={(e) => { setDebouncedSearch(e.target.value); }}
            value={debouncedSearch} placeholder='Search here' className='inputField bg-white rounded-twenty px-6 text-pink'></input>
        </div>
        <div className='relative w-[300px] border flex justify-center bg-white items-center rounded-twenty cursor-pointer pr-3' onClick={() => { setShowCategory(!showCategory) }}>
          <p className='text-grey hover:text-dark-green  px-12 py-2'>{selected}</p>
          <Image src={images.down} objectFit="contain" alt="search" className='' />
          {
            showCategory &&
            <div className='bg-white absolute w-[300px] top-16 py-3 pl-3 flex flex-col rounded-fifteen z-20 left-0'>
              <p className='hover:bg-blue hover:text-pink w-[250px] px-2 rounded-md py-2' onClick={() => { setSelected('Ratings (low to high)') }}>Ratings (low to high)</p>
              <p className='hover:bg-blue hover:text-pink w-[250px] px-2 rounded-md py-2' onClick={() => { setSelected('Ratings (high to low)') }}>Ratings (high to low)</p>
              <p className='hover:bg-blue hover:text-pink w-[250px] px-2 rounded-md py-2' onClick={() => { setSelected('Recent') }}>Recent</p>
            </div>
          }
        </div>
      </div>


      <div className='flex flex-wrap gap-8 mt-10 justify-center'>
        {
          playerList.map((player, index) => {
            return (
              <PlayerCard player={player} key={index} image={images[`${player.name}`]}></PlayerCard>
            )
          })
        }
      </div>

    </div>
  )
}
