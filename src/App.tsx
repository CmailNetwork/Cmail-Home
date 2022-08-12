import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import AOS from 'aos';
import {ethers} from "ethers";
import 'aos/dist/aos.css';
import twitter from './assets/images/twitter.svg'
import medium from './assets/images/m.svg'
import tm from './assets/images/telegram.svg'
import discord from './assets/images/discord.svg'
import {Button, Modal, notification} from "antd";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskOnboarding from '@metamask/onboarding';

const { isMetaMaskInstalled } = MetaMaskOnboarding;

const discordUrl = 'https://discord.gg/g9xE4tUrY5'
function App() {
    const [hamburgerClick, setHamburgerClick] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const onSlideActive = (slide: any) => {
        setActiveSlide(slide.index)
    }
    const [textList, setText] = useState([
        {
            icon: require('./assets/images/icon1.png'),
            title: 'Decentralized service',
            text: 'Users send emails point-to-point.',
        },
        {
            icon: require('./assets/images/icon2.png'),
            title: 'Consistent experience',
            text: 'Experience is consistent with traditional emails.',
        },
        {
            icon: require('./assets/images/icon3.png'),
            title: 'Multifunction integration',
            text: 'Cmail integrates multiple functions, including alias NFT domain.',
        },
        {
            icon: require('./assets/images/icon5.png'),
            title: 'Community control',
            text: 'The future development direction is determined through community governance.',
        },
        {
            icon: require('./assets/images/icon4.png'),
            title: 'User protection',
            text: 'We never access to users data, where codes are open for publicly scrutinization.',
        },
    ]);
    const splideRef = useRef(null);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const onMenuClick = () => {
        setHamburgerClick(!hamburgerClick)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const goSlide = (index: number) => {
        if (splideRef.current) {
            ((splideRef.current as any).splide as any).go(index);
        }
    }

    const handleConnectMetaMask = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            // From now on, this should always be true:
            // provider === window.ethereum
            const etherProvider = new ethers.providers.Web3Provider(provider as any)
            etherProvider.send("eth_requestAccounts", [])
                .then((accounts)=>{
                    alert('coming soon')
                    console.log(accounts)
                })
        } else {
            notification.warn({
                message: 'No MetaMask detected',
                description: (
                    <div>
                        It seems like you hasn't install MetaMask, please{' '}
                        <a href="https://metamask.io/download/">install it</a> first.
                    </div>
                ),
            });

            return;
        }
    }

    useEffect(() => {
        console.log('welcome')
        AOS.init();
        AOS.refresh();
    }, []);

    return (<>
        <div className="App">
            <header className={['header-pc', activeSlide >= 1 ? 'noGap':''].join(' ')}>
                <div className="header_left">
                    <a className="logo" href="">
                        <img src={require("./assets/images/logo.png")} alt=""/>
                    </a>
                </div>
                <div className="header_right">
                    <div className="mn-item" onClick={(e) => goSlide(1)}>Modules</div>
                    <div className="mn-item" onClick={(e) => goSlide(2)}>Characteristics</div>
                    <div className="mn-item"  onClick={(e) => goSlide(3)}>Roadmap</div>
                    <a className="mn-item" href="" onClick={()=> alert('coming soon')}>Docs</a>
                    <a className="mn-item button_label"  onClick={showModal}></a>
                </div>
            </header>
            <Splide options={{
                direction: 'ttb',
                height: '100vh',
                autoHeight   : true,
                wheel    : true,
                wheelSleep: 1000,
                drag: !hamburgerClick,
                speed: 600,
                pagination: false,
            }} tag="section" ref={ splideRef }  onActive={onSlideActive}>
                <SplideSlide key="1">
                    <div className="section1">
                        <div className="banner-top" >
                            <video muted loop autoPlay src={require('./assets/bg.mp4')} poster={require('./assets/images/bg.jpg')} width="100%" height="100%"/>
                        </div>
                        <div className="main-text">
                            <div className="s1-heading">
                                <div className="s1-title" data-aos-anchor=".section1"
                                     data-aos="cut-right" data-aos-duration="1000" data-aos-delay="200">
                                </div>
                                <div className="s1-sub-title" data-aos-anchor=".section1"
                                     data-aos="cut-right" data-aos-duration="1000" data-aos-delay="300">
                                    The door to Web 3.0 as a hub of<br/>
                                    information and value transmission.
                                </div>
                                <div className="icon-area" data-aos-anchor=".section1"
                                     data-aos="cut-right" data-aos-duration="1000" data-aos-delay="400">
                                    <div className="icon1">
                                        <img src={require('./assets/images/id-icon.png')}/>
                                        <span>Decentralized ID</span>
                                    </div>
                                    <div className="icon2">
                                        <img src={require('./assets/images/letter.png')}/>
                                        <span>On-chain email</span>
                                    </div>
                                </div>
                                <a href={discordUrl} target="_blank" className="btn-join" data-aos-anchor=".section1"
                                   data-aos="cut-right" data-aos-duration="1000" data-aos-delay="450">
                                    <div/>
                                </a>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide key="2">
                    <div className="section2">
                        <div className="title1">Technical modules</div>
                        <div className="title2">Cmail offers a new generalization of email services with four technical modules. </div>
                        <div className="module-area">
                            <div className="module">
                                <img src={require('./assets/images/c3.png')}/>
                                <span>Decentralized ID</span>
                            </div>
                            <div className="module">
                                <img src={require('./assets/images/c1.png')}/>
                                <span>On-chain email</span>
                            </div>
                            <div className="module">
                                <img src={require('./assets/images/c2.png')}/>
                                <span>On-chain docusign</span>
                            </div>
                            <div className="module">
                                <img src={require('./assets/images/c4.png')}/>
                                <span>Application widget</span>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide key="3">
                    <div className="section3">
                        <div className="title1">Product characteristics</div>
                        <div className="icon-area" >
                            <div className="main-text">Cmail manages to deliver information and value simultaneously among on-chain and off-chain users in a friendly way. The characteristics are as follows.</div>
                            <>{textList.map(item => {
                                return <>
                                    <div className="info-area" key={item.title}>
                                        <img src={item.icon}/>
                                        <div className="title">{item.title}</div>
                                        <div className="info">{item.text}</div>
                                    </div></>})}
                            </>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide key="4">
                    <div className="section4">
                       <div className="title1">Roadmap</div>
                        <div className="timeline">
                            <div className="t1">
                                2022 Q1<br/>
                                Concept designed<br/>
                                Team established<br/>
                                Technology verification
                            </div>
                            <div className="t2">
                                2022 Q2<br/>
                                Document writing<br/>
                                Framework established<br/>
                                Prototype built
                            </div>
                            <div className="t3">
                                2022 Q3<br/>
                                Alpha email service<br/>
                                Community building<br/>
                                Registrable accounts release
                            </div>
                            <div className="t4">
                                2022 Q4<br/>
                                Beta email service<br/>
                                Alias NFT release<br/>
                                Seed fundraising
                            </div>
                            <div className="t5">
                                2023 Q1<br/>
                                Email service release<br/>
                                Composability in DAPPs release
                            </div>
                            <div className="t6">
                                2023 Q2<br/>
                                Multi-chain<br/>
                                On-chain docusign
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide key="5">
                    <div className="page_footer">
                        <div className="footer_left_side">
                            <div className="footer_logo"><img src={require("./assets/images/logo.png")} alt=""/></div>
                            <div className="footer_left_desc">
                                All Rights Reserved.<br/>
                                @2022 Cmail Network.
                            </div>
                        </div>
                        <div className="footer_left_list">
                            <div className="info_title">About</div>
                            <div className="info_item">
                                <div onClick={()=> alert('coming soon')}>Product positioning</div>
                            </div>
                            <div className="info_title1">FAQs</div>
                            <div className="info_item">
                                <div onClick={()=> alert('coming soon')}> Litepaper </div>
                            </div>
                        </div>
                        <div className="footer_right_list">
                            <div className="info_title">Community</div>
                            <a href="https://twitter.com/CmailNetwork" target="_blank">
                                <img
                                    src={twitter}
                                    className="footer_icon"/>
                                <div className="info_item" >Twitter</div>
                            </a>
                            <a href="https://t.me/+Md1mErHEVuhmYTFl" target="_blank" >
                                <img
                                    src={tm}
                                    className="footer_icon"/>
                                <div className="info_item" >Telegram</div>
                            </a>
                            <a href={discordUrl} target="_blank">
                                <img
                                    src={discord}
                                    className="footer_icon"/>
                                <div className="info_item">Discord</div>
                            </a>
                            <a href="https://medium.com/@chainmail.network" target="_blank">
                                <img
                                    src={medium}
                                    className="footer_icon"/>
                                <div className="info_item">Medium</div>
                            </a>
                        </div>
                        <div className="footer_right_side">
                            <div className="info_title">Subscribe</div>
                            <div className="info_item"> Subscribe to the newsletter to hear about CMAIL updates and
                                events.
                            </div>
                            <div className="right_menu">
                                <input className="menu_enter" placeholder="Enter Your Email Address"/>
                                <div className="menu_send">SEND</div>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <div className="splide__arrows" />
            </Splide>
        </div>
        <Modal
            title="Connect Wallet"
            visible={isModalVisible}
            destroyOnClose
            onCancel={handleCancel}
            footer={false}
            width={300}
        >
            {isMetaMaskInstalled() ? (
                <Button type="dashed" block onClick={handleConnectMetaMask}>
                    MetaMask
                </Button>
            ) : (
                <div>Please install MetaMask first.</div>
            )}
        </Modal>
    </>);
}

export default App;
