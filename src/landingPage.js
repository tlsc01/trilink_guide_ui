import React, { Component } from 'react';
import axios from 'axios';

import Replacements from './selects/replacements';
import BrandSelect from './selects/brandSelect';
import ModelSelect from "./selects/modelSelect";
import BarlengthSelect from './selects/barlengthSelect';
import PitchSelect from './selects/pitchSelect';
import GaugeSelect from './selects/gaugeSelect';
import KickbackSelect from './selects/kickbackSelect';

import { Button, Grid, Row, Col, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

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
    this.getModels(e.target.value);
  }

  handleModelChange = (e) => {
    this.setState({ selectedModel: e.target.value });
    this.getBarlengths(this.state.selectedBrand, e.target.value);
  }

  handleBarlengthChange = (e) => {
    this.setState({ selectedBarlength: e.target.value });
    this.getPitches(this.state.selectedBrand, this.state.selectedModel, e.target.value);
  }

  handlePitchChange = (e) => {
    this.setState({ selectedPitch: e.target.value });
    this.getGauges(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, e.target.value);
  }

  handleGaugeChange = (e) => {
    this.setState({ selectedGauge: e.target.value });
    this.getKickbacks(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, this.state.selectedGauge, e.target.value);
  }

  handleKickbackChange = (e) => {
    this.setState({ selectedKickback: e.target.value });
  }

  handleSearchReplacement = (e) => {
    this.getReplacements(this.state.selectedBrand, this.state.selectedModel, this.state.selectedBarlength, this.state.selectedPitch, this.state.selectedGauge, this.state.selectedKickback);
  }

  getBrands = () => {
    axios.get(`http://localhost:3000/api/v1/brands`)
      .then(res => {
        this.setState({brands: res.data});
      })
  };

  getModels = (brand) => {
    axios.get(`http://localhost:3000/api/v1/models.json?brand=${brand}`)
      .then(res => {;
        this.setState({models: res.data})

        if (res.data.length >= 1) {
          const model = res.data[0].model;
          this.setState({selectedModel: model});
          this.getBarlengths(brand, model);
        }
      })
  };

  getBarlengths = (brand, model) => {
    axios.get(`http://localhost:3000/api/v1/barlengths.json?brand=${brand}&model=${model}`)
      .then(res => {
        this.setState({barlengths: res.data})

        if (res.data.length >= 1) {
          const barlength = res.data[0].barlength;
          this.setState({selectedBarlength: barlength});
          this.getPitches(brand, model, barlength);
        }
      })
  };

  getPitches = (brand, model, barlength) => {
    axios.get(`http://localhost:3000/api/v1/pitches.json?brand=${brand}&model=${model}&barlength=${barlength}`)
      .then(res => {
        this.setState({pitches: res.data});

        if (res.data.length >= 1) {
          const pitch = res.data[0].pitch;
          this.setState({selectedPitch: pitch});
          this.getGauges(brand, model, barlength, pitch);
        }
      })
  };

  getGauges = (brand, model, barlength, pitch) => {
    axios.get(`http://localhost:3000/api/v1/gauges.json?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}`)
      .then(res => {
        this.setState({gauges: res.data});
        console.log(">>>>> data : ", res.data);
        if (res.data.length >= 1) {
          const gauge = res.data[0].gauge;
          this.setState({selectedGauge: gauge});
          this.getKickbacks(brand, model, barlength, pitch, gauge);
        }
      })
  };

  getKickbacks = (brand, model, barlength, pitch, gauge) => {
    axios.get(`http://localhost:3000/api/v1/kickbacks.json?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}`)
      .then(res => {
        this.setState({kickbacks: res.data})
      })
  };

  getReplacements = (brand, model, barlength, pitch, gauge, kickback) => {
    axios.get(`http://localhost:3000/api/v1/replacements?brand=${brand}&model=${model}&barlength=${barlength}&pitch=${pitch}&gauge=${gauge}&kickback=${kickback}`)
      .then(res => {
        this.setState({replacements: res.data})
      })
  }

  componentDidMount() {
    this.getBrands()
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <ButtonToolbar>
            <DropdownButton
              bsStyle="default"
              title={this.state.selectedBrand || "Select a Brand"}
              noCaret
              id="dropdown-no-caret"
            >
              <MenuItem eventKey="1">Test</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
          <Col md={12}>
            <table width="100%" border="0" cellpadding="0">
              <tbody>
                <tr>
                  <td colspan="2" valign="bottom">
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
