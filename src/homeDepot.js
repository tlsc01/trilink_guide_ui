import React, { Component } from 'react';

import Replacements from './selects/hd_replacements';
import BrandSelect from './selects/brandSelect';
import ModelSelect from "./selects/modelSelect";
import BarlengthSelect from './selects/barlengthSelect';
import PitchSelect from './selects/pitchSelect';
import GaugeSelect from './selects/gaugeSelect';
import './homeDepot.css';
import { Api } from './services/api';

class HomeDepot extends Component {
  constructor() {
    super()
    this.state = {
      brands: [],
      models: [],
      pitches: [],
      barlengths: [],
      kickbacks: [],
      gauges: [],
      searchDisabled: true,
      replacements: [],
      selectedBrand: '',
      selectedModel: '',
      selectedBarlength: '',
      selectedPitch: '',
      selectedGauge: '',
      selectedKickback: '',
      homeDepotUrl: '',
    }
  }

  enableSearch = () => {
    this.setState({ searchDisabled: false });
  }

  disableSearch = () => {
    this.setState({ searchDisabled: true });
  }

  handleBrandChange = (e) => {
    this.setState({ replacements: [] });
    this.setState({ selectedBrand: e.target.value });
    const brand = e.target.value;
    Api.getModels(e.target.value)
      .then(data => {
        this.setState({models: data})

        if (data.length === 1) {
          const model = data[0].model;
          this.setState({selectedModel: model});
          Api.getBarlengths(brand, model)
            .then(data => {
              this.setState({barlengths: data})

              if (data.length === 1) {
                const barlength = data[0].barlength;
                this.setState({selectedBarlength: barlength});
                this.enableSearch();

                Api.getPitches(brand, model, barlength)
                .then(data => {
                  this.setState({pitches: data});
    
                  if (data.length === 1) {
                    const pitch = data[0].pitch;
                    this.setState({selectedPitch: pitch});
                    Api.getGauges(brand, model, barlength, pitch)
                      .then(data => {
                        this.setState({gauges: data});
          
                        if (data.length === 1) {
                          const gauge = data[0].gauge;
                          this.setState({selectedGauge: gauge});

                          Api.getHomeDepotReplacements(brand, model, barlength, pitch, gauge)
                            .then(data => {
                              this.setState({ replacements: data });

                              if ( data.length > 0 ) {
                                Api.getHomeDepotLink(data[0].stripped_barlength, data[0].stripped_chain, data[0].stripped_pitch, data[0].gauge)
                                  .then(data => {
                                    console.log("Found this home depot link : ", data);
                                    this.setState({ homeDepotUrl: data[0].url })
                                  })
                                }
                            })
                        } 
                      });
                  }
                })
              }
            });
        } else if (data.length === 0 || data.length > 1) {
          console.log('Clearing the selected model');
          this.setState({
            selectedModel: '',
            selectedBarlength: '',
            selectedPitch: '',
            selectedGauge: '',
            selectedKickback: '',
            replacements: [],
          });
          this.disableSearch();
        }
      });
  }

  handleModelChange = (e) => {
    const model = e.target.value;
    const brand = this.state.selectedBrand;

    this.setState({ selectedModel: model });
    this.setState({ replacements: [] });
    Api.getBarlengths(this.state.selectedBrand, model)
      .then(data => {
        this.setState({barlengths: data})

        if (data.length === 1) {
          const barlength = data[0].barlength;
          this.setState({selectedBarlength: barlength});
          Api.getPitches(brand, model, barlength)
            .then(data => {
              this.setState({pitches: data});

              if (data.length === 1) {
                const pitch = data[0].pitch;
                this.setState({selectedPitch: pitch});
                Api.getGauges(brand, model, barlength, pitch)
                  .then(data => {
                    this.setState({gauges: data});
      
                    if (data.length === 1) {
                      const gauge = data[0].gauge;
                      this.setState({selectedGauge: gauge});

                      Api.getHomeDepotReplacements(brand, model, barlength, pitch, gauge)
                        .then(data => {
                          this.setState({ replacements: data });
                          if ( data.length > 0 ) {
                            Api.getHomeDepotLink(data[0].stripped_barlength, data[0].stripped_chain, data[0].stripped_pitch, data[0].gauge)
                            .then(data => {
                              console.log("Found this home depot link : ", data);
                              this.setState({ homeDepotUrl: data[0].url })
                            })
                          }
                        })
                    }
                  });
              }
            })
        }
      });
  }

  handleBarlengthChange = (e) => {
    const barlength = e.target.value;
    const brand = this.state.selectedBrand;
    const model = this.state.selectedModel;
    this.setState({ replacements: [] });
    this.setState({ selectedBarlength: barlength });
    this.enableSearch();

    Api.getPitches(brand, model, barlength)
      .then(data => {
        this.setState({pitches: data});

        if (data.length === 1) {
          const pitch = data[0].pitch;
          this.setState({selectedPitch: pitch});
          Api.getGauges(brand, model, barlength, pitch)
            .then(data => {
              this.setState({gauges: data});

              if (data.length === 1) {
                const gauge = data[0].gauge;
                this.setState({selectedGauge: gauge});

                Api.getHomeDepotReplacements(brand, model, barlength, pitch, gauge)
                  .then(data => {
                    this.setState({ replacements: data });
                    if ( data.length > 0 ) {
                      Api.getHomeDepotLink(data[0].stripped_barlength, data[0].stripped_chain, data[0].stripped_pitch, data[0].gauge)
                      .then(data => {
                        console.log("Found this home depot link : ", data);
                        this.setState({ homeDepotUrl: data[0].url })
                      })
                    }
                  })
              }
            });
        }
      });
  }

