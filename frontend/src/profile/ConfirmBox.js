import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import {useContext, useEffect} from "react";
import classes from "./ConfirmBox.module.css"
import {contextProfile} from "./ProfilePage";
import {deleteProfileBooking, setLocalProfile} from "../apis/API";

function ConfirmBox() {
  const context = useContext(contextProfile);

  useEffect(() => {
    $(function () {
      $("#confirm").dialog({
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
          text: "Так", click: function () {
            let temp = context.profileData;
            temp.bookingIndex = context.confirmShowing.index;
            deleteProfileBooking(temp)
            temp.bookings.splice(context.confirmShowing.index, 1);
            context.setProfileData(temp);
            setLocalProfile(temp);
            $(this).dialog("close");
          },
          class: `${classes.button}`
        }, {
          text: "Ні", click: function () {
            $(this).dialog("close");
          },
          class: `${classes.button}`
        }],
        close: function () {
          context.setConfirmShowing({
            isShowing: false,
            index: -1
          });
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
      <div className={classes.dialogText} id="confirm">
        <p>Ви дійсно бажаєте скасувати це бронювання?</p>
      </div>
    </div>
  )
}

export default ConfirmBox;