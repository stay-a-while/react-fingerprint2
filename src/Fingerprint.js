import React from "react";
import Fingerprint2 from "fingerprintjs2";
import "./styles.css";

class Fingerprint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fingerprint_hash: "",
      fingerprint_obj: {}
    };
  }

  fingerprint() {
    (async () => {
      const components = await Fingerprint2.getPromise();
      const values = components.map((component) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(""), 31);
      this.setState({
        fingerprint_hash: murmur,
        fingerprint_obj: components
      });
    })();
  }

  componentDidMount() {
    this.fingerprint();
  }

  render() {
    return (
      <div>
        <h2>Fingerprint: {this.state.fingerprint_hash}</h2>
        <code>{JSON.stringify(this.state.fingerprint_obj)}</code>
      </div>
    );
  }
}
export default Fingerprint;
