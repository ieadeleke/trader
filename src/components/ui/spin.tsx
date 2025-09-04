import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

interface SpinnerInterface {
  color?: string;
  fontSize?: string;
}

const Spinner = ({ color, fontSize }: SpinnerInterface) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          spin
          style={{ fontSize: fontSize || 48, color: color || "#E4753D" }}
        />
      }
    />
  );
};

export default Spinner;
