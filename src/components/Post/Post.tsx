import React, { useEffect, useRef, useState } from "react";
import './Post.css';
import { PostState } from '../../shared/types';

function Post(props: PostState) {
  const [opened, setOpened] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    console.log('POST GENERATED ----------')
    // @ts-ignore
    const heightL = ref.current.offsetHeight;
    setHeight(heightL);
    props.heightChanged(heightL);
  }, [opened]);

  const toggle = () => {
    setOpened(!opened);
    props.heightChanged(height);
  };

  return (
    <div className="item-wrap" ref={ref}>
      <div className="item-image">
        <img src="../../assets/icon/box.svg" alt="item"/>
      </div>
      <div className="item-data">
        <h4>{props.post.title || 'Нет данных'}</h4>
        <button onClick={toggle}>Toggle</button>
        {opened ? (<div>{props.post.body}</div>) : '' }
        <p>Height: {height}</p>
      </div>
    </div>
  );
}

export default Post;
