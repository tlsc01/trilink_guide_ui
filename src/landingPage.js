import React, { Component } from 'react';

import Replacements from './selects/replacements';
import BrandSelect from './selects/brandSelect';
import ModelSelect from "./selects/modelSelect";
import BarlengthSelect from './selects/barlengthSelect';
import PitchSelect from './selects/pitchSelect';
import GaugeSelect from './selects/gaugeSelect';
import KickbackSelect from './selects/kickbackSelect';
import { Api } from './services/api';
import { Button, Grid, Row, Col } from 'react-bootstrap';

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
      replacements: [],
      selectedBrand: '',
      selectedModel: '',
      selectedBarlength: '',
      selectedPitch: '',
      selectedGauge: '',
      selectedKickback: '',
    }
  }

  handleBrandChange = (e) => {
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
                          Api.getKickbacks(brand, model, barlength, pitch, gauge)
                            .then(data => {
                              this.setState({kickbacks: data})
                            });
                        }
                      });
                  }
                })
              }
            });
        }
      });
  }

  handleModelChange = (e) => {
    const model = e.target.value;
    const brand = this.state.selectedBrand;

    this.setState({ selectedModel: model });
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
                      Api.getKickbacks(brand, model, barlength, pitch, gauge)
                        .then(data => {
                          this.setState({kickbacks: data})
                        });
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
    
    this.setState({ selectedBarlength: barlength });
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
                Api.getKickbacks(brand, model, barlength, pitch, gauge)
                  .then(data => {
                    this.setState({kickbacks: data})
                  });
              }
            });
        }
      });
  }

  handlePitchChange = (e) => {
    this.setState({ selectedPitch: e.target.value });
    Api.getGauges(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, e.target.value);
  }

  handleGaugeChange = (e) => {
    this.setState({ selectedGauge: e.target.value });
    Api.getKickbacks(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, this.state.selectedGauge, e.target.value);
  }

  handleKickbackChange = (e) => {
    this.setState({ selectedKickback: e.target.value });
  }

  handleSearchReplacement = (e) => {
    Api.getReplacements(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, this.state.selectedPitch, this.state.selectedGauge, this.state.selectedKickback);
  }

  

  componentDidMount() {
    Api.getBrands().then(res => {
        this.setState({brands: res});
      })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
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
                  <td>
                    <KickbackSelect
                      kickbacks={this.state.kickbacks}
                      selectedKickback={this.state.selectedKickback}
                      handleKickbackChange={this.handleKickbackChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={4}>
            <Button onClick={() => this.handleSearchReplacement()}>Search</Button>
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
