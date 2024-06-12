import { SvgIcon, SvgIconProps } from "@mui/material";

const EditIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        fontSize: "18px",
        cursor: "pointer",
      }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25002 15.0002C8.25002 14.586 8.5858 14.2502 9.00002 14.2502H15.75C16.1642 14.2502 16.5 14.586 16.5 15.0002C16.5 15.4144 16.1642 15.7502 15.75 15.7502H9.00002C8.5858 15.7502 8.25002 15.4144 8.25002 15.0002Z"
        fill="rgb(21 176 136)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 2.90918C13.277 2.90918 13.0631 2.99778 12.9053 3.1555L3.67724 12.3836L3.28079 13.9694L4.86658 13.5729L14.0947 4.34484C14.1728 4.26675 14.2347 4.17404 14.277 4.072C14.3193 3.96997 14.341 3.86061 14.341 3.75017C14.341 3.63973 14.3193 3.53037 14.277 3.42834C14.2347 3.3263 14.1728 3.23359 14.0947 3.1555C14.0166 3.07741 13.9239 3.01546 13.8218 2.9732C13.7198 2.93093 13.6105 2.90918 13.5 2.90918ZM11.8447 2.09484C12.2837 1.65582 12.8791 1.40918 13.5 1.40918C13.8074 1.40918 14.1119 1.46973 14.3959 1.58738C14.6799 1.70502 14.938 1.87746 15.1553 2.09484C15.3727 2.31222 15.5452 2.57029 15.6628 2.85431C15.7805 3.13833 15.841 3.44275 15.841 3.75017C15.841 4.05759 15.7805 4.36201 15.6628 4.64603C15.5452 4.93005 15.3727 5.18812 15.1553 5.4055L5.78035 14.7805C5.68423 14.8766 5.56379 14.9448 5.43192 14.9778L2.43192 15.7278C2.17634 15.7917 1.90597 15.7168 1.71969 15.5305C1.5334 15.3442 1.45851 15.0739 1.52241 14.8183L2.27241 11.8183C2.30538 11.6864 2.37357 11.566 2.46969 11.4698L11.8447 2.09484Z"
        fill="rgb(21 176 136)"
      />
    </SvgIcon>
  );
};
export default EditIcon;
