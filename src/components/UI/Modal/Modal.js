import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        //dynamically styling in js
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
      {/*The modal should simply be a div in the end which wraps itselfabout around any content,
so a div which is wrapped around props.children and props.children really can be anything, can be our
own components, can be some text, a paragraph, that is totally up to us how we use the modal and we can 
        pass anything in there.*/}
    </div>
  </Aux>
);

export default modal;
