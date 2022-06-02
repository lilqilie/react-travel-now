import { Form, Input, Button, Checkbox } from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await axios.post("http://123.56.149.216:8080/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      navigate("/signIn");
    } catch (error) {
      alert("注册失败！");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishWithThro = throttle(onFinish, 1000);

  function throttle(f: any, wait: number) {
    let d = new Date();

    console.log("clicked at" + d.getSeconds());

    let timer;
    return (args) => {
      if (timer) return;
      timer = setTimeout(() => {
        f(args);
        timer = null;
        console.log("being throttle" + d.getSeconds());
      }, wait);
    };
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      onFinish={onFinishWithThro}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("密码确认不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
