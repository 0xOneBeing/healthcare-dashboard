import logo from "../../assets/images/logo.svg";

import homeIcon from "../../assets/images/home.svg";
import groupIcon from "../../assets/images/group.svg";
import calendarTodayIcon from "../../assets/images/calendar_today.svg";
import chatBubbleIcon from "../../assets/images/chat_bubble.svg";
import creditCardIcon from "../../assets/images/credit_card.svg";
import userProfilePic from "../../assets/images/gp.png";

import { Button } from "antd";

import { MoreOutlined, SettingOutlined } from "@ant-design/icons";

const noRef = null;

export default function Header() {
  return (
    <header className="header border-rounded App-card d-flex justify-content-between align-items-center">
      <img src={logo} alt="Logo" />
      <ul className="d-flex p-0 m-0 list-unstyled">
        <li className="py-2 px-3">
          <a href={noRef} className="d-flex align-items-center nav-link">
            <img className="me-2" src={homeIcon} alt="HomeIcon" />
            Overview
          </a>
        </li>
        <li className="py-2 px-3 active-li-link">
          <a href={noRef} className="d-flex align-items-center nav-link">
            <img className="me-2" src={groupIcon} alt="PxIcon" />
            Patients
          </a>
        </li>
        <li className="py-2 px-3">
          <a href={noRef} className="d-flex align-items-center nav-link">
            <img className="me-2" src={calendarTodayIcon} alt="HomeIcon" />
            Schedule
          </a>
        </li>
        <li className="py-2 px-3">
          <a href={noRef} className="d-flex align-items-center nav-link">
            <img className="me-2" src={chatBubbleIcon} alt="HomeIcon" />
            Message
          </a>
        </li>
        <li className="py-2 px-3">
          <a href={noRef} className="d-flex align-items-center nav-link">
            <img className="me-2" src={creditCardIcon} alt="HomeIcon" />
            Transactions
          </a>
        </li>
      </ul>
      <div className="profile d-flex align-items-center">
        <img
          className="me-3"
          width={"44"}
          src={userProfilePic}
          alt="user_profile_pic"
        />
        <div className="me-2">
          <p className="m-0 bold">Dr. Jose Simmons</p>
          <small className="m-0">General Practitioner</small>
        </div>
        <div className="d-flex align-items-center">
          <Button icon={<SettingOutlined />} type="ghost" />
          <Button icon={<MoreOutlined />} type="ghost" />
        </div>
      </div>
    </header>
  );
}
