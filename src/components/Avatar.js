// Styles
import s from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={s.Avatar}
        src={src}
        height={height}
        width={height}
        alt="Profile"
      />
      {text}
    </span>
  );
};

export default Avatar;
