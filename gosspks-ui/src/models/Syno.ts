export default class Syno {
  name: string;
  cpu: string;
  cores: string;
  threads: number;
  fpu: string;
  arch: string;
  ram: string;

  constructor(props: Partial<Syno>) {
    this.name = props.name || "";
    this.cpu = props.cpu || "";
    this.cores = props.cores || "";
    this.threads = props.threads || 0;
    this.fpu = props.fpu || "";
    this.arch = props.arch || "";
    this.ram = props.ram || "";
  }
}
