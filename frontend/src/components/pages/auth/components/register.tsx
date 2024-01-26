import React from "react";
import {
  RegisterPageProps,
  useRouterType,
  useLink,
  useActiveAuthProvider,
  useRouterContext,
  useRegister,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/antd";
import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "./styles";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  LayoutProps,
  CardProps,
  FormProps,
  Divider,
  theme,
  Radio,
} from "antd";

interface CustomRegisterFormTypes {
  username?: string;
  role?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  providerName?: string;
}


const { Text, Title } = Typography;
const { useToken } = theme;

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<CustomRegisterFormTypes>();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<CustomRegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle =title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <ThemedTitleV2 collapsed={false} />}
      </div>
  );

  const CardTitle = (
    <Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {"Sign up for your account"}
    </Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  register({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {"or"}
              </Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form<CustomRegisterFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => register(values)}
          requiredMark={true}
          {...formProps}
        >
          <Form.Item
            name="username"
            label={"Username"}
            rules={[
              { required: true },
            ]}
          >
            <Input
              size="large"
              placeholder={"Username"}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={"Email"}
            rules={[
              { required: true },
              {
                type: "email",
                message: "Invalid email address",
              },
            ]}
          >
            <Input
              size="large"
              placeholder={"Email"}
            />
          </Form.Item>
          <Form.Item name="role" label={"Role"} rules={[
              { required: true },
            ]}>
            <Radio.Group>
              <Radio value="staff">Staff</Radio>
              <Radio value="pejabat">Pejabat</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="password"
            label={"Password"}
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input type="password" placeholder="●●●●●●●●" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={"Confirm Password"}
            hasFeedback
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue}) => ({
                validator(_, value){
                  if (!value || getFieldValue("password") === value ){
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Confirm passwords do not match!"));
                }
              })
            ]}
          >
            <Input type="password" placeholder="●●●●●●●●" size="large" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {loginLink ?? (
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: "auto",
                }}
              >
                {"Have an account?"}{" "}
                <ActiveLink
                  style={{
                    fontWeight: "bold",
                    color: token.colorPrimaryTextHover,
                  }}
                  to="/login"
                >
                  {"Sign in"}
                </ActiveLink>
              </Text>
            )}
          </div>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              block
            >
              {"Sign up"}
            </Button>
          </Form.Item>
        </Form>
      )}
      {hideForm && loginLink !== false && (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {"Have an account?"}{" "}
            <ActiveLink
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
              }}
              to="/login"
            >
              {"Sign in"}
            </ActiveLink>
          </Text>
        </div>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align={hideForm ? "top" : "middle"}
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
