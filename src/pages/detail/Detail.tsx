import React, { useState, useEffect } from "react";
import {
  Button,
  Spin,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { commentMockData } from "./mockup";
import styles from "./Detail.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductCollection,
  ProductComments,
} from "../../components";
import {
  ProductDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";

const { RangePicker } = DatePicker;
interface MatchParams {
  touristRouteId: string;
}
export const Detail: React.FC = () => {
  const { touristRouteID } = useParams();
  console.log("touristRouteId:", touristRouteID);
  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(touristRouteID) as any);
  }, []);
  // false loading
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      ></Spin>
    );
  }

  if (error) {
    return <div> error: {error}</div>;
  }
  return (
    //  <h1>详情页，路线ID： {touristRouteID}</h1>
    <>
      <Header></Header>
      <div className={styles["page-content"]}>
        {/* 产品简介日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              ></ProductIntro>
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  dispatch(
                    // addShoppingCartItem({ jwt, touristRouteId: product.id }) as any);
                    addShoppingCartItem({ jwt, touristRouteId: product.id })
                  );
                }}
              >
                <ShoppingCartOutlined></ShoppingCartOutlined>
                加入购物车
              </Button>
              <RangePicker open style={{ marginTop: "20" }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="游客评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>价格</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价 */}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>评论</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData}></ProductComments>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );

  // return navigate('/')
};
