import React from "react";
import ItemList from "../itemList/itemList";
import withData from "../hocHelper/withData";
import withSwapiService from "../hocHelper/withSwapiService";

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return <Wrapped {...props}>{fn}</Wrapped>;
  };
};

const renderName = ({name}) => <span>{name}</span>;
const modelName = ({model, name}) => (
  <span>
    {name} ({model})
  </span>
);

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople,
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets,
  };
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships,
  };
};

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPersonMethodsToProps
);

const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPlanetMethodsToProps
);

const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, modelName)),
  mapStarshipMethodsToProps
);

export {PersonList, PlanetList, StarshipList};
