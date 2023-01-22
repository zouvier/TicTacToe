/* eslint-disable no-unused-expressions */
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Popup from 'reactjs-popup';
import Link from 'next/link';

const winningPositions = [
  { 0: 'X', 1: 'X', 2: 'X' }, { 0: 'O', 1: 'O', 2: 'O' },
  { 3: 'X', 4: 'X', 5: 'X' }, { 3: 'O', 4: 'O', 5: 'O' },
  { 6: 'X', 7: 'X', 8: 'X' }, { 6: 'O', 7: 'O', 8: 'O' },
  { 0: 'X', 3: 'X', 6: 'X' }, { 0: 'O', 3: 'O', 6: 'O' },
  { 1: 'X', 4: 'X', 7: 'X' }, { 1: 'O', 4: 'O', 7: 'O' },
  { 2: 'X', 5: 'X', 8: 'X' }, { 2: 'O', 5: 'O', 8: 'O' },
  { 0: 'X', 4: 'X', 8: 'X' }, { 0: 'O', 4: 'O', 8: 'O' },
  { 2: 'X', 4: 'X', 6: 'X' }, { 2: 'O', 4: 'O', 6: 'O' }];

const verifyWin = (board) => {
  for (let i = 0; i < winningPositions.length; i += 1) {
    const winning = Object.keys(winningPositions[i]);
    const values = Object.values(winningPositions[i]);
    let count = 0;
    if (board[winning[0]] === values[0]) {
      count += 1;
    }
    if (board[winning[1]] === values[1]) {
      count += 1;
    }
    if (board[winning[2]] === values[2]) {
      count += 1;
    }
    if (count === 3) {
      console.log('The winner is', values[0]);
      return values[0];
    }
  }
  console.log(board);
  return false;
};

