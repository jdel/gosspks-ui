import * as React from "react";
import {
  Grid,
  Card,
  Header,
  Label,
  Icon,
  List,
  DropdownItemProps,
  Dropdown,
  Input,
  Checkbox
} from "semantic-ui-react";
import { connect, Dispatch } from "react-redux";
import Package from "../models/Package";
import Syno from "../models/Syno";
import { bindActionCreators, Action } from "redux";
import { selectSyno, SelectSyno, FilterPackages, filterPackages, loadSynos, loadPackages, FilterOutBeta, filterOutBeta } from "./actions";

export interface SPKOwnProps extends React.ClassAttributes<any> {}

export interface SPKProps extends SPKOwnProps {
  synos: Syno[];
  synoSelectedName?: string;
  packages: Package[];
  doSelectSyno: (synoName: string) => SelectSyno;
  doFilterPackages: (rule: string) => FilterPackages;
  doFilterOutBeta: () => FilterOutBeta;
  doLoadSynos: () => Action;
  doLoadPackages: () => Action;
}

const betaRibbon = () => (
  <Label
    content="Beta"
    ribbon="right"
    color="orange"
  />
);

const packageCard = (pkg: Package) => (
  <Card
    key={pkg.dname}
    image={pkg.thumbnail_retina[0]}
    header={<div className="header">{pkg.beta ? betaRibbon(): ''}{pkg.dname}</div>}
    meta={
      <Label.Group>
        <Label basic color="blue" data-tooltip="Version">
          <Icon name='tag' />
          {pkg.version}
        </Label>
        <Label basic color="purple" data-tooltip="Maintainer">
          <Icon name='id badge' />
          {pkg.maintainer}
        </Label>
        <Label basic color="orange" data-tooltip="Minimum DSM Version">
          <Icon name='microchip' />
          {pkg.firmware}
        </Label>
      </Label.Group>
    }
    description={pkg.desc}
    extra={<a href={pkg.link}><Icon name="download"/>Download</a>}
  />
);

class SPKComponent extends React.Component<any> {

  componentWillMount() {
    this.props.doLoadSynos()
    this.props.doLoadPackages()
  }

  getSelectedSynoName(): string {
    return this.props.synoSelectedName || "";
  }

  renderSynoSelector() {
    let synoOptions: DropdownItemProps[] = this.props.synos.map((syno, i) => ({
      key: `syno-${syno.name}-${syno.arch}-${i}`,
      text: syno.name,
      value: syno.name
    }));
    return (
      <Dropdown
        search selection
        style={{ minWidth: "17em" }}
        size="large"
        options={synoOptions}
        placeholder="Select a model ..."
        value={this.getSelectedSynoName()}
        onChange={(e, d) => this.props.doSelectSyno(d.value)}
      />
    );
  }

  renderPackageFilter() {
    return (
      <Input
        id={"search"}
        disabled={this.props.synoSelectedName === undefined}
        style={{ minWidth: "17em" }}
        size="large"
        icon={<Icon name="search" color="blue"/>}
        iconPosition="left"
        onChange={(s, d) => this.props.doFilterPackages(d.value)}
        input={
          <input onKeyPress={s => this.props.doFilterPackages(s.currentTarget.value)} />
        }
        placeholder="Search by name ..."
      />
    )
  }

  renderBetaButton(){
    return (
      <Checkbox
        label="Show Beta Packages"
        onChange={(s, d) => this.props.doFilterOutBeta(d.value)}
        toggle
      />
    )
  }

  render(): React.ReactElement<any> {
    return (
      <Grid container style={{marginTop: 1 + 'em'}}>
        <Grid.Row textAlign="center" columns={3} divided>
          <Grid.Column verticalAlign="middle" >
            { this.renderSynoSelector() }
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            { this.renderBetaButton() }
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            { this.renderPackageFilter() }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card.Group className="centered">
              {this.props.packages.map((pkg, i) => (
                packageCard(pkg)
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps: SPKOwnProps) => ({
  synos: state.spk.synos,
  synoSelectedName: state.spk.synoSelectedName,
  packages: state.spk.synoPackagesFiltered
});

const mapDispatcherToProps = dispatcher => ({
  doSelectSyno: bindActionCreators(selectSyno, dispatcher),
  doFilterPackages: bindActionCreators(filterPackages, dispatcher),
  doFilterOutBeta: bindActionCreators(filterOutBeta, dispatcher),
  doLoadSynos: bindActionCreators(loadSynos, dispatcher),
  doLoadPackages: bindActionCreators(loadPackages, dispatcher)
});

export default connect(mapStateToProps, mapDispatcherToProps)(SPKComponent);
