import React from "react";
import { Button, Input } from "antd";

const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log(e);
};

const ScriptTab: React.FC = () => (
  <div>
    <div className="flex">
      <TextArea
        placeholder="Edit your script here"
        rows={12}
        showCount
        //   maxLength={2000}
        allowClear
        onChange={onChange}
      />
      <TextArea
        placeholder="Edit your script here"
        rows={12}
        showCount
        //   maxLength={2000}
        allowClear
        onChange={onChange}
      />
    </div>
    <div className="flex justify-center my-4">
      <Button type="primary">Generate Video</Button>
    </div>
  </div>
);

export default ScriptTab;
