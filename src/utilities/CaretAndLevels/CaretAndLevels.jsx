import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export default function CaretAndLevels({ levels }) {
  if (!levels) {
    return null;
  }

  if (levels) {
    const firstWord = levels.split(" ")[0];

    if (firstWord === "Normal") {
      return <p>Normal</p>;
    } else if (firstWord === "Higher") {
      return (
        <p>
          <CaretUpOutlined /> {levels}
        </p>
      );
    } else if (firstWord === "Lower") {
      return (
        <p>
          <CaretDownOutlined /> {levels}
        </p>
      );
    }
  } else {
    console.log("The levels property is not available.");
  }
}
