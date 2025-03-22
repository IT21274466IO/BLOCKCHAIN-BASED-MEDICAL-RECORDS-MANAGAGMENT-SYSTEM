import { BsClipboardData } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const InlineError = ({ text }) => {
  return (
    <div className="text-red-600 w-full mt-2 text-xs font-medium">
      <p>{text}</p>
    </div>
  );
};

export const Error = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-2">
      <img
        src="/images/notfound.svg"
        alt="404"
        className="w-full h-56 object-contain"
      />
      <h1 className="text-2xl text-red-600 my-4 font-bold text-center">
        Error
      </h1>
      <p className="text-center text-sm">{text}</p>
      <Link to="/">
        <button className=" bg-subMain rounded mt-4 text-white px-8 py-2">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export const Empty = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-2">
      <div className="flex-colo w-24 rounded-full h-24 text-white bg-subMain">
        <BsClipboardData className="text-2xl" />
      </div>
      <h1 className="text-sm font-bold text-center">{text}</h1>
    </div>
  );
};

// copy
export const Copy = ({ text, children }) => {
  return <CopyToClipboard text={text}>{children}</CopyToClipboard>;
};
