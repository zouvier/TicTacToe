
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import '../styles/Home.module.css';

const Home = () => {
  const [data, setData] = useState({ user: 'X' });

  return (
    <div className="h-[26.813rem] text-[#A8BFC9] grid place-content-center text-center max-w-[20.438rem] ">
      <Image className="text-center m-auto" src="./logo.svg" width={72} height={32} alt="logo" />
      <div className="bg-[#1F3641] mt-8 w-[18rem] rounded-xl shadow-[inset_0px_-8px_0px_#10212A;]">

        <h1 className="uppercase  font-xl py-4 font-black">Pick Player 1`s mark</h1>

        <div className="grid place-content-center gap-2 px-2 grid-cols-2 grid-rows-1 bg-[#1A2A33] w-[80%] rounded-xl h-[4.5rem] m-auto">

          <div id="Xbox" className="w-[100%] grid place-content-center m-auto h-[70%] rounded-xl">
            <input tabIndex={0} type="radio" id="X" name="user" value="X" onClick={(event) => setData({ user: event.target.value })} className="opacity-0 absolute peer/x" />
            <label className=" m-auto w-[100%]" htmlFor="X"><Image src="./icon-x-outline.svg" className="mx-8" width={32} height={32} alt="X" /></label>
          </div>

          <div id="Obox" className="w-[100%] grid place-content-center m-auto h-[70%] rounded-xl">
            <input tabIndex={0} type="radio" id="O" name="user" value="O" onClick={(event) => setData({ user: event.target.value })} className="opacity-0 absolute peer/o" />
            <label className="m-auto w-[100%]" htmlFor="O"><Image src="./icon-o-outline.svg" className="mx-8" width={32} height={32} alt="O" /></label>
          </div>
        </div>

        <h2 className="uppercase my-4">Remeber: X goes first</h2>

      </div>

      <div className="flex flex-col gap-4 pt-4 text-[#1A2A33]">
        <Link tabindex="-1" id="mbl" href={{ pathname: './cpugame', query: data }}> <button type="button" id="makeButton" className="uppercase bg-[#F2B137] w-[100%] py-4 font-black rounded-xl shadow-[inset_0px_-8px_0px_#CC8B13]">new game (vs cpu) </button> </Link>
        <Link tabindex="-1" href={{ pathname: './pvpgame', query: data }}> <button type="button" id="makeButton2" className="uppercase bg-[#31C3BD] w-[100%] py-4 font-black rounded-xl shadow-[inset_0px_-8px_0px_#118c87]">new game (vs player) </button> </Link>
      </div>
    </div>
  );
};

export default Home;
