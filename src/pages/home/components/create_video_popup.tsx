import { Fragment } from "react";

interface CreateVideoPopUpProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CreateVideoPopUp: React.FC<CreateVideoPopUpProps> = ({ isOpen, closePopup }) => {
  // Close popup if clicking outside of the popup area
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
      console.log("Clicked outside the popup");
    }
  };

  return (
    <Fragment>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white w-80 h-80 rounded-lg p-4 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-2 hover:bg-gray-600 hover:cursor-pointer"
            >
              ⨉
            </button>
            <h2 className="text-xl text-center mb-4">Create Video</h2>
            {/* Add your popup content here */}
            <p className="text-center">This is the content of the popup.</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateVideoPopUp;