const Game = () => {
  const router = useRouter();
  const { query } = router;
  const user = query[0];
  const mode = query[1];
  const [gameboard, setGameboard] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false });
  const [turn, setTurn] = useState({ playerturn: 'X' });
  const [iconimage, setIconimage] = useState({ playerimage: '../icon-x.svg' });
  const [choice, setChoice] = useState({ cpuChoice: '' });
  const [score, setScore] = useState({ X: 0, tie: 0, O: 0 });
  const firstUpdate = useRef(false);
  const [end, setEnd] = useState({ gameEnd: false, winner: '' });

  const checkPosition = (position, letter) => {
    if (!gameboard[position]) {
      setGameboard((state) => ({ ...state, [position]: letter }));
    }
  };

  const resetBoard = () => {
    setGameboard({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false });
  };

  const randomNum = (cpuTurn) => {
    const holder = Math.floor((Math.random() * 9));
    if (gameboard[holder] === false) {
      checkPosition(holder, cpuTurn);
    }
  };

  useEffect(() => {
    if (mode === 'cpu') {
      if (user === 'X' && !firstUpdate.current) {
        setChoice({ cpuChoice: 'O' });
      } else {
        setChoice({ cpuChoice: 'X' });
      }
      if (firstUpdate.current) {
        console.log('cpu loading');

        if (turn.playerturn === 'X' && choice.cpuChoice === 'X') {
          console.log('cpu chose X');
          setIconimage({ playerimage: '../icon-o.svg' });
          setTurn({ playerturn: 'O' });
          randomNum(choice.cpuChoice);
        } else if (turn.playerturn === 'O' && choice.cpuChoice === 'O') {
          console.log('cpu chose O');
          setIconimage({ playerimage: '../icon-x.svg' });
          setTurn({ playerturn: 'X' });
          randomNum(choice.cpuChoice);
        }
        console.log(gameboard);
      }
    }
    return () => {
    };
  }, [setTurn]);

  useEffect(() => {
    if (!firstUpdate.current) {
      firstUpdate.current = true;
      return;
    }
    const win = verifyWin(gameboard);
    if (win) {
      let count = score[win];
      count += 1;
      setScore((state) => ({ ...state, [win]: count }));
      setEnd({ gameEnd: true, winner: win });
      resetBoard();
      return;
    }
    for (let i = 0; i < 9; i += 1) {
      console.log(gameboard[0]);
      if (gameboard[i] === false) {
        break;
      }
      if (i === 8) {
        let count = score.tie;
        count += 1;
        setScore((state) => ({ ...state, tie: count }));
        setEnd({ gameEnd: true, winner: 'tie' });
        resetBoard();
        return;
      }
    }

    if (firstUpdate.current) {
      if (turn.playerturn === 'X') {
        setIconimage({ playerimage: '../icon-o.svg' });
        setTurn({ playerturn: 'O' });
        console.log(turn.playerturn);
      } else if (turn.playerturn === 'O') {
        setIconimage({ playerimage: '../icon-x.svg' });
        console.log(turn.playerturn);
        setTurn({ playerturn: 'X' });
      }
    }
    return () => {
    };
  }, [gameboard]);

  return (
    <div className=" relative grid p-5 max-w-[460px] w-screen">
      <Popup className="absolute" open={end.gameEnd} modal nested>
        <div className="w-screen h-screen grid items-center place-content-center bg-[#0000006e]">
          <div type="button" className="grid left-0 right-0 top-0 bottom-0 items-center place-content-center w-screen m-auto h-[226px] bg-[#1F3641]">
            {(end.winner === 'O' || end.winner === 'X') ? <div className=" place-items-center gap-4 row-start-1 flex"><Image src={`../icon-${end.winner}.svg`} width={64} height={64} alt="winner" />  <h2 className={end.winner === 'O' ? 'uppercase text-6xl text-[#F2B137]' : 'uppercase text-6xl text-[#31C3BD]'}>Takes the round</h2></div> : <h1 className="uppercase text-5xl text-[#A8BFC9] ">Round Tied</h1> }
            <div className=" row-start-2 text-center items-center place-content-center mt-10 flex gap-4">
              {console.log(end.winner)}
              <Link href="/"><button type="button" onClick={() => setEnd({ gameEnd: false, winner: '' })} className="w-[4.75rem] h-[3.25rem] bg-[#A8BFC9] rounded-xl shadow-[inset_0px_-4px_0px_#6B8997] "> Quit </button></Link>
              <button type="button" onClick={() => setEnd({ gameEnd: false, winner: '' })} className="w-[9.125rem] h-[3.25rem] bg-[#F2B137] rounded-xl shadow-[inset_0px_-4px_0px_#CC8B13]"> Next Round</button>
            </div>
          </div>
        </div>
      </Popup>
      <div className="flex justify-between ">
        <div className="m-auto">
          <Image src="../logo.svg" width={72} height={34} alt="logo" />
        </div>
        <div className="flex justify-around pb-1 w-[96px] h-[40px] text-center items-center place-content-center text-[#A8BFC9] bg-[#1F3641] shadow-[inset_0px_-4px_0px_#10212A] rounded-l">
          <Image src={iconimage.playerimage} width="24" height="24" alt="logo" />
          <h1 className="uppercase font-bold">Turn</h1>
        </div>
        <div className=" flex place-content-center items-center rounded-xl m-auto bg-[#A8BFC9] shadow-[inset_0px_-4px_0px_#6B8997] w-[40px] h-[40px]">
          <button type="button" onClick={() => { resetBoard(); }}> <Image src="../icon-restart.svg" width={16} height={16} alt="restart" /> </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-16 m-auto">
        <div type="button" id="position1" className={`${(turn.playerturn === 'O' && gameboard[0] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[0] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(0, turn.playerturn.toLowerCase()); }}> {gameboard[0] ? <Image src={`../icon-${gameboard[0]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position2" className={`${(turn.playerturn === 'O' && gameboard[1] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[1] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(1, turn.playerturn.toLowerCase()); }}> {gameboard[1] ? <Image src={`../icon-${gameboard[1]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position3" className={`${(turn.playerturn === 'O' && gameboard[2] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[2] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(2, turn.playerturn.toLowerCase()); }}> {gameboard[2] ? <Image src={`../icon-${gameboard[2]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position4" className={`${(turn.playerturn === 'O' && gameboard[3] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[3] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(3, turn.playerturn.toLowerCase()); }}> {gameboard[3] ? <Image src={`../icon-${gameboard[3]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position5" className={`${(turn.playerturn === 'O' && gameboard[4] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[4] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(4, turn.playerturn.toLowerCase()); }}> {gameboard[4] ? <Image src={`../icon-${gameboard[4]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position6" className={`${(turn.playerturn === 'O' && gameboard[5] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[5] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(5, turn.playerturn.toLowerCase()); }}> {gameboard[5] ? <Image src={`../icon-${gameboard[5]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position7" className={`${(turn.playerturn === 'O' && gameboard[6] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[6] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(6, turn.playerturn.toLowerCase()); }}> {gameboard[6] ? <Image src={`../icon-${gameboard[6]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position8" className={`${(turn.playerturn === 'O' && gameboard[7] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[7] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(7, turn.playerturn.toLowerCase()); }}> {gameboard[7] ? <Image src={`../icon-${gameboard[7]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div type="button" id="position9" className={`${(turn.playerturn === 'O' && gameboard[8] === false) ? 'hover:bg-outlineo' : (turn.playerturn === 'X' && gameboard[8] === false ? 'hover:bg-outlinex' : 'bg-none')} cursor-pointer bg-center hover:bg-no-repeat w-[96px] h-[96px] bg-[#1F3641] flex items-center place-content-center shadow-[inset_0px_-8px_0px_#10212A] rounded-xl`} onClick={() => { checkPosition(8, turn.playerturn.toLowerCase()); }}> {gameboard[8] ? <Image src={`../icon-${gameboard[8]}.svg`} width={40} height={40} alt="X/O" /> : ''} </div>
        <div className="w-[96px] h-[64px] rounded-xl text-center bg-[#31C3BD] pt-2">
          <h1>X</h1>
          <p className="font-bold">{score.X}</p>
        </div>
        <div className="w-[96px] h-[64px] bg-[#A8BFC9] rounded-xl text-center pt-2">
          <h1 className="uppercase">ties</h1>
          <p className="font-bold">{score.tie}</p>
        </div>
        <div className="w-[96px] h-[64px] bg-[#F2B137] rounded-xl text-center pt-2">
          <h1>O</h1>
          <p className="font-bold">{score.O}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;

