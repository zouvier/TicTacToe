import Image from 'next/image';

const Navbar = () => {
  const user = '10';
  return (
    <div>
      <Image src="../logo.svg" width={34} height={34} alt="logo" />
      <h1>{user}</h1>
    </div>
  );
};

export default Navbar;
