import axios from 'axios';

const getBrands = (homeDepot) => {
  if (homeDepot) {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/hd_brands`)
      .then(res => {
        return res.data
      })
  } else {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/brands`)
      .then(res => {
        return res.data
      })
  }
  
};

const getModels = (brand, homeDepot) => {
  if (homeDepot) {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/hd_models.json?brand=${brand}`)
      .then(res => {;
        return res.data;
    })
  } else {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/models.json?brand=${brand}`)
      .then(res => {;
        return res.data;
    })
  }
};

const getBarlengths = (brand, model, homeDepot) => {
  if (homeDepot) {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/hd_barlengths.json?brand=${brand}&model=${model}`)
      .then(res => {
        return res.data;
      })
  } else {
    return axios.get(`${process.env.REACT_APP_BASE_API_URI}/barlengths.json?brand=${brand}&model=${model}`)
      .then(res => {
        return res.data;
      })
  }

};

const getPitches = (brand, model, barlength, homeDepot) => {
  var params = encodeURI(`brand=${brand}&model=${model}&barlength=${barlength}`);

  if (homeDepot) {
    var url = `${process.env.REACT_APP_BASE_API_URI}/hd_pitches.json?${params}`;

    return axios.get(url, {'headers': { contentType: 'application/json; charset=utf-8', dataType: 'json'}})
      .then(res => {
        return res.data;
      })    
  } else {
    var url = `${process.env.REACT_APP_BASE_API_URI}/pitches.json?${params}`;

    return axios.get(url, {'headers': { contentType: 'application/json; charset=utf-8', dataType: 'json'}})
      .then(res => {
        return res.data;
      })
  }
};

const getGauges = (brand, model, barlength, pitch, homeDepot) => {
  var params = encodeURI(`brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}`);

  if (homeDepot) {
    var url = `${process.env.REACT_APP_BASE_API_URI}/hd_gauges.json?${params}`;
    return axios.get(url, {'headers': { contentType: 'application/json; charset=utf-8'}})
      .then(res => {
        console.log(">>>> res.data : ", res.data);
        return res.data;
      })
  } else {
    var url = `${process.env.REACT_APP_BASE_API_URI}/gauges.json?${params}`;
    return axios.get(url, {'headers': { contentType: 'application/json; charset=utf-8'}})
      .then(res => {
        return res.data;
      })
  }

};

const getKickbacks = (brand, model, barlength, pitch, gauge) => {
  var params = encodeURI(`brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}`);
  var url = `${process.env.REACT_APP_BASE_API_URI}/kickbacks.json?${params}`;
  return axios.get(url)
    .then(res => {
      return res.data;
    })
};

const getReplacements = (brand, model, barlength, pitch, gauge, homeDepot) => {
  var params = encodeURI(`${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&home=${false}`);

  if (homeDepot) {  
    var url = `${process.env.REACT_APP_BASE_API_URI}/replacements?${params}`;
    return axios.get(url)
      .then(res => {
        return res.data;
      });
  } else {
    var url = `${process.env.REACT_APP_BASE_API_URI}/replacements?${params}`;
    return axios.get(url)
      .then(res => {
        return res.data;
      });    
  }
}

const getHomeDepotReplacements = (brand, model, barlength, pitch, gauge) => {
  var params = encodeURI(`${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&home=${true}`);
  var url = `${process.env.REACT_APP_BASE_API_URI}/replacements?${params}`;
  return axios.get(url)
    .then(res => {
      return res.data;
    });
}

const getHomeDepotLink = (barlength, drivelink, pitch, gauge) => {
  var params = encodeURI(`barlength=${barlength}&drivelink=${drivelink}&pitch=${pitch}&gauge=${gauge}`);
  var url = `${process.env.REACT_APP_BASE_API_URI}/depot_link?${params}`;
  return axios.get(url)
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