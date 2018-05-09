import axios from 'axios';

const getBrands = () => {
  return axios.get(`http://localhost:3000/api/v1/brands`)
    .then(res => {
      return res.data
    })
};

const getModels = (brand) => {
  return axios.get(`http://localhost:3000/api/v1/models.json?brand=${brand}`)
    .then(res => {;
      return res.data;
    })
};

const getBarlengths = (brand, model) => {
  return axios.get(`http://localhost:3000/api/v1/barlengths.json?brand=${brand}&model=${model}`)
    .then(res => {
      return res.data;
    })
};

const getPitches = (brand, model, barlength) => {
  return axios.get(`http://localhost:3000/api/v1/pitches.json?brand=${brand}&model=${model}&barlength=${barlength}`)
    .then(res => {
      return res.data;
    })
};

const getGauges = (brand, model, barlength, pitch) => {
  return axios.get(`http://localhost:3000/api/v1/gauges.json?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}`)
    .then(res => {
      return res.data;
    })
};

const getKickbacks = (brand, model, barlength, pitch, gauge) => {
  return axios.get(`http://localhost:3000/api/v1/kickbacks.json?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}`)
    .then(res => {
      return res.data;
    })
};

const getReplacements = (brand, model, barlength, pitch, gauge) => {
  return axios.get(`http://localhost:3000/api/v1/replacements?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&home=${false}`)
    .then(res => {
      console.log("return data : ", res.data);
      return res.data;
    });
}

const getHomeDepotReplacements = (brand, model, barlength, pitch, gauge) => {
  return axios.get(`http://localhost:3000/api/v1/replacements?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&home=${true}`)
    .then(res => {
      console.log("return data : ", res.data);
      return res.data;
    });
}

const getHomeDepotLink = (barlength, drivelink, pitch, gauge) => {
  console.log("incoming params : ", barlength + " " + drivelink + " " + pitch + " " + gauge);
  return axios.get(`http://localhost:3000/api/v1/depot_link?barlength=${barlength}&drivelink=${drivelink}&pitch=${pitch}&gauge=${gauge}`)
    .then(res => {
      return res.data;
    });
}

export const Api = {
  getBrands,
  getModels,
  getBarlengths,
  getPitches,
  getGauges,
  getKickbacks,
  getReplacements,
  getHomeDepotLink,
  getHomeDepotReplacements,
}