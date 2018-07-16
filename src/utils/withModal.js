import React from 'react';
import { Modal } from 'antd';

const withModal = (Component) =>
  class ComponentWithModal extends React.Component {
    state = {
      data: null
    };

    get isOpen() {
      return this.state.data !== null;
    }

    openModal = (data) => this.setState({ data });
    closeModal = () => this.setState({ data: null });

    render() {
      const { body = null, ...modalData } = this.state.data || {};
      return (
        <React.Fragment>
          <Component {...this.props} openModal={this.openModal} closeModal={this.closeModal} />
          <Modal onCancel={this.closeModal} {...modalData} visible={this.isOpen}>
            {body}
          </Modal>
        </React.Fragment>
      );
    }
  };

export default withModal;
