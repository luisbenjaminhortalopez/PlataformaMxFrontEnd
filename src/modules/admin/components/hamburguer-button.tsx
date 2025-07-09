type Props = {
  toggleSidebar: () => void;
  text?: string;
  className?: string;
};

export const HamburguerButton = ({
  toggleSidebar,
  text = "white",
  className
}: Props) => {
  return (
    <>
      <button onClick={toggleSidebar} className={className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-7 h-7 text-${text}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
};
