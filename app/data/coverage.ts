export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lng: number;
  lat: number;
}

export const stores: Store[] = [
  {
    id: 1,
    name: "Canal3 Networks",
    address: "C/ Mayor 204, El Raal – Murcia",
    phone: "+34 744 483 448",
    hours: "L-S 10:00–14:00 / 17:00–21:00",
    lng: -1.0299534,
    lat: 38.0390444,
  },
];

// Coverage zones as simplified GeoJSON polygons
// These represent approximate fiber coverage areas
export const coverageZones: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Zona de Cobertura Activa", level: "full" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-1.0144024797389477, 38.057843347126976],
            [-1.0624356311938925, 38.032664791031124],
            [-1.0693160872743874, 38.02521111782329],
            [-1.0643267247268398, 38.024262391870764],
            [-1.0495234796253783, 38.00840868685435],
            [-1.0414400841873146, 38.016674950474],
            [-1.0383445719743065, 38.02643184123562],
            [-1.0276786771574962, 38.02954857724808],
            [-1.0250989726825708, 38.0330715279641],
            [-1.0211421639210698, 38.032258420000716],
            [-1.0144325516522485, 38.035646173287546],
            [-1.011507603190978, 38.04079561133304],
            [-1.0065175919561398, 38.04946833600761],
            [-1.0144024797389477, 38.057843347126976],
          ]
        ]
      }
    }
  ]
};
