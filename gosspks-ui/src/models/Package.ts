export default class Package {
  package: string;
  dname: string;
  version: string;
  firmware: string;
  desc: string;
  arch: string; // FK for Syno. Must be lower cased when compared to
  maintainer: string;
  changelog: string;
  beta: boolean;
  install_dep_packages: string;
  start: boolean;
  link: string;
  thumbnail_retina: string[]; // always get first image

  constructor(props: Partial<Package>) {
    this.package = props.package || "";
    this.dname = props.dname || "";
    this.version = props.version || "";
    this.firmware = props.firmware || "";
    this.desc = props.desc || "";
    this.arch = props.arch || "";
    this.maintainer = props.maintainer || "";
    this.changelog = props.changelog || "";
    this.beta = props.beta || false;
    this.install_dep_packages = props.install_dep_packages || "";
    this.start = props.start || false;
    this.link = props.link || "";
    this.thumbnail_retina = props.thumbnail_retina || [];
  }
}
