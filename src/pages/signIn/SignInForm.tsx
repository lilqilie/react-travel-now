import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {
  const loading = useSelector((s) => s.user.loading);
  const jwt = useSelector((s) => s.user.token);
  const error = useSelector((s) => s.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt !== null) {
      navigate("/");
    }
  }, [jwt]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(
      signIn({
        email: values.username,
        password: values.password,
      }) as any
    );
  };
  console.log("onfinish", typeof onFinish);
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishWithThro = throttle(onFinish, 500);

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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
