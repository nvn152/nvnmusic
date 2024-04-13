import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function NavigationButtons() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back
    navigate(-1);
  };

  const handleGoForward = () => {
    // Navigate forward
    navigate(1);
  };
  return (
    <div className="hidden md:flex gap-x-1 pl-3 items-center">
      <button
        className="rounded-full custom-opacity flex items-center justify-center hover:opacity-75 transition"
        onClick={handleGoBack}
      >
        <RxCaretLeft size={36} className="text-white" />
      </button>

      <button
        className="rounded-full custom-opacity flex items-center justify-center hover:opacity-75 transition"
        onClick={handleGoForward}
      >
        <RxCaretRight size={36} className="text-white" />
      </button>
    </div>
  );
}

export default NavigationButtons;
