import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
import { Form, Popover, Progress, Select, Row, Col } from 'antd'
import InputItem from '../../components/InputItem';
import { getCaptcha, register } from '../../actions/account';
import styles from './index.module.less';
import SubmitButton from '../../components/SubmitButton'

const { Option } = Select;

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            strength: Strong
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            strength: Medium
        </div>
    ),
    poor: (
        <div className={styles.error}>
            strength: Weak
        </div>
    ),
}

const passwordProgressMap = {
    ok: 'suceess',
    pass: 'normal',
    poor: 'exception'
}

const Register = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [popover, setPopover] = useState(false);
    const [prefix, setPrefix] = useState('001');
    const [form]= Form.useForm();
    const handleFinish = (values) => {
        dispatch(register(values));
    }

    const checkConfirm = (_, value) => {
        const promise = Promise;
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('different password for 2 inputs');
        }
        return promise.resolve();
    }
    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    }
    const checkPassword = (_, value) => {
        const promise = Promise;
        if (!value) {
            setVisible(!!value);
            return promise.reject('Please input password')
        }
        if (!visible) {
            setVisible(!!value);
        }
        setPopover(!popover);
        if (value && form.getFieldValue('confirm')) {
            form.validateFields(['confirm']);
        }
        return promise.resolve();
    }

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length && (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    className={styles.progress}
                    status={passwordProgressMap[passwordStatus]}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        )
    }

    const handleClickCaptcha = () => {
        form.validateFields(['username', 'email', 'password'])
            .then(() => {
                // console.log(form.getFieldsValue(['username', 'email', 'password']));
                dispatch(getCaptcha(form.getFieldsValue(['username', 'email', 'password'])))
            })
    }
    
    return(
        <div className={styles.registerContainer}> 
            <div className={styles.register}>
                <Form 
                    form={form}
                    onFinish={handleFinish}
                >
                    <InputItem 
                        name="username"
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
                        name="email"
                        placeholder="email address" 
                        size="large"
                        rules={[
                            {
                                required:true,
                                message: 'Please input email address'
                            },
                            {
                                type:'email',
                                message:'Please input the correct email format'
                            }
                        ]}
                    />
                    <Popover
                        content={
                            visible && (
                                <div>
                                    { passwordStatusMap[getPasswordStatus()]}
                                    { renderPasswordProgress() }
                                    <div>
                                        Pleae input at least 6 digit. Do not use weak password.
                                    </div>
                                </div>
                            )
                        } 
                        overlayStyle={{width: 240}}
                        placement="right"
                        visible={visible}
                    >
                        <InputItem 
                            name="password"
                            placeholder="at least 6 digit, caps matters"
                            type="password" 
                            size="large"
                            rules={[
                                {
                                    required:true,
                                    message: 'Please input password'
                                },
                                {
                                    validator: checkPassword,
                                }
                            ]}
                        />
                    </Popover>
                    <InputItem 
                        name="confirm"
                        placeholder="enter the password again"
                        type="password" 
                        size="large"
                        rules={[
                            {
                                required:true,
                                message: 'Please confirm the password'
                            },
                            {
                                validator: checkConfirm,
                            }
                        ]}
                    />
                    <Row>
                        <Col span={6}>
                            <Select
                                size="large"
                                value={prefix}
                                onChange={(value) => setPrefix(value)}
                                style={{width: '100%'}}
                            >
                                <Option value="1">+1</Option>
                                <Option value="86">+86</Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <InputItem 
                                name="mobile"
                                placeholder="Phone Number" 
                                size="large"
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please input phone number'
                                    },
                                    {
                                        pattern: /^\d{10}$/,
                                        message: 'Wrong Format for phone number'
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                    <InputItem
                        name="captcha"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'captcha'
                            }
                        ]}
                        placeholder='captcha'
                        onClick={handleClickCaptcha}
                    />
                    <Row justify="space-between" align="middle">
                        <Col span={8}>
                            <SubmitButton>Register</SubmitButton>
                        </Col>
                        <Col span={16}>
                            <Link className={styles.login} to="/login">
                                Login in with existed account
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
};

export default Register;