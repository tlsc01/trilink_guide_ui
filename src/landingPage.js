import React, { Component } from 'react';

import Replacements from './selects/replacements';
import BrandSelect from './selects/brandSelect';
import ModelSelect from "./selects/modelSelect";
import BarlengthSelect from './selects/barlengthSelect';
import PitchSelect from './selects/pitchSelect';
import GaugeSelect from './selects/gaugeSelect';
import { Api } from './services/api';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils'

bootstrapUtils.addStyle(Button, 'custom');

class LandingPage extends Component {
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
    Api.getModels(e.target.value, false)
      .then(data => {
        this.setState({models: data})

        if (data.length === 1) {
          const model = data[0].model;
          this.setState({selectedModel: model});
          Api.getBarlengths(brand, model, false)
            .then(data => {
              this.setState({barlengths: data})

              if (data.length === 1) {
                const barlength = data[0].barlength;
                this.setState({selectedBarlength: barlength});
                this.enableSearch();

                Api.getPitches(brand, model, barlength, false)
                .then(data => {
                  this.setState({pitches: data});
    
                  if (data.length === 1) {
                    const pitch = data[0].pitch;
                    this.setState({selectedPitch: pitch});
                    Api.getGauges(brand, model, barlength, pitch, false)
                      .then(data => {
                        this.setState({gauges: data});
          
                        if (data.length === 1) {
                          const gauge = data[0].gauge;
                          this.setState({selectedGauge: gauge});
                          Api.getKickbacks(brand, model, barlength, pitch, gauge, false)
                            .then(data => {
                              this.setState({kickbacks: data})
                            });
                        } 
                      });
                  }
                })
              }
            });
        } else if (data.length === 0 || data.length > 1) {
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
    Api.getBarlengths(this.state.selectedBrand, model, false)
      .then(data => {
        this.setState({barlengths: data})

        if (data.length === 1) {
          const barlength = data[0].barlength;
          this.setState({selectedBarlength: barlength});
          Api.getPitches(brand, model, barlength, false)
            .then(data => {
              this.setState({pitches: data});

              if (data.length === 1) {
                const pitch = data[0].pitch;
                this.setState({selectedPitch: pitch});
                Api.getGauges(brand, model, barlength, pitch, false)
                  .then(data => {
                    this.setState({gauges: data});
      
                    if (data.length === 1) {
                      const gauge = data[0].gauge;
                      this.setState({selectedGauge: gauge});
                      this.enableSearch();
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

    Api.getPitches(brand, model, barlength, false)
      .then(data => {
        this.setState({pitches: data});

        if (data.length === 1) {
          const pitch = data[0].pitch;
          this.setState({selectedPitch: pitch});
          Api.getGauges(brand, model, barlength, pitch, false)
            .then(data => {
              this.setState({gauges: data});

              if (data.length === 1) {
                const gauge = data[0].gauge;
                this.setState({selectedGauge: gauge});
              }
            });
        }
      });
  }

  handlePitchChange = (e) => {
    this.setState({ selectedPitch: e.target.value });
    this.setState({ replacements: [] });
    Api.getGauges(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, e.target.value, false);
  }

  handleGaugeChange = (e) => {
    this.setState({ selectedGauge: e.target.value });
    this.setState({ replacements: [] });
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

    Api.getReplacements(brand, model, barlength, pitch, gauge, false)
      .then(data => {
        this.setState({ replacements: data });
      })
  }

  

  componentDidMount() {
    Api.getBrands(false).then(res => {
        this.setState({brands: res});
      })
  }

  render() {
    return (
      <Grid fluid>
        <Row className="show-grid">
          <Col md={12}>
            <table className="selects-table" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td colSpan="2" valign="bottom">
                    <div align="center">
                      <img src="icon_saw.jpg" width="163" height="86" alt="Brand / Model"/>
                    </div>
                  </td>
                  <td valign="bottom">
                    <div align="left">
                      <img src="icon_bar.jpg" width="103" height="56" alt="Bar Length"/>
                    </div>
                  </td>
                  <td valign="bottom">
                    <div align="left">
                      <img src="icon_pitch.jpg" width="97" height="64" alt="Pitch"/>
                    </div>
                  </td>
                  <td valign="bottom">
                    <div align="center">
                      <img src="icon_gauge.jpg" width="33" height="60" alt="Gauge"/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="brand">BRAND</th>
                  <th className="model">MODEL</th>
                  <th className="barlength">BARLENGTH</th>
                  <th className="pitch">PITCH</th>
                  <th className="gauge">GAUGE</th>
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
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={12}>
            <div style={{textAlign: 'center'}}>
              <Button disabled={this.state.searchDisabled} bsStyle="custom" onClick={() => this.handleSearchReplacement()}>Search</Button>
              {"    "}
              <Button onClick={() => this.resetSearch()}>Reset Search</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Replacements replacements={this.state.replacements}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default LandingPage
