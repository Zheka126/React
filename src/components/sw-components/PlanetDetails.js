import React from "react";
import ItemDetails, {Record} from "../itemDetails/itemDetails";
import withSwapiService from "../hocHelper/withSwapiService";

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field='population' label='Population ' />
      <Record field='rotationPeriod' label='Rotation Period ' />
      <Record field='diametr' label='Diametr ' />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  };
};

export default withSwapiService(PlanetDetails, mapMethodsToProps);
