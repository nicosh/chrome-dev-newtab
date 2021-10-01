import React, { useState, useEffect } from "react";
import { Input, Form, Button, Drawer } from 'antd';

const Github = () => {

    const gitUser = localStorage.getItem("git_username");
    const gitToken = localStorage.getItem("git_token");
    const [isError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [data, setData] = useState(false)
    const [visible, setVisible] = useState(false)
    const [listType, setListType] = useState(0)
    const loadData = async (t, n) => {
        try {
            let response;
            let reposListType = 0
            // if token we use apis to grab also privare repos
            if (t) {
                reposListType = 1
                const headers = {
                    'Authorization': `bearer ${t}`,
                }
                const body = {
                    "query": `query { 
                      user(login: "${n}") {
                        repositories(orderBy : {field : UPDATED_AT, direction : DESC}, first: 100) {
                          nodes {
                            name
                            url
                            description
                            updatedAt
                            primaryLanguage {
                              name
                              color
                                          }
                            stargazers{
                              totalCount
                            }
                            forks {
                              totalCount
                            }
                          }
                        }
                      }
                    }
                    `
                }
                response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
            } else {
                response = await fetch(`https://api.github.com/users/${n}/repos`)
            }
            if (response.status != 200) {
                localStorage.removeItem("git_username");
                localStorage.removeItem("git_token");
                setError(true)
                setErrorMessage("Error")
                setData(false)
            } else {
                let data = await response.json()
                if (reposListType === 1) {
                    data = data.data.user.repositories.nodes
                }
                if (n) {
                    localStorage.setItem('git_username', n)
                    
                } else {
                    localStorage.removeItem("git_username");
                }
                if (t) {
                    localStorage.setItem('git_token', t)
                } else {
                    localStorage.removeItem("git_token");

                }

                setError(false)
                setErrorMessage(false)
                setData(data)
                setListType(reposListType)

            }
        } catch (error) {
            localStorage.removeItem("git_username");
            localStorage.removeItem("git_token");
            setError(true)
            setErrorMessage(error.message ? error.message : JSON.stringify(error))
            setData(false)
        }

    }
    useEffect(() => {
        if (gitUser) {
            loadData(gitToken, gitUser)
        }
    }, [])
    const onFinish = (values) => {
        const { token, username } = values
        loadData(token, username)
    }

    const showDrawer = () => {
        setVisible(true)

    };

    const onClose = () => {
        setVisible(false)
    };

    const gear = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
        </svg>
    )

    return (
        <div key={data.length} style={{ minHeight: 450 }} className="row position-relative">
            <div className="col-md-12">
                <Button className="float-end" onClick={showDrawer} type="primary" shape="circle" icon={gear} />
            </div>
            <div className="col-md-12">
                {errorMessage && <code>{errorMessage}</code>}
            </div>
            <div className="col-md-12">
                <div className="row mt-3">
                    {data && data.map((el, index) => {
                        let name = el.name
                        let pl = listType === 1 ? el?.primaryLanguage?.name : el.language
                        let stars = listType === 1 ? el?.stargazers?.totalCount : el.stargazers_count
                        let forkcount = listType === 1 ? el?.forks?.totalCount : el.forks_count
                        let url = listType === 1 ? el.url : el.html_url
                        return (
                            <div className="col-md-4 mb-3">
                                <div className="repo-holder">
                                    <a tarrget="_blank" href={url} className="repo-name d-block">{name}</a>
                                    <span className="repo-language">{pl}</span>
                                    <span  className="repo-stars ms-2">
                                        <svg className="octicon" aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                                            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                        </svg>
                                        {stars}
                                    </span>
                                    <span  className="repo-forks ms-2">
                                        <svg className="octicon" aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                                            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                        </svg>
                                        {forkcount}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Drawer
                title="Github settings"
                placement="right"
                width={"100%"}
                closable={true}
                onClose={onClose}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <Form onFinish={onFinish} name="basic">
                    <span className="d-block mb-2">
                        To activate github extension please insert a valid github username
                        and, optionally, a personal github token with <code>repos:read</code> permissions
                        if you want private repos listed.
                    </span>
                    <Form.Item
                        name="username" initialValue={gitUser}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="mb-2" addonBefore="Github username" defaultValue="" />
                    </Form.Item>
                    <Form.Item initialValue={gitToken} name="token">
                        <Input addonBefore="Github token" defaultValue="" />
                    </Form.Item>
                    <Button size="large" className="mt-3" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Drawer>
        </div>
    )
}

export default Github