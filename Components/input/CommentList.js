import classes from "./CommentList.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items.map((item, index) => (
        <li key={index}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
