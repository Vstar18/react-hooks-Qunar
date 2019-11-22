import React,{ useMemo } from "react";
import { h0 } from '../common/fp';
import dayjs from "dayjs";
import "./DepartDate.css";

export default function DepartDate (props) {
  const { time , onClick } = props;
  const h0ofDepart = h0(time);
  console.log(h0ofDepart,'---');
  const departDate = new Date(h0ofDepart);
  const departDateString = useMemo(() => {
    return dayjs(h0ofDepart).format("MM-DD");
  },[h0ofDepart]);

  const isToday = h0ofDepart === h0();
  
  const weekString = 
    '周' + [ '日', '一', '二', '三', '四', '五', '六' ][departDate.getDay()] 
    + (isToday ? '（今天）' : '');
  return (
    <div className="depart-date" onClick={ onClick }>
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  )
}