import React, {Component} from "react";

const currenciesSelectionWithAnimation = (Wrapped) =>{

  return class extends Component{
    state = {
      currencyList: `currency-list--show`,
      selectorButton: ``
    }

    #animation = {
      show:{
        currencyList: `currency-list--show`,
        selectorButton: `active`
      },
      hide:{
        currencyList: `currency-list--hide`,
        selectorButton: ``
      }
    }

    toggleWithAnimation = async () => {

      const {activeStatus, toggleHandler} = this.props;

      if (activeStatus){
        this.setState({...this.#animation.hide});

        await setTimeout(async () => await toggleHandler(), 200);
      }
      else {
        await toggleHandler();
        this.setState({...this.#animation.show});
      }
    }

    backgroundClickListenerWithAnimation = ({target}) => {

      const {activeStatus, dataType, bgcCallback} = this.props
      const attribute = target.getAttribute(`data-element-type`);

      if (activeStatus && attribute !== dataType) {
        this.setState({...this.#animation.hide});

        setTimeout( () => bgcCallback(), 200)
      }
    }

    componentDidMount() {
      document.addEventListener(`click`, this.backgroundClickListenerWithAnimation);
    }

    currencyListClickHandlerWithAnimation = (evt) =>{
      this.toggleWithAnimation();
      this.props.currencyListClickHandler(evt);
    }

    render() {
      return <Wrapped
        {...this.props}
        toggle={this.toggleWithAnimation}
        classes={this.state}
        currencyListClickHandler={this.currencyListClickHandlerWithAnimation}/>
    }
  }
}

export {currenciesSelectionWithAnimation};