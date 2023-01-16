import { useRouter } from 'next/router';
import Image from 'next/image';

const Game = () => {
  const router = useRouter();
  const { query } = router;
  const { user } = query;

  return (
    <div>
      <div className="flex">
        <Image src="../logo.svg" width={34} height={34} alt="logo" />
        <div className="flex">
          <Image src="../icon-x.svg" width={34} height={34} alt="turn" />
          <h1>Turn</h1>
        </div>
        <div>
          <Image src="../icon-restart.svg" width={34} height={34} alt="restart" />
        </div>

      </div>
    </div>
  );
};

export default Game;

