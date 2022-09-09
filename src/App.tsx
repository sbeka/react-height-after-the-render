import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import Item from './components/Item/Item';
import { AppState } from './shared/types';
import MyMap from './components/MyMap/MyMap';
// @ts-ignore
import { VariableSizeList } from 'react-window';
import { getClientById } from './shared/utils';
import Post from './components/Post/Post';


class App extends React.Component<any, AppState> {
  listRef = React.createRef();
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      clients: [],
      dataIsLoaded: false,
      posts: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("./assets/database/NeRelog_clients.json").then(res => res.json()),
      fetch("./assets/database/NeRelog_apps.json").then(res => res.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
    ])
      .then(([clients, items, posts]) => {
        this.setState({
          items,
          clients,
          dataIsLoaded: true,
          posts,
        });
      });
  }

  render() {
    const { dataIsLoaded, items, clients, posts } = this.state;
    if (!dataIsLoaded) return <div><h1> Please wait some time.... </h1></div> ;

    return (
      <div className="App">

        <div className="left" id={'left'}>
          <VariableSizeList
            ref={this.listRef}
            itemData={posts}
            itemCount={posts.length}
            itemSize={this.getItemSize.bind(this)}
            height={600}
            width={399}
          >
            {this.postRow.bind(this)}
          </VariableSizeList>
        </div>

        <div className="content" id={'content'}>
          <MyMap items={items} clients={clients} />
        </div>

        <div className="clear"></div>
      </div>
    );
  }

  row({ data, index, style }: any) {
    const client = getClientById(this.state.clients, data[index].client_id);
    return (<div style={style}>
      <Item item={data[index]} client={client} />
    </div>);
  }

  postRow({ data, index, style }: any) {
    return (<div style={style}>
      <Post post={data[index]} heightChanged={height => this.heightChangedHandle(height, index)} />
    </div>);
  }

  heightChangedHandle(height: number, index: number) {
    this.state.posts[index].height = height;
    // @ts-ignore
    this.listRef.current.resetAfterIndex(index);
  }

  getItemSize(index: number): number {
    return this.state.posts[index].height || 200;
  }
}

export default App;