  handlePitchChange = (e) => {
    this.setState({ selectedPitch: e.target.value });
    this.setState({ replacements: [] });
    Api.getGauges(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, e.target.value);
  }

  handleGaugeChange = (e) => {
    this.setState({ selectedGauge: e.target.value });
    // this.setState({ replacements: [] });
    const brand = this.state.selectedBrand;
    const model = this.state.selectedModel;
    const barlength = this.state.selectedBarlength;
    const pitch = this.state.selectedPitch;
    const gauge = this.state.selectedGauge;

    Api.getHomeDepotReplacements(brand, model, barlength, pitch, gauge)
    .then(data => {
      this.setState({ replacements: data });
      if ( data.length > 0 ) {
        Api.getHomeDepotLink(data[0].stripped_barlength, data[0].stripped_chain, data[0].stripped_pitch, data[0].gauge)
        .then(data => {
          console.log("Found this home depot link : ", data);
          this.setState({ homeDepotUrl: data[0].url })
        })
      }
    })
  }

  // handleKickbackChange = (e) => {
  //   this.setState({ replacements: [] });
  //   this.setState({ selectedKickback: e.target.value });
  // }

  resetSearch = () => {
    this.setState({
      models: [],
      pitches: [],
      barlengths: [],
      kickbacks: [],
      gauges: [],
      searchDisabled: true,
      replacements: [],
      selectedBrand: '',
      selectedModel: '',
      selectedBarlength: '',
      selectedPitch: '',
      selectedGauge: '',
      selectedKickback: '',
    })
  }

  handleSearchReplacement = (e) => {
    const brand = this.state.selectedBrand;
    const model = this.state.selectedModel;
    const barlength = this.state.selectedBarlength;
    const pitch = this.state.selectedPitch;
    const gauge = this.state.selectedGauge;

    Api.getHomeDepotReplacements(brand, model, barlength, pitch, gauge)
      .then(data => {
        this.setState({ replacements: data });

        if ( data.length > 0 ) {
          Api.getHomeDepotLink(data[0].stripped_barlength, data[0].stripped_chain, data[0].stripped_pitch, data[0].gauge)
          .then(data => {
            console.log("Found this home depot link : ", data);
            this.setState({ homeDepotUrl: data[0].url })
          })
        }
      })
  }

  

  componentDidMount() {
    Api.getBrands().then(res => {
        this.setState({brands: res});
      })
  }

  render() {
    return (
      <div>
        <div className="header">
          <a href="http://www.homedepot.com">
            <img src="header.png" alt="" />
          </a>
        </div>
        <div className="container">
          <div className="guide-title">
            CHAIN REPLACEMENT GUIDE
          </div>
          <p id="guide-description">
            Start with your chainsaw brand and let us help you find your replacement chain.
            <br/>
            <span id="orange">LET US DO THE WORK!</span> <br/>
            Pitch and Gauge will automatically fill when possible.
          </p>
          <br/>
          <br/>
          <br/>
          <div id="desktop"> 
            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td colSpan="5">
                    <img src="arrows.png" width="100%" alt="Bar Length" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <BrandSelect
                      brands={this.state.brands}
                      selectedBrand={this.state.selectedBrand}
                      handleBrandChange={this.handleBrandChange}
                    />
                  </td>
                  <td>
                    <ModelSelect
                      models={this.state.models}
                      selectedModel={this.state.selectedModel}
                      handleModelChange={this.handleModelChange}
                    />                
                  </td>
                  <td>
                    <BarlengthSelect
                      barlengths={this.state.barlengths}
                      selectedBarlength={this.state.selectedBarlength}
                      handleBarlengthChange={this.handleBarlengthChange}
                    />
                  </td>
                  <td>
                    <PitchSelect
                      pitches={this.state.pitches}
                      selectedPitch={this.state.selectedPitch}
                      handlePitchChange={this.handlePitchChange}
                    />
                  </td>
                  <td>
                    <GaugeSelect
                      gauges={this.state.gauges}
                      selectedGauge={this.state.selectedGauge}
                      handleGaugeChange={this.handleGaugeChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          
            <br/>
            <br/>
            <Replacements replacements={this.state.replacements} url={this.state.homeDepotUrl} />
          </div>
          <div id="mobile">
            <BrandSelect
              brands={this.state.brands}
              selectedBrand={this.state.selectedBrand}
              handleBrandChange={this.handleBrandChange}
            />

            <ModelSelect
              models={this.state.models}
              selectedModel={this.state.selectedModel}
              handleModelChange={this.handleModelChange}
            />

            <BarlengthSelect
              barlengths={this.state.barlengths}
              selectedBarlength={this.state.selectedBarlength}
              handleBarlengthChange={this.handleBarlengthChange}
            />

            <PitchSelect
              pitches={this.state.pitches}
              selectedPitch={this.state.selectedPitch}
              handlePitchChange={this.handlePitchChange}
            />

            <GaugeSelect
              gauges={this.state.gauges}
              selectedGauge={this.state.selectedGauge}
              handleGaugeChange={this.handleGaugeChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeDepot
