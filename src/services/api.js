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

const getReplacements = (brand, model, barlength, pitch, gauge, kickback) => {
  return axios.get(`http://localhost:3000/api/v1/replacements?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&kickback=${kickback}`)
    .then(res => {
      return res.data;
    })
}

export const Api = {
  getBrands,
  getModels,
  getBarlengths,
  getPitches,
  getGauges,
  getKickbacks,
  getReplacements
}