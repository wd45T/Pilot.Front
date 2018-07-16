import { action, observable } from 'mobx';

class Loadable {
  @observable isLoading = false;

  @action
  setLoading = (isLoading) => {
    this.isLoading = isLoading;
  };
}

export default Loadable;
