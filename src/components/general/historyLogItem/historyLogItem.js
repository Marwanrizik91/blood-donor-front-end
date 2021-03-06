import React, { useState, useEffect } from "react";
import "./historyLogItem.css";
import WhiteBackgroundShadow from "../whiteBackgroundShadow";
import { textDirection } from '../../../store/textDirection';
import { useRecoilValue } from 'recoil';
import { logsState, useClearEmptyValuesLogsState, useAddLogItemToLogsState } from '../../../store/logs';
import {
  isValidDate,
  isValidPulse,
  isValidPressure,
  isValidHemoglobin,
} from "../../../utils/validator";
import { useIncreaseDonationCount } from '../../../store/personalSettings'

const HistoryLogItem = (props) => {

  //Local states
  const [icon, setIcon] = useState("/img/icon-edit-log.svg");
  const [readOnly, setReadOnly] = useState(true);


  //States and hooks for updating the relevant states
  const logsItemsState = useRecoilValue(logsState);
  const clearEmptyLogsFromLogsState = useClearEmptyValuesLogsState();
  const addLogToState = useAddLogItemToLogsState();
  const addDonationCount = useIncreaseDonationCount();


  const direction = useRecoilValue(textDirection)



  //If all the fields is empty this means this is a new entry and fields should
  //apper in edit mood
  let style = "historyLogItemDateInputNotEditable removedateIcon";
  useEffect(() => {
    if (!props.date && !props.pulse && !props.pressure && !props.hemoglobin) {
      changeAllStyles("historyLogItemDateInputEditable");
      setIcon("/img/icon-save.svg");
      setReadOnly(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputs, setInputs] = useState({
    date: {
      value: props.date,
      style: style,
      validate: isValidDate,
    },
    pulse: {
      value: props.pulse,
      style: style,
      validate: isValidPulse,
    },
    pressure: {
      value: props.pressure,
      style: style,
      validate: isValidPressure,
    },
    hemoglobin: {
      value: props.hemoglobin,
      style: style,
      validate: isValidHemoglobin,
    },
  });

  const changeAllStyles = (style) => {
    let editInputs = Object.assign({}, inputs);
    for (let key of Object.keys(editInputs)) {
      editInputs[`${key}`].style = style;
    }
    setInputs(editInputs);
  };

  const editClick = () => {
    if (icon === "/img/icon-edit-log.svg") {
      setIcon("/img/icon-save.svg");
      changeAllStyles("historyLogItemDateInputEditable");
      setReadOnly(false);
    } else {
      setIcon("/img/icon-edit-log.svg");
      changeAllStyles("historyLogItemDateInputNotEditable removedateIcon");
      setReadOnly(true);
      if (allFieldsEmpty()) {
        clearEmptyLogsFromLogsState(logsItemsState);
      } else {
        addLogToState({
          id: props.id,
          date: inputs.date.value,
          pulse: inputs.pulse.value,
          pressure: inputs.pressure.value,
          hemoglobin: inputs.hemoglobin.value
        })
        addDonationCount();
        let existingLatestDonation = localStorage.getItem('mostRecentDonation')
        let latestDonationCompared = [existingLatestDonation, inputs.date.value].sort().reverse()[0]
        localStorage.setItem('mostRecentDonation', latestDonationCompared)
      }
    }
  };

  const allFieldsEmpty = () => {
    let empty = true;
    let editInputs = Object.assign({}, inputs);
    for (let key of Object.keys(editInputs)) {
      if (editInputs[`${key}`].value !== "") {
        empty = false;
        break;
      }
    }
    return empty;
  }

  const change = ({ target }) => {
    if (!inputs[target.id].validate(target.value)) {
      setInputs({
        ...inputs,
        [target.id]: {
          value: target.value,
          style: "historyLogItemRedBorder",
          validate: inputs[target.id].validate,
        },
      });
    } else {
      setInputs({
        ...inputs,
        [target.id]: {
          value: target.value,
          style: "historyLogItemDateInputEditable",
          validate: inputs[target.id].validate,
        },
      });
    }
  };

  return (
    <WhiteBackgroundShadow className="historyLogItemContanier">
      <div className={`historyLogItemRow ${direction === "rtl" && 'historyLogItemRowRtl'}`}>
        <input
          id="date"
          type="date"
          value={inputs.date.value}
          className={inputs.date.style}
          style={{ width: "100px", flexDirection: direction === "ltr" ? "unset" : "row-reverse" }}
          onChange={change}
          readOnly={readOnly}
        />
        <input
          id="pulse"
          value={inputs.pulse.value}
          className={inputs.pulse.style}
          style={{ width: "20px", paddingLeft: direction === "ltr" ? "5px" : "unset", paddingRight: direction === "rtl" ? "5px" : "unset" }}
          onChange={change}
          readOnly={readOnly}
        />
        <input
          id="pressure"
          value={inputs.pressure.value}
          className={inputs.pressure.style}
          style={{ paddingLeft: direction === "ltr" ? "50px" : "unset", paddingRight: direction === "rtl" ? "50px" : "unset" }}
          onChange={change}
          readOnly={readOnly}
        />
        <input
          id="hemoglobin"
          value={inputs.hemoglobin.value}
          className={inputs.hemoglobin.style}
          onChange={change}
          readOnly={readOnly}
        />
        <img
          className="historyLogItemEditIcon"
          src={icon}
          alt=""
          onClick={editClick}
        />
      </div>
    </WhiteBackgroundShadow>
  );
};

export default HistoryLogItem;
