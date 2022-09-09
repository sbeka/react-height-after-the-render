import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Client, Coords, Item } from '../../shared/types';
import { Icon, LatLngExpression } from 'leaflet';
import './MyMap.css';
import L from "leaflet";
import { getClientById, getLabelType } from '../../shared/utils';

interface MyMapProps {
  items: Item[];
  clients: Client[];
}

class MyMap extends React.Component<MyMapProps> {
  items: Item[];
  clients: Client[];
  position: LatLngExpression = [43.238949, 76.889709];

  deliveryIcon: Icon;
  packageIcon: Icon;
  defaultIcon: Icon;

  constructor(props: MyMapProps) {
    super(props);

    this.items = this.props.items;
    this.clients = this.props.clients;

    this.deliveryIcon = L.icon({
      iconUrl: require('../../assets/icon/delivery.png'),
      iconSize: [50, 50],
      iconAnchor: [32, 64],
    });

    this.packageIcon = L.icon({
      iconUrl: require('../../assets/icon/package.png'),
      iconSize: [50, 50],
      iconAnchor: [32, 64],
    });

    this.defaultIcon = L.icon({
      iconUrl: require('../../assets/icon/location.png'),
      iconSize: [50, 50],
      iconAnchor: [32, 64],
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="leaflet-container">
        <MapContainer
          center={this.position}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading>
            {this.items.map((item, index) => (
              <Marker
                key={index}
                position={this.getArrCoords(item.coords)}
                title={''+item.id}
                icon={this.getIconByType(item.type)}
              >
                <Popup>
                  <div><strong>Клиент:</strong> {getClientById(this.clients, item.client_id)?.name || 'Не указано'}</div>
                  <div><strong>Тип заявки:</strong> {getLabelType(item.type)}</div>
                  <div><strong>Цена заявки:</strong> {item.price} &#8376;</div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    );


  }

  getArrCoords(coords: Coords): LatLngExpression {
    return [coords.lat, coords.long];
  }

  getIconByType(type: string) {
    switch (type) {
      case 'delivery':
        return this.deliveryIcon;

      case 'pickup':
        return this.packageIcon;

      default:
        return this.defaultIcon;
    }
  }
}

export default MyMap;
