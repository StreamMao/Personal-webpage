import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Form, Checkbox, Row } from 'antd';
import { UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone,
    AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'redux-react-hook';
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import { login } from '../../actions/account';
import styles from './index.module.less';

const { TabPane} = Tabs;

const Login = () => {
    const dispatch = useDispatch();
    const [autoLogin,, setAutoLogin] = useState(true);
    const [form]= Form.useForm();
    const handleFinish = (values) => {
        dispatch(login(values));
    }

    return(
        <div className={styles.loginContainer}> 
            <div className={styles.login}>
                <Form 
                    form={form}
                    onFinish={handleFinish}
                >
                    <Tabs defaultActiveKey="1">     {/* 设置一开始哪个tab高亮 */}
                        <TabPane tab="Account Name and Password" key="1">
                            <InputItem 
                                name="username"
                                prefix={
                                    <UserOutlined style={{color: '#1890ff'}}/>
                                }
                                placeholder="username" 
                                size="large"
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please input username'
                                    }
                                ]}
                            />
                            <InputItem 
                                name="password"
                                prefix={
                                    <LockTwoTone style={{color: '#1890ff'}}/>
                                }
                                placeholder="password"
                                type="password" 
                                size="large"
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please input password'
                                    }
                                ]}
                            />
                        </TabPane>
                        <TabPane tab="Phone Number" key="2">
                            <InputItem 
                                    name="phone number"
                                    prefix={
                                        <MobileTwoTone style={{color: '#1890ff'}}/>
                                    }
                                    placeholder="phone number" 
                                    size="large"
                                    rules={[
                                        {
                                            required:true,
                                            message: 'Please input phone number'
                                        }
                                    ]}
                            />
                            <InputItem 
                                name="captcha"
                                prefix={
                                    <MailTwoTone style={{color: '#1890ff'}}/>
                                }
                                placeholder="captcha"
                                type="password" 
                                size="large"
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please input captcha'
                                    }
                                ]}
                            />
                        </TabPane>
                    </Tabs>
                    <Row justify="space-between">
                        <Checkbox
                            checked={autoLogin}
                            onChanbe={(e) => setAutoLogin(e.target.checked)}
                        >
                            Auto-Login
                        </Checkbox>
                        <a href="#!">Fogot the Password</a>
                    </Row>
                    <SubmitButton>Login</SubmitButton>
                </Form>
                <div className={styles.other}>
                    other login method
                    <AlipayCircleOutlined className={styles.icon}/>
                    <TaobaoCircleOutlined className={styles.icon}/>
                    <WeiboCircleOutlined className={styles.icon}/>
                    <Link className={styles.register} to='/Register'>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;