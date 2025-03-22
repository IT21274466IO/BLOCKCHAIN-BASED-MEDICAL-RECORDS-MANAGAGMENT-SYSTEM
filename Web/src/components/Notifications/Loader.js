import { ScaleLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <ScaleLoader color="#66B5A3" />
    </div>
  );
}

export default Loader;
