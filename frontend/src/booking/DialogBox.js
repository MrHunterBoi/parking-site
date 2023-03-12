import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import {useContext, useEffect} from "react";
import classes from "./DialogBox.module.css"
import {contextDb} from "./Booking";
import {useNavigate} from "react-router-dom";

function DialogBox() {
  const context = useContext(contextDb);
  const navigate = useNavigate();

  useEffect(() => {
    $(function () {
      $("#dialog").dialog({
        autoOpen: true,
        show: {
          duration: 400
        },
        hide: {
          duration: 200
        },
        position: {my: "center", at: "top+100", of: window},
        draggable: false,
        closeText: "\u2715",
        buttons: [{
          text: "Ок", click: function () {
            $(this).dialog("close");
          },
          class: `${classes.button}`
        }],
        close: function () {
          navigate('/');
        },
        classes: {
          "ui-dialog-titlebar": `${classes.title}`,
          "ui-dialog-buttonset": `${classes.buttonsLine}`,
          "ui-dialog": `${classes.dialog}`
        }
      });
    });
  }, [])

  return (
    <div className={classes.outside}>
      <div className={classes.dialogText} id="dialog">
        <p>{context.showingDialog.text}</p>
      </div>
    </div>
  )
}

export default DialogBox;